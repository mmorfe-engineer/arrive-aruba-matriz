#!/usr/bin/env python3
"""Pack Arrive Aruba Journey PNG frames into bounded WebP sprite sheets."""

from __future__ import annotations

import argparse
import json
import math
import shutil
import subprocess
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image


SOURCE_SIZE = (1920, 1080)
MAX_SHEET_SIZE = 2048
DESKTOP_BUDGET = 5 * 1024 * 1024
MOBILE_BUDGET = int(2.5 * 1024 * 1024)


@dataclass(frozen=True)
class Clip:
    name: str
    frame_start: int
    frame_end: int

    @property
    def frame_count(self) -> int:
        return self.frame_end - self.frame_start + 1


@dataclass(frozen=True)
class Variant:
    name: str
    shade_height: int
    push_width: int
    budget: int


CLIPS = (
    Clip("shade", 1, 120),
    Clip("push", 121, 160),
)

VARIANTS = (
    Variant("desktop", shade_height=512, push_width=768, budget=DESKTOP_BUDGET),
    Variant("mobile", shade_height=384, push_width=512, budget=MOBILE_BUDGET),
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, required=True, help="Directory containing shade/ and push/ PNG frames")
    parser.add_argument("--output", type=Path, required=True, help="Destination for sheets and journey-manifest.json")
    parser.add_argument("--quality", type=int, default=72, help="WebP RGB quality (default: 72)")
    parser.add_argument("--alpha-quality", type=int, default=90, help="WebP alpha quality (default: 90)")
    parser.add_argument("--max-sheet-size", type=int, default=MAX_SHEET_SIZE)
    return parser.parse_args()


def expected_frames(input_dir: Path, clip: Clip) -> list[Path]:
    paths = [input_dir / clip.name / f"frame_{frame:04d}.png" for frame in range(clip.frame_start, clip.frame_end + 1)]
    missing = [path for path in paths if not path.is_file()]
    if missing:
        preview = "\n".join(f"  - {path}" for path in missing[:10])
        raise FileNotFoundError(f"Missing {len(missing)} frame(s) for {clip.name}:\n{preview}")
    return paths


def union_alpha_bbox(paths: Iterable[Path]) -> tuple[int, int, int, int]:
    union: tuple[int, int, int, int] | None = None
    for path in paths:
        with Image.open(path) as image:
            rgba = image.convert("RGBA")
            if rgba.size != SOURCE_SIZE:
                raise ValueError(f"Unexpected source size for {path}: {rgba.size}, expected {SOURCE_SIZE}")
            bbox = rgba.getchannel("A").getbbox()
            if bbox is None:
                continue
            if union is None:
                union = bbox
            else:
                union = (
                    min(union[0], bbox[0]),
                    min(union[1], bbox[1]),
                    max(union[2], bbox[2]),
                    max(union[3], bbox[3]),
                )
    if union is None:
        raise ValueError("Clip contains no visible alpha pixels")
    return union


def cell_size(variant: Variant, clip: Clip, crop: tuple[int, int, int, int]) -> tuple[int, int]:
    crop_width = crop[2] - crop[0]
    crop_height = crop[3] - crop[1]
    if clip.name == "shade":
        height = variant.shade_height
        width = round(crop_width * height / crop_height)
    else:
        width = variant.push_width
        height = round(crop_height * width / crop_width)
    return width, height


def grid_for(cell: tuple[int, int], max_size: int) -> tuple[int, int]:
    columns = max_size // cell[0]
    rows = max_size // cell[1]
    if columns < 1 or rows < 1:
        raise ValueError(f"Cell {cell} does not fit inside {max_size}x{max_size}")
    return columns, rows


def encode_webp(png_path: Path, webp_path: Path, quality: int, alpha_quality: int) -> None:
    command = [
        "cwebp",
        "-quiet",
        "-mt",
        "-m",
        "6",
        "-q",
        str(quality),
        "-alpha_q",
        str(alpha_quality),
        "-alpha_method",
        "1",
        "-exact",
        str(png_path),
        "-o",
        str(webp_path),
    ]
    subprocess.run(command, check=True)


