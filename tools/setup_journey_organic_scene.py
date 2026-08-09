#!/usr/bin/env python3
"""Build the non-destructive Arrive Aruba Journey Organic v3 Blender scene.

Run with Blender, opening the source file first:

    Blender --background SOURCE.blend --python tools/setup_journey_organic_scene.py -- OUTPUT.blend

The source scene is never saved. All changes are written to OUTPUT.blend.
"""

from __future__ import annotations

import math
import sys
from pathlib import Path

import bpy


FRAME_START = 1
SHADE_OPEN_FRAME = 82
LIGHT_REVEAL_FRAME = 96
FRAME_END = 120

KEEP_VISIBLE = {
    "Window_InnerFrame",
    "Window_Tunnel",
    "Window_Shade",
    "Window_ShadeHandle",
    "Window_Glass",
    "Video_Aruba_Clipped",
    "Window_ShadeSlot",
    "Window_GlassGroove",
    "Window_Mystery_Light_Shaft",
    "Final_Whiteout_Aperture_Streak_1",
    "Final_Whiteout_Aperture_Streak_2",
    "Final_Whiteout_Aperture_Streak_3",
}

HIDE_FROM_RENDER = {
    "Wall_Cabin",
    "Window_Frame.001",
    "Video_Aruba",
    "Window_BackCap",
    "Final_Whiteout_Window_Source",
    "Final_Whiteout_Camera_Wash",
    "Light_Cabin_Left_Blue_LED_Soft",
    "Cloud_Pass_Rig",
    "Cloud_Pass_Volume_Main",
    "Cloud_Pass_Volume_Left_Core",
    "Cloud_Pass_Volume_Right_Core",
    "Cloud_Pass_Volume_Lower_Wisp",
    "Cloud_Pass_Volume_Upper_Haze",
    "Cloud_Pass_Volume_Diagonal_Wisp_A",
    "Cloud_Pass_Volume_Diagonal_Wisp_B",
}

LIGHT_KEYS = {
    "Light_Window_Side_Left_Through_Window": ((1, 40.0), (82, 250.0), (120, 720.0)),
    "Light_Window_Side_Right_Through_Window": ((1, 12.0), (82, 92.0), (120, 240.0)),
    "Light_Window_Sun_Practical_Fill": ((1, 220.0), (82, 2100.0), (120, 3200.0)),
    "Light_Window_Slit_Normal_Flare": ((1, 0.0), (70, 0.0), (96, 240.0), (120, 90.0)),
    "Final_Whiteout_Window_Blast_Light": ((1, 0.0), (88, 0.0), (108, 120.0), (120, 320.0)),
}


def output_path() -> Path:
    args = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    if len(args) != 1:
        raise SystemExit("Expected one OUTPUT.blend path after --")
    return Path(args[0]).expanduser().resolve()


def clear_animation(target: object) -> None:
    if getattr(target, "animation_data", None):
        target.animation_data_clear()


def set_interpolation(target: object, interpolation: str = "BEZIER") -> None:
    animation_data = getattr(target, "animation_data", None)
    action = animation_data.action if animation_data else None
    if not action or not hasattr(action, "fcurves"):
        return
    for curve in action.fcurves:
        for point in curve.keyframe_points:
            point.interpolation = interpolation


def animate_value(target: object, data_path: str, keys: tuple[tuple[int, float], ...]) -> None:
    clear_animation(target)
    for frame, value in keys:
        setattr(target, data_path, value)
        target.keyframe_insert(data_path=data_path, frame=frame)
    set_interpolation(target, "BEZIER")


def animate_location_z(obj: bpy.types.Object, keys: tuple[tuple[int, float], ...]) -> None:
    clear_animation(obj)
    for frame, value in keys:
        obj.location.z = value
        obj.keyframe_insert(data_path="location", index=2, frame=frame)
    set_interpolation(obj, "BEZIER")


def animate_location_x(obj: bpy.types.Object, keys: tuple[tuple[int, float], ...]) -> None:
    clear_animation(obj)
    for frame, value in keys:
        obj.location.x = value
        obj.keyframe_insert(data_path="location", index=0, frame=frame)
    set_interpolation(obj, "BEZIER")


