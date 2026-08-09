# Arrive Aruba Journey Organic v3

Journey Organic v3 es una experiencia de entrada luminosa, dirigida por scroll y preparada para Shopify OS 2.0. Vive junto al prototipo anterior: no reemplaza `lab/journey.html`.

## Dirección visual

- Atmósfera Arrive Aruba a pantalla completa con Star Sapphire, Silver Lake Blue y luz Cannoli Cream.
- Nubes suaves creadas en CSS y parallax en la web.
- Un único marco interior, cristal, persiana y contenido de Aruba.
- Cámara fija en Blender. Todo el acercamiento se calcula en el navegador a partir de la apertura real.
- El contenido comercial posterior es deliberadamente mínimo para no distraer de la experiencia.

Valores aprobados: `DESIGN_VARIANCE: 7`, `MOTION_INTENSITY: 8`, `VISUAL_DENSITY: 2`.

## Archivos principales

- `lab/journey-organic.html`: preview independiente.
- `journey-organic.css`: branding, layout, nubes y adaptaciones responsive.
- `journey-organic.js`: runtime canvas, scroll, caché y ciclo de vida Shopify.
- `preview-assets/journey-organic/manifest.json`: contrato de assets v3.
- `shopify/sections/journey-organic.liquid`: sección OS 2.0.
- `tools/setup_journey_organic_scene.py`: construcción reproducible de la escena Blender.
- `tools/build_journey_organic_assets.py`: recorte, máscara y empaquetado WebP.

El `.blend` independiente se genera en:

`/Users/martinmorfe/Documents/Aruba animacion/3d-arrive-aruba-ventana/Ventana_Journey_Organic_v3.blend`

## Timeline

| Progreso | Acción |
| --- | --- |
| `0.00–0.10` | Persiana cerrada y nubes suaves |
| `0.10–0.62` | Apertura y juego de luces |
| `0.62–0.95` | Zoom web calculado desde la apertura |
| `0.80–0.95` | Cambio progresivo al still de alta resolución |
| `0.95–1.00` | La vista de Aruba cubre el viewport |

## Presupuesto y memoria

- Desktop: máximo 5 MB transferidos.
- Móvil: máximo 2.5 MB transferidos.
- El runtime mantiene como máximo dos sprite sheets decodificados y libera `ImageBitmap` al avanzar o desmontar la sección.
- Hay fallback estático para reduced motion, Save Data, redes 2G/3G y errores de carga.
- El scroll es nativo; no se secuestra la rueda ni se instala un listener de `scroll`.

## Regenerar los entregables

```bash
blender -b \
  "/Users/martinmorfe/Documents/Aruba animacion/3d-arrive-aruba-ventana/Ventana_Journey_Web_pre-animation_20260807.blend" \
  --python tools/setup_journey_organic_scene.py

python3 tools/build_journey_organic_assets.py \
  --input "/Users/martinmorfe/Documents/Aruba animacion/renders/journey-organic/master" \
  --output preview-assets/journey-organic
```

La escena conserva las luces posteriores y no agrega keyframes a posición, rotación, lente o enfoque de cámara.

## Delegación API

La comprobación de salud del orquestador local se ejecutó antes de implementar. En esta sesión `deepseek-exec` respondió HTTP 410 y `mistral-fast`/`zai-reason` respondieron HTTP 404. La indisponibilidad quedó registrada y no bloqueó el desarrollo; Codex mantuvo integración, revisión y QA.
