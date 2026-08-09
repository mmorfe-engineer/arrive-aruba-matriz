#!/usr/bin/env python3
"""Mask and pack Journey Organic v3 RGBA frames into WebP sprite sheets."""

from __future__ import annotations

import argparse
import json
import math
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageChops


FRAME_START = 1
FRAME_END = 120
DESKTOP_BUDGET = 5 * 1024 * 1024
MOBILE_BUDGET = int(2.5 * 1024 * 1024)


@dataclass(frozen=True)
class Variant:
    name: str
    cell_height: int
    max_sheet_size: int
    sliding_window: int
    budget: int
    quality: int


VARIANTS = (
    Variant("desktop", 900, 2048, 2, DESKTOP_BUDGET, 74),
    Variant("mobile", 600, 2048, 2, MOBILE_BUDGET, 70),
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, required=True, help="Directory containing frame_0001.png through frame_0120.png")
    parser.add_argument("--output", type=Path, required=True, help="Destination asset directory")
    return parser.parse_args()


def source_paths(root: Path) -> list[Path]:
    paths = [root / f"frame_{frame:04d}.png" for frame in range(FRAME_START, FRAME_END + 1)]
    missing = [path for path in paths if not path.is_file()]
    if missing:
        raise FileNotFoundError(f"Missing {len(missing)} source frame(s); first missing: {missing[0]}")
    return paths


def prepare_mask(paths: list[Path]) -> tuple[Image.Image, tuple[int, int, int, int], tuple[int, int]]:
    with Image.open(paths[0]) as source:
        first = source.convert("RGBA")
    mask = first.getchannel("A")
    silhouette = mask.getbbox()
    if not silhouette:
        raise ValueError("The first frame has no visible alpha")
    return mask, silhouette, first.size


def prepared_frame(path: Path, expected_size: tuple[int, int], mask: Image.Image) -> Image.Image:
    with Image.open(path) as source:
        frame = source.convert("RGBA")
    if frame.size != expected_size:
        raise ValueError(f"Unexpected frame size for {path}: {frame.size}, expected {expected_size}")
    frame.putalpha(ImageChops.multiply(frame.getchannel("A"), mask))
    return frame


def pack_variant(
    paths: list[Path],
    source_size: tuple[int, int],
    mask: Image.Image,
    crop: tuple[int, int, int, int],
    output_root: Path,
    variant: Variant,
) -> dict:
    variant_root = output_root / variant.name
    variant_root.mkdir(parents=True, exist_ok=True)
    crop_width = crop[2] - crop[0]
    crop_height = crop[3] - crop[1]
    cell_height = variant.cell_height
    cell_width = round(crop_width * cell_height / crop_height)
    columns = max(1, variant.max_sheet_size // cell_width)
    rows = max(1, variant.max_sheet_size // cell_height)
    per_sheet = columns * rows
    sheets = []

    resampling = Image.Resampling.LANCZOS
    for stale_asset in variant_root.glob("*.webp"):
        stale_asset.unlink()

    for sheet_index, offset in enumerate(range(0, len(paths), per_sheet)):
        group_paths = paths[offset : offset + per_sheet]
        used_rows = math.ceil(len(group_paths) / columns)
        sheet = Image.new("RGBA", (cell_width * columns, cell_height * used_rows), (0, 0, 0, 0))
        for cell_index, path in enumerate(group_paths):
            frame = prepared_frame(path, source_size, mask)
            resized = frame.crop(crop).resize((cell_width, cell_height), resampling)
            sheet.alpha_composite(resized, ((cell_index % columns) * cell_width, (cell_index // columns) * cell_height))
            resized.close()
            frame.close()
        destination = variant_root / f"shade-{sheet_index:02d}.webp"
        sheet.save(destination, "WEBP", quality=variant.quality, method=6, exact=True)
        sheet.close()
        sheets.append(
            {
                "src": f"{variant.name}/{destination.name}",
                "width": sheet.width,
                "height": sheet.height,
                "columns": columns,
                "rows": used_rows,
                "frameOffset": offset,
                "frameCount": len(group_paths),
                "bytes": destination.stat().st_size,
            }
        )

    poster_path = variant_root / "poster.webp"
    poster = prepared_frame(paths[0], source_size, mask).crop(crop).resize((cell_width, cell_height), resampling)
    poster.save(poster_path, "WEBP", quality=82, method=6, exact=True)
    poster.close()
    final_path = variant_root / "final.webp"
    final_height = min(1400 if variant.name == "desktop" else 1100, crop_height)
    final_width = round(crop_width * final_height / crop_height)
    final = prepared_frame(paths[-1], source_size, mask).crop(crop).resize((final_width, final_height), resampling)
    final.save(final_path, "WEBP", quality=84, method=6, exact=True)
    final.close()

    total_bytes = sum(sheet["bytes"] for sheet in sheets) + poster_path.stat().st_size + final_path.stat().st_size
    if total_bytes > variant.budget:
        raise SystemExit(
            f"{variant.name} budget exceeded: {total_bytes / 1024 / 1024:.2f} MB > {variant.budget / 1024 / 1024:.2f} MB"
        )

    return {
        "budgetBytes": variant.budget,
        "totalBytes": total_bytes,
        "maxSheetSize": variant.max_sheet_size,
        "slidingWindow": variant.sliding_window,
        "cell": {"width": cell_width, "height": cell_height},
        "poster": {"src": f"{variant.name}/poster.webp", "width": cell_width, "height": cell_height},
        "finalStill": {"src": f"{variant.name}/final.webp", "width": final_width, "height": final_height},
        "clip": {
            "frameStart": FRAME_START,
            "frameEnd": FRAME_END,
            "frameCount": len(paths),
            "sheets": sheets,
        },
    }


def main() -> None:
    args = parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    paths = source_paths(args.input)
    mask, crop, source_size = prepare_mask(paths)
    source_width, source_height = source_size
    manifest = {
        "version": 3,
        "generator": "tools/build_journey_organic_assets.py",
        "source": {"width": source_width, "height": source_height, "frameCount": len(paths), "crop": crop},
        "timeline": {"shadeStart": 0.10, "shadeEnd": 0.62, "zoomStart": 0.62, "finalSwap": 0.80, "zoomEnd": 0.95},
        "aperture": {"x": 0.122, "y": 0.12, "width": 0.756, "height": 0.763},
        "variants": {
            variant.name: pack_variant(paths, source_size, mask, crop, args.output, variant)
            for variant in VARIANTS
        },
    }
    destination = args.output / "manifest.json"
    destination.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"manifest": str(destination), "variants": {name: data["totalBytes"] for name, data in manifest["variants"].items()}}, indent=2))


if __name__ == "__main__":
    main()