def make_translucent_emission(
    name: str,
    color: tuple[float, float, float, float],
    strength: float,
    opacity_keys: tuple[tuple[int, float], ...],
) -> bpy.types.Material:
    material = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    material.use_nodes = True
    nodes = material.node_tree.nodes
    links = material.node_tree.links
    nodes.clear()

    output = nodes.new("ShaderNodeOutputMaterial")
    transparent = nodes.new("ShaderNodeBsdfTransparent")
    emission = nodes.new("ShaderNodeEmission")
    emission.inputs["Color"].default_value = color
    emission.inputs["Strength"].default_value = strength
    mix = nodes.new("ShaderNodeMixShader")

    links.new(transparent.outputs[0], mix.inputs[1])
    links.new(emission.outputs[0], mix.inputs[2])
    links.new(mix.outputs[0], output.inputs["Surface"])

    for frame, opacity in opacity_keys:
        mix.inputs[0].default_value = opacity
        mix.inputs[0].keyframe_insert(data_path="default_value", frame=frame)

    return material


def assign_material(obj_name: str, material: bpy.types.Material) -> None:
    obj = bpy.data.objects.get(obj_name)
    if not obj or not hasattr(obj.data, "materials"):
        return
    obj.data.materials.clear()
    obj.data.materials.append(material)


def setup_visibility() -> None:
    for name in HIDE_FROM_RENDER:
        obj = bpy.data.objects.get(name)
        if obj:
            obj.hide_render = True
            obj.hide_set(True)

    for name in KEEP_VISIBLE | set(LIGHT_KEYS):
        obj = bpy.data.objects.get(name)
        if obj:
            obj.hide_render = False
            obj.hide_set(False)


def setup_camera() -> None:
    camera = bpy.data.objects.get("Camera_Main")
    target = bpy.data.objects.get("Win_Target")
    if not camera or not target:
        raise RuntimeError("Camera_Main and Win_Target are required")

    clear_animation(camera)
    clear_animation(camera.data)
    clear_animation(target)

    camera.location = (0.0, -1.72, -0.015)
    camera.data.lens = 52.0
    camera.data.dof.use_dof = False
    target.location = (0.0, 0.15, 0.0)

    for constraint in camera.constraints:
        if hasattr(constraint, "target"):
            constraint.target = target

    bpy.context.scene.camera = camera


def setup_animation() -> None:
    shade = bpy.data.objects.get("Window_Shade")
    if not shade:
        raise RuntimeError("Window_Shade is required")

    shade.scale = (1.027, 1.027, 1.027)
    animate_location_z(shade, ((1, 0.0), (12, 0.0), (82, 0.673), (120, 0.673)))

    for name, keys in LIGHT_KEYS.items():
        light_obj = bpy.data.objects.get(name)
        if not light_obj or light_obj.type != "LIGHT":
            continue
        animate_value(light_obj.data, "energy", keys)

    streak_material = make_translucent_emission(
        "Mat_Journey_Organic_Streaks",
        (1.0, 0.88, 0.68, 1.0),
        5.0,
        ((1, 0.0), (92, 0.0), (108, 0.16), (120, 0.28)),
    )
    for index, name in enumerate(
        (
            "Final_Whiteout_Aperture_Streak_1",
            "Final_Whiteout_Aperture_Streak_2",
            "Final_Whiteout_Aperture_Streak_3",
        )
    ):
        obj = bpy.data.objects.get(name)
        if not obj:
            continue
        clear_animation(obj)
        original_scale = (0.8 + index * 0.08,) * 3
        for frame, factor in ((1, 0.0), (92, 0.0), (108, 0.72), (120, 1.0)):
            obj.scale = tuple(component * factor for component in original_scale)
            obj.keyframe_insert(data_path="scale", frame=frame)
        assign_material(name, streak_material)

    shaft_material = make_translucent_emission(
        "Mat_Journey_Organic_Light_Shaft",
        (0.68, 0.85, 1.0, 1.0),
        2.2,
        ((1, 0.0), (18, 0.05), (72, 0.18), (100, 0.28), (120, 0.16)),
    )
    assign_material("Window_Mystery_Light_Shaft", shaft_material)


def squircle_point(rx: float, rz: float, theta: float, exponent: float = 3.0) -> tuple[float, float]:
    cosine = math.cos(theta)
    sine = math.sin(theta)
    x = rx * math.copysign(abs(cosine) ** (2.0 / exponent), cosine)
    z = rz * math.copysign(abs(sine) ** (2.0 / exponent), sine)
    return x, z


