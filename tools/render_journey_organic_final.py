"""Render the saved Journey Organic v3 scene as a resumable RGBA sequence.

Run with Blender, not system Python:

    blender -b Ventana_Journey_Organic_v3.blend \
      --python tools/render_journey_organic_final.py -- \
      --output /path/to/master-final-eevee-v3
"""

from __future__ import annotations

import argparse
import json
import sys
import time
from pathlib import Path

import bpy


def parse_args() -> argparse.Namespace:
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--frame-start", type=int, default=1)
    parser.add_argument("--frame-end", type=int, default=144)
    parser.add_argument("--width", type=int, default=1200)
    parser.add_argument("--height", type=int, default=1600)
    return parser.parse_args(argv)


def main() -> None:
    args = parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE"
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.render.image_settings.compression = 15
    scene.render.resolution_x = args.width
    scene.render.resolution_y = args.height
    scene.render.resolution_percentage = 100
    scene.render.use_file_extension = True
    scene.render.use_persistent_data = True

    node_group = getattr(scene, "compositing_node_group", None)
    if node_group:
        for node in node_group.nodes:
            if node.bl_idname == "CompositorNodeOutputFile":
                node.mute = True

    missing = [
        frame
        for frame in range(args.frame_start, args.frame_end + 1)
        if not (args.output / f"frame_{frame:04d}.png").is_file()
    ]
    print(
        "JOURNEY_RENDER_START "
        + json.dumps({"frames": [args.frame_start, args.frame_end], "missing": len(missing), "output": str(args.output)}),
        flush=True,
    )
    started_all = time.perf_counter()
    for position, frame in enumerate(missing, start=1):
        destination = args.output / f"frame_{frame:04d}.png"
        scene.frame_set(frame)
        scene.render.filepath = str(destination)
        started_frame = time.perf_counter()
        bpy.ops.render.render(write_still=True)
        print(
            "JOURNEY_FRAME_DONE "
            + json.dumps(
                {
                    "frame": frame,
                    "remaining": len(missing) - position,
                    "elapsedSeconds": round(time.perf_counter() - started_frame, 3),
                    "bytes": destination.stat().st_size,
                }
            ),
            flush=True,
        )
    print(
        "JOURNEY_RENDER_COMPLETE "
        + json.dumps(
            {
                "count": len(list(args.output.glob("frame_*.png"))),
                "elapsedSeconds": round(time.perf_counter() - started_all, 3),
            }
        ),
        flush=True,
    )


if __name__ == "__main__":
    main()
