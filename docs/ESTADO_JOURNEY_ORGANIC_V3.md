# Estado — Journey Organic v3

Fecha: 9 de agosto de 2026

## Estado actual

La experiencia Journey Organic v3 está renderizada, empaquetada y validada para web. El prototipo anterior permanece intacto.

- Archivo Blender: `/Users/martinmorfe/Documents/Aruba animacion/3d-arrive-aruba-ventana/Ventana_Journey_Organic_v3.blend`
- Motor: Eevee
- Render maestro: 144 PNG RGBA de 1200 × 1600 px
- Carpeta maestra: `/Users/martinmorfe/Documents/Aruba animacion/renders/journey-organic/master-final-eevee-v3`
- Cámara fija, sin keyframes de posición, rotación o lente
- Persiana, movimiento lateral de Aruba y secuencia completa de luces conservados
- Marco gris `Window_Tunnel` visible y materiales finales ajustados

## Entrega web

- Preview: `lab/journey-organic.html`
- Runtime: `journey-organic.js`
- Estilos: `journey-organic.css`
- Assets: `preview-assets/journey-organic/`
- Manifiesto: `preview-assets/journey-organic/manifest.json`
- Shopify OS 2.0: `shopify/sections/journey-organic.liquid`

El runtime consume 144 frames y conserva el scroll nativo. La apertura comienza al 2% del recorrido, el zoom web comienza al 50%, el resplandor final entra al 90% y la transición termina al 98%.

El banner mobile-first usa una ventana 20% menor que la versión anterior, nubes CSS en movimiento, degradado Star Sapphire profundo y el mensaje de marca “What you felt when you arrived, take it home.” con Port Blair e ITC Legacy Serif. Los assets CSS, JavaScript y tipográficos necesarios también están preparados dentro de `shopify/assets/`.

## Presupuesto y rendimiento

| Variante | Peso empaquetado | Límite | Ventana decodificada máxima |
| --- | ---: | ---: | ---: |
| Desktop HQ | 8,677,456 bytes | 9 MiB | 23,264,000 bytes |
| Móvil HQ | 4,090,376 bytes | 4.5 MiB | 22,803,200 bytes |

Ambas variantes permanecen por debajo del límite de 48 MiB de imágenes decodificadas simultáneamente para Safari iOS. La entrega HQ usa WebP 92 en desktop, WebP 90 en móvil y calidad 95 para poster, fallback y still final.

## QA completado

- Desktop 1440 × 900: inicio, apertura, luces, zoom, resplandor, final y salida a tienda.
- Móvil 375 × 812: ventana completa sin cortes y cobertura total durante el zoom.
- Scroll rápido y reverso: vuelve correctamente al primer frame.
- Consola del navegador: sin errores ni advertencias.
- Fallback estático: poster abierto de Aruba para reduced motion, Save Data y redes lentas.
- Manifiesto, continuidad de sprites, presupuestos y memoria: validados por script.
- JavaScript, Python, JSON/Liquid y whitespace Git: validados.

## Reproducción

```bash
python3 tools/validate_journey_organic_manifest.py preview-assets/journey-organic/manifest.json
node --check journey-organic.js
python3 -m py_compile tools/build_journey_organic_assets.py tools/render_journey_organic_final.py tools/validate_journey_organic_manifest.py
```

El orquestador auxiliar local se comprobó antes de integrar código, pero su endpoint devolvió HTTP 410. La indisponibilidad quedó aislada y no bloqueó el render, la integración ni el QA final de Codex.