def setup_clipped_video() -> None:
    source = bpy.data.objects.get("Video_Aruba")
    if not source or not getattr(source.data, "materials", None):
        raise RuntimeError("Video_Aruba with its material is required")

    existing = bpy.data.objects.get("Video_Aruba_Clipped")
    if existing:
        bpy.data.objects.remove(existing, do_unlink=True)

    source.hide_render = True
    source.hide_set(True)
    bpy.context.scene.frame_set(FRAME_START)

    segments = 128
    depth_y = 0.67
    rx = 0.305
    rz = 0.425
    vertices = [(0.0, depth_y, 0.0)]
    vertices.extend(
        (x, depth_y, z)
        for x, z in (squircle_point(rx, rz, 2.0 * math.pi * index / segments) for index in range(segments))
    )
    faces = [(0, index + 1, ((index + 1) % segments) + 1) for index in range(segments)]

    mesh = bpy.data.meshes.new("Video_Aruba_Clipped_Mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    clipped = bpy.data.objects.new("Video_Aruba_Clipped", mesh)
    bpy.context.scene.collection.objects.link(clipped)

    mesh.materials.append(source.data.materials[0])
    uv_layer = mesh.uv_layers.new(name="UVMap")
    for polygon in mesh.polygons:
        for loop_index in polygon.loop_indices:
            vertex = mesh.vertices[mesh.loops[loop_index].vertex_index].co
            uv_layer.data[loop_index].uv = (
                0.5 + vertex.x / (rx * 2.0),
                0.5 + vertex.z / (rz * 2.0),
            )

    clipped.hide_render = False
    clipped.hide_set(False)
    clipped["journey_role"] = "aperture-clipped Aruba footage"


def setup_shade_clip() -> None:
    shade = bpy.data.objects.get("Window_Shade")
    if not shade:
        raise RuntimeError("Window_Shade is required for aperture clipping")

    existing = bpy.data.objects.get("Window_Aperture_ClipVolume")
    if existing:
        bpy.data.objects.remove(existing, do_unlink=True)

    bpy.ops.mesh.primitive_cube_add(location=(0.0, 0.17, 0.0))
    clip = bpy.context.active_object
    clip.name = "Window_Aperture_ClipVolume"
    clip.dimensions = (0.595, 0.12, 0.835)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    bevel = clip.modifiers.new("Aperture_Rounded_Corners", "BEVEL")
    bevel.width = 0.11
    bevel.segments = 12
    bpy.context.view_layer.objects.active = clip
    bpy.ops.object.modifier_apply(modifier=bevel.name)

    for modifier in list(shade.modifiers):
        if modifier.name == "Journey_Aperture_Clip":
            shade.modifiers.remove(modifier)
    boolean = shade.modifiers.new("Journey_Aperture_Clip", "BOOLEAN")
    boolean.operation = "INTERSECT"
    boolean.solver = "EXACT"
    boolean.object = clip

    clip.display_type = "WIRE"
    clip.hide_render = True
    clip.hide_set(True)
    clip["journey_role"] = "non-rendering Boolean volume for the animated shade"


def setup_world_and_render() -> None:
    scene = bpy.context.scene
    scene.frame_start = FRAME_START
    scene.frame_end = FRAME_END
    scene.render.fps = 24
    scene.render.engine = "BLENDER_EEVEE"
    scene.render.film_transparent = True
    scene.render.resolution_x = 1200
    scene.render.resolution_y = 1600
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.render.image_settings.compression = 35

    world = scene.world or bpy.data.worlds.new("Journey_Organic_World")
    scene.world = world
    world.use_nodes = True
    background = world.node_tree.nodes.get("Background")
    if background:
        background.inputs["Color"].default_value = (0.12, 0.28, 0.48, 1.0)
        background.inputs["Strength"].default_value = 0.28

    scene.view_settings.look = "AgX - Medium High Contrast"
    scene.frame_set(FRAME_START)


def add_metadata() -> None:
    scene = bpy.context.scene
    scene["journey_version"] = "organic-v3"
    scene["journey_camera_motion"] = "web-only"
    scene["journey_visible_frame"] = "Window_InnerFrame"
    scene["journey_timeline"] = "shade:0.10-0.62;zoom:0.62-0.95;finish:0.95-1.00"


def main() -> None:
    destination = output_path()
    destination.parent.mkdir(parents=True, exist_ok=True)
    setup_visibility()
    setup_camera()
    setup_clipped_video()
    setup_shade_clip()
    setup_animation()
    setup_world_and_render()
    add_metadata()
    bpy.ops.wm.save_as_mainfile(filepath=str(destination))
    print(f"JOURNEY_ORGANIC_SCENE={destination}")


if __name__ == "__main__":
    main()