def build_clip(
    *,
    output_root: Path,
    variant: Variant,
    clip: Clip,
    frame_paths: list[Path],
    crop: tuple[int, int, int, int],
    max_size: int,
    quality: int,
    alpha_quality: int,
) -> dict:
    cell_width, cell_height = cell_size(variant, clip, crop)
    columns, rows = grid_for((cell_width, cell_height), max_size)
    frames_per_sheet = columns * rows
    variant_dir = output_root / variant.name
    variant_dir.mkdir(parents=True, exist_ok=True)
    sheets = []

    with tempfile.TemporaryDirectory(prefix="journey-sheets-") as temporary:
        temporary_dir = Path(temporary)
        for sheet_index, offset in enumerate(range(0, len(frame_paths), frames_per_sheet)):
            batch = frame_paths[offset : offset + frames_per_sheet]
            used_rows = math.ceil(len(batch) / columns)
            sheet_width = columns * cell_width
            sheet_height = used_rows * cell_height
            if sheet_width > max_size or sheet_height > max_size:
                raise AssertionError(f"Sheet exceeds limit: {sheet_width}x{sheet_height}")

            sheet = Image.new("RGBA", (sheet_width, sheet_height), (0, 0, 0, 0))
            for index, frame_path in enumerate(batch):
                with Image.open(frame_path) as image:
                    frame = image.convert("RGBA").crop(crop)
                    frame = frame.resize((cell_width, cell_height), Image.Resampling.LANCZOS)
                    x = (index % columns) * cell_width
                    y = (index // columns) * cell_height
                    sheet.alpha_composite(frame, (x, y))

            png_path = temporary_dir / f"{variant.name}-{clip.name}-{sheet_index:02d}.png"
            webp_name = f"{clip.name}-{sheet_index:02d}.webp"
            webp_path = variant_dir / webp_name
            sheet.save(png_path, format="PNG", compress_level=1)
            encode_webp(png_path, webp_path, quality, alpha_quality)
            sheets.append(
                {
                    "src": f"{variant.name}/{webp_name}",
                    "width": sheet_width,
                    "height": sheet_height,
                    "columns": columns,
                    "rows": used_rows,
                    "frameOffset": offset,
                    "firstFrame": clip.frame_start + offset,
                    "frameCount": len(batch),
                    "bytes": webp_path.stat().st_size,
                }
            )

    return {
        "frameStart": clip.frame_start,
        "frameEnd": clip.frame_end,
        "frameCount": clip.frame_count,
        "sourceCrop": {
            "x": crop[0],
            "y": crop[1],
            "width": crop[2] - crop[0],
            "height": crop[3] - crop[1],
        },
        "cell": {"width": cell_width, "height": cell_height},
        "framesPerSheet": frames_per_sheet,
        "sheets": sheets,
    }


def build_poster(
    *,
    output_root: Path,
    variant: Variant,
    frame_path: Path,
    crop: tuple[int, int, int, int],
    quality: int,
    alpha_quality: int,
) -> dict:
    clip = CLIPS[0]
    width, height = cell_size(variant, clip, crop)
    variant_dir = output_root / variant.name
    webp_name = "poster.webp"
    webp_path = variant_dir / webp_name
    with tempfile.TemporaryDirectory(prefix="journey-poster-") as temporary:
        png_path = Path(temporary) / "poster.png"
        with Image.open(frame_path) as image:
            poster = image.convert("RGBA").crop(crop).resize((width, height), Image.Resampling.LANCZOS)
            poster.save(png_path, format="PNG", compress_level=1)
        encode_webp(png_path, webp_path, quality, alpha_quality)
    return {
        "src": f"{variant.name}/{webp_name}",
        "width": width,
        "height": height,
        "bytes": webp_path.stat().st_size,
        "sourceCrop": {
            "x": crop[0],
            "y": crop[1],
            "width": crop[2] - crop[0],
            "height": crop[3] - crop[1],
        },
    }


def main() -> int:
    args = parse_args()
    if shutil.which("cwebp") is None:
        raise RuntimeError("cwebp is required but was not found on PATH")
    if not 0 <= args.quality <= 100 or not 0 <= args.alpha_quality <= 100:
        raise ValueError("WebP quality values must be between 0 and 100")

    input_dir = args.input.expanduser().resolve()
    output_dir = args.output.expanduser().resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    frames = {clip.name: expected_frames(input_dir, clip) for clip in CLIPS}
    crops = {clip.name: union_alpha_bbox(frames[clip.name]) for clip in CLIPS}

    manifest = {
        "version": 1,
        "generator": "tools/build_journey_sheets.py",
        "source": {"width": SOURCE_SIZE[0], "height": SOURCE_SIZE[1], "frameCount": 160},
        "maxSheetSize": args.max_sheet_size,
        "encoding": {
            "format": "webp",
            "quality": args.quality,
            "alphaQuality": args.alpha_quality,
        },
        "variants": {},
    }

    budget_failures = []
    for variant in VARIANTS:
        clip_data = {}
        for clip in CLIPS:
            clip_data[clip.name] = build_clip(
                output_root=output_dir,
                variant=variant,
                clip=clip,
                frame_paths=frames[clip.name],
                crop=crops[clip.name],
                max_size=args.max_sheet_size,
                quality=args.quality,
                alpha_quality=args.alpha_quality,
            )
        poster = build_poster(
            output_root=output_dir,
            variant=variant,
            frame_path=frames["shade"][-1],
            crop=crops["shade"],
            quality=args.quality,
            alpha_quality=args.alpha_quality,
        )
        total_bytes = poster["bytes"] + sum(
            sheet["bytes"]
            for clip in clip_data.values()
            for sheet in clip["sheets"]
        )
        manifest["variants"][variant.name] = {
            "budgetBytes": variant.budget,
            "totalBytes": total_bytes,
            "poster": poster,
            "clips": clip_data,
        }
        if total_bytes > variant.budget:
            budget_failures.append((variant.name, total_bytes, variant.budget))

    manifest_path = output_dir / "journey-manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

    print(json.dumps({
        "manifest": str(manifest_path),
        "variants": {
            name: {
                "bytes": data["totalBytes"],
                "budgetBytes": data["budgetBytes"],
                "sheetCount": sum(len(clip["sheets"]) for clip in data["clips"].values()),
            }
            for name, data in manifest["variants"].items()
        },
    }, indent=2))

    if budget_failures:
        details = ", ".join(f"{name}: {size} > {budget}" for name, size, budget in budget_failures)
        raise SystemExit(f"Asset budget exceeded ({details})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
