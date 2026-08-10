#!/usr/bin/env python3
"""Validate Journey Organic v3 asset coverage, budgets, and decoded memory."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


MAX_DECODED_WINDOW = 48 * 1024 * 1024


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("manifest", type=Path)
    return parser.parse_args()


def validate_variant(root: Path, name: str, variant: dict) -> dict:
    clip = variant["clip"]
    expected_offset = 0
    transferred = 0
    decoded_sizes = []
    for sheet in clip["sheets"]:
        if sheet["frameOffset"] != expected_offset:
            raise ValueError(f"{name}: expected frameOffset {expected_offset}, got {sheet['frameOffset']}")
        expected_offset += sheet["frameCount"]
        path = root / sheet["src"]
        if not path.is_file():
            raise FileNotFoundError(path)
        actual_bytes = path.stat().st_size
        if actual_bytes != sheet["bytes"]:
            raise ValueError(f"{name}: byte mismatch for {path.name}: {actual_bytes} != {sheet['bytes']}")
        transferred += actual_bytes
        decoded_sizes.append(sheet["width"] * sheet["height"] * 4)

    if expected_offset != clip["frameCount"]:
        raise ValueError(f"{name}: sheets cover {expected_offset} frames, expected {clip['frameCount']}")

    for key in ("poster", "staticStill", "finalStill"):
        path = root / variant[key]["src"]
        if not path.is_file():
            raise FileNotFoundError(path)
        transferred += path.stat().st_size

    if transferred != variant["totalBytes"]:
        raise ValueError(f"{name}: totalBytes mismatch: {transferred} != {variant['totalBytes']}")
    if transferred > variant["budgetBytes"]:
        raise ValueError(f"{name}: transfer budget exceeded")

    window = variant.get("slidingWindow", 2)
    worst_decoded = 0
    for index in range(len(decoded_sizes)):
        worst_decoded = max(worst_decoded, sum(decoded_sizes[index : index + window]))
    if worst_decoded > MAX_DECODED_WINDOW:
        raise ValueError(f"{name}: decoded window exceeds 48 MB: {worst_decoded}")

    return {
        "frames": expected_offset,
        "sheets": len(clip["sheets"]),
        "transferBytes": transferred,
        "worstDecodedWindowBytes": worst_decoded,
    }


def main() -> None:
    args = parse_args()
    manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
    if manifest.get("version") != 3:
        raise ValueError("Journey manifest version 3 is required")
    if manifest["source"]["frameCount"] != 144:
        raise ValueError("Final Journey Organic manifest must contain 144 frames")
    timeline = manifest["timeline"]
    ordered = [timeline[key] for key in ("shadeStart", "zoomStart", "finalSwap", "shadeEnd", "zoomEnd")]
    if ordered != sorted(ordered):
        raise ValueError(f"Timeline is not ordered: {ordered}")
    results = {
        name: validate_variant(args.manifest.parent, name, variant)
        for name, variant in manifest["variants"].items()
    }
    print(json.dumps({"manifest": str(args.manifest), "variants": results}, indent=2))


if __name__ == "__main__":
    main()
