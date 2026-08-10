# Handoff para socio — Arrive Aruba Journey Organic v3

Fecha de corte: 9 de agosto de 2026

Repositorio: `git@github.com:morfemartin/Web_Arrive-Aruba.git`

Rama de desarrollo aprobada: `codex/journey-organic-v3`

Preview pública: <https://morfemartin.github.io/Web_Arrive-Aruba/lab/journey-organic.html>

## 1. Objetivo del handoff

Continuar el desarrollo visual y frontend de la entrada de Arrive Aruba, principalmente:

- banner y navegación;
- fondo azul, nubes, degradados y parallax;
- composición responsive;
- contenido posterior de ejemplo;
- preparación e integración final en Shopify OS 2.0.

La producción 3D ya está terminada. El socio, Cursor o Claude **no deben abrir Blender, modificar la escena, volver a renderizar ni sustituir la animación 3D**, salvo una solicitud nueva y explícita de Martin.

## 2. Qué está aprobado y congelado

La entrega 3D se trata como un componente visual cerrado:

- 144 frames;
- persiana cerrada al inicio;
- apertura mediante scroll;
- movimiento lateral del paisaje de Aruba;
- juego completo de luces internas;
- resplandor blanco final;
- marco gris `Window_Tunnel`;
- logo sobre la persiana;
- cámara Blender fija;
- acercamiento realizado en la web.

El navegador recibe sprites WebP ya generados. Para continuar el banner y el fondo **no se necesitan** el `.blend`, Blender ni los 144 PNG maestros.

### Archivos 3D de respaldo — no son parte del trabajo diario

- Blend aprobado: `/Users/martinmorfe/Documents/Aruba animacion/3d-arrive-aruba-ventana/Ventana_Journey_Organic_v3.blend`
- PNG maestros: `/Users/martinmorfe/Documents/Aruba animacion/renders/journey-organic/master-final-eevee-v3`

Estas rutas existen en el equipo de Martin y no se descargan desde GitHub. Si alguna vez se necesita regenerar assets, se debe solicitar primero el paquete maestro a Martin.

## 3. Descargar el proyecto

```bash
git clone git@github.com:morfemartin/Web_Arrive-Aruba.git
cd Web_Arrive-Aruba
git switch codex/journey-organic-v3
git pull --ff-only
```

Si se trabajará con HTTPS:

```bash
git clone https://github.com/morfemartin/Web_Arrive-Aruba.git
cd Web_Arrive-Aruba
git switch codex/journey-organic-v3
```

Crear una rama propia antes de editar:

```bash
git switch -c socio/journey-banner-background
```

No trabajar directamente sobre `gh-pages`. Esa rama contiene únicamente la publicación de demostración.

## 4. Ejecutar la preview local

No hay instalación de Node ni proceso de compilación para la preview actual.

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Abrir:

<http://127.0.0.1:8765/lab/journey-organic.html>

No abrir el HTML con doble clic usando `file://`; el manifiesto y los sprites se cargan mediante `fetch` y requieren un servidor HTTP.

## 5. Mapa de archivos

| Archivo | Responsabilidad | ¿Se puede editar? |
| --- | --- | --- |
| `lab/journey-organic.html` | Preview, header y contenido de ejemplo | Sí |
| `journey-organic.css` | Fondo, nubes, banner, layout y responsive | Sí |
| `journey-organic.js` | Runtime de sprites, scroll, zoom y lifecycle | Solo con pruebas |
| `preview-assets/journey-organic/manifest.json` | Contrato generado de los 144 frames | No manualmente |
| `preview-assets/journey-organic/**/*.webp` | Entrega 3D optimizada | No |
| `shopify/sections/journey-organic.liquid` | Scaffold de sección Shopify OS 2.0 | Sí, en fase Shopify |
| `tools/build_journey_organic_assets.py` | Generador de sprites | No para banner/fondo |
| `tools/render_journey_organic_final.py` | Render Blender reproducible | Fuera de alcance |
| `tools/setup_journey_organic_scene.py` | Automatización histórica de escena | Fuera de alcance |

Documentación complementaria:

- `docs/JOURNEY_ORGANIC_V3.md`
- `docs/ESTADO_JOURNEY_ORGANIC_V3.md`

## 6. Arquitectura actual

```text
scroll nativo
    ↓
journey-organic.js calcula progreso 0–1
    ↓
manifest.json selecciona desktop o móvil
    ↓
ImageBitmap carga la hoja necesaria
    ↓
canvas dibuja el frame 3D
    ↓
CSS aplica fondo, nubes, copy, parallax y zoom web
    ↓
still final cubre el viewport y entrega el contenido posterior
```

El canvas y los elementos 3D no deben convertirse en video de fondo ni mezclarse dentro de una imagen del banner. Deben permanecer independientes para conservar scroll reversible, responsive y fallbacks.

## 7. Contrato visual que debe conservarse

### Branding Arrive Aruba

- Fondo basado en Star Sapphire y Silver Lake Blue.
- Luz Cannoli Cream cerca del horizonte.
- Logo Arrive Aruba siempre visible y con zona de seguridad.
- Estética luminosa, aérea y orgánica; no volver al fondo negro.
- Nubes suaves, sin apariencia de stock ni bordes evidentes.
- El contenido comercial posterior debe seguir siendo secundario mientras se diseña la entrada.

### Movimiento

- Scroll nativo; no implementar scroll-jacking.
- No añadir cursor personalizado.
- No hornear movimientos de cámara dentro de los sprites.
- Respetar `prefers-reduced-motion`.
- La apertura debe comenzar casi inmediatamente.
- El zoom debe cubrir completamente desktop y móvil sin revelar bordes.

### Timeline congelado

| Progreso | Acción |
| --- | --- |
| `0.00–0.02` | Persiana cerrada |
| `0.02–0.50` | Apertura inicial |
| `0.50–0.94` | Zoom web y continuación de luces |
| `0.90–0.98` | Resplandor y still final |
| `0.98–1.00` | Salida al contenido posterior |

No modificar estos valores mientras se trabaja únicamente en banner o fondo.

## 8. Estado técnico de los assets HQ

| Variante | Canvas | Transferencia total | Memoria simultánea máxima |
| --- | ---: | ---: | ---: |
| Desktop | `727 × 1000` | 8,677,456 bytes | 23,264,000 bytes |
| Móvil | `509 × 700` | 4,090,376 bytes | 22,803,200 bytes |

- Desktop usa WebP 92.
- Móvil usa WebP 90.
- Poster, fallback y still final usan WebP 95.
- El primer salto a un frame lejano puede tardar brevemente mientras descarga una hoja HQ. No significa que la persiana esté rota.
- No bajar otra vez la calidad sin aprobación de Martin.

## 9. Plan de desarrollo recomendado

### Fase A — Baseline y protección del 3D

1. Clonar la rama aprobada.
2. Ejecutar la preview sin modificaciones.
3. Capturar referencia en `1440 × 900`, `820 × 900` y `375 × 812`.
4. Confirmar que abre, revierte y termina en blanco.
5. No editar el manifiesto ni los WebP.

Resultado: baseline verificable antes de intervenir el banner y el fondo.

### Fase B — Fondo y atmósfera

Trabajar únicamente en las clases:

- `.aa-organic-sky`
- `.aa-organic-sky__wash`
- `.aa-organic-cloud*`
- `.aa-organic-sky__haze`

Objetivos:

- mejorar profundidad y luminosidad sin competir con la ventana;
- evitar banding, cortes y rectángulos;
- mantener contraste suficiente para logo y navegación;
- preservar rendimiento móvil;
- verificar reduced motion.

No rasterizar todo el fondo como una sola imagen si puede resolverse con capas ligeras y degradados.

### Fase C — Banner y navegación

Trabajar en:

- `.aa-organic-header`
- `.aa-organic-header__brand`
- `.aa-organic-header__home`
- `.aa-organic-story`
- `.aa-organic-story__script`
- `.aa-organic-story__title`
- `.aa-organic-skip`

Separar contenido de presentación. Textos, enlaces y logo deben poder convertirse después en settings de Shopify.

Baseline aprobado para esta fase: ventana móvil al 74% del viewport, fondo de cielo a azul profundo, nubes CSS animadas y mensaje “What you felt when you arrived, take it home.” La ventana permanece por encima del mensaje durante el acercamiento.

Validar:

- safe areas de iPhone;
- ancho menor de 380 px;
- orientación horizontal;
- contraste sobre todos los frames;
- navegación por teclado;
- ausencia de solapamientos durante el zoom.

### Fase D — Integración Shopify OS 2.0

Usar `shopify/sections/journey-organic.liquid` como scaffold, no como entrega final cerrada.

Settings editables recomendados:

- logo;
- texto principal;
- etiqueta y URL de “Skip to shop”;
- etiqueta de inicio;
- texto accesible;
- poster y fallback;
- duración dentro de `200–400vh`.

Valores que deben permanecer fijos para proteger branding y sincronización:

- colores Arrive Aruba;
- timeline;
- apertura normalizada;
- cantidad de frames;
- dimensiones de celda;
- orden de sprites.

### Bloqueo Shopify conocido

La entrega HQ actual tiene 36 hojas desktop y 18 móviles: 54 en total. El scaffold Liquid usa un bloque por hoja y declara `max_blocks: 40`, por lo que **no debe migrarse literalmente con 54 bloques**.

Solución recomendada:

1. Subir los WebP 3D fijos al directorio `assets/` del theme con nombres estables.
2. Generar el manifiesto Liquid mediante `asset_url` desde una lista fija versionada.
3. Mantener como `image_picker` únicamente logo, posters/fallbacks y contenido editable.
4. Conservar soporte para varias instancias y Theme Editor.
5. No exponer los 54 sprites como decisiones del merchant.

Esta arquitectura encaja mejor porque el 3D es branding aprobado, no contenido editorial.

### Fase E — Rendimiento y carga inicial

La calidad HQ aumentó el tiempo de primera carga. Antes del lanzamiento Shopify:

1. precargar poster y primera hoja;
2. cargar anticipadamente las siguientes hojas durante idle;
3. mantener máximo dos `ImageBitmap` decodificados;
4. conservar fallback estático para Save Data, redes lentas y errores;
5. mostrar la persiana cerrada hasta tener lista la primera hoja;
6. medir red 4G simulada y Safari iOS físico;
7. no ocultar la latencia reduciendo otra vez la calidad sin aprobación.

## 10. Ciclo de vida Shopify obligatorio

La sección final debe:

- inicializarse al cargar normalmente;
- responder a `shopify:section:load`;
- desmontarse en `shopify:section:unload`;
- liberar `ImageBitmap`, observers y animation frames;
- permitir más de una instancia sin IDs globales;
- sobrevivir reordenamiento en Theme Editor;
- funcionar sin JavaScript mostrando un poster útil.

El runtime actual ya contiene la base de este lifecycle. No reemplazarlo por un singleton global.

## 11. Pruebas mínimas antes de cada PR

```bash
node --check journey-organic.js
python3 tools/validate_journey_organic_manifest.py \
  preview-assets/journey-organic/manifest.json
git diff --check
```

QA visual:

- Chrome desktop;
- Safari desktop;
- Safari iPhone físico;
- `1440 × 900`;
- tablet;
- `375 × 812`;
- viewport menor de 380 px;
- orientación horizontal;
- scroll rápido hacia adelante y reverso;
- `prefers-reduced-motion`;
- Save Data o red lenta;
- consola sin errores;
- Theme Editor load/unload cuando exista el theme de prueba.

## 12. Git, seguridad y entrega

- Usar ramas descriptivas; no editar `gh-pages` directamente.
- Commits con:
  - `user.name`: `Martin Morfe`
  - `user.email`: `223161775+morfemartin@users.noreply.github.com`
- No subir `.env`, tokens, llaves, certificados ni logs.
- Revisar `git status`, `git diff` y `git diff --cached` antes de cada commit.
- No incluir cambios accidentales en scripts Blender.
- Abrir PR hacia la rama acordada y adjuntar capturas desktop/móvil.
- La publicación de preview se copia a `gh-pages` solo después de aprobación.

## 13. Definition of Done del socio

El trabajo se considera listo cuando:

- banner y fondo se sienten parte del branding Arrive Aruba;
- el 3D permanece visual y temporalmente intacto;
- no aparecen cortes, halos, bordes ni fondos negros;
- la persiana abre al comenzar el scroll;
- la experiencia cubre desktop, tablet y móvil;
- los fallbacks funcionan;
- la carga HQ está medida y comunicada;
- la sección Shopify usa Theme Assets para los sprites fijos;
- Theme Editor puede montar y desmontar la sección;
- QA y documentación acompañan el PR.

## 14. Prompt inicial para Cursor o Claude

Copiar este bloque en el agente que continuará el proyecto:

```text
Trabaja como frontend senior y especialista en Shopify OS 2.0 sobre Arrive Aruba Journey Organic v3.

Lee completamente:
- docs/HANDOFF_SOCIO_JOURNEY_SHOPIFY.md
- docs/JOURNEY_ORGANIC_V3.md
- docs/ESTADO_JOURNEY_ORGANIC_V3.md

Tu alcance es banner, fondo, atmósfera, responsive y futura integración Shopify. La producción 3D está aprobada y congelada: no abras Blender, no regeneres sprites, no modifiques manifest.json, no alteres el timeline ni sustituyas el canvas.

Antes de editar:
1. ejecuta la preview local;
2. audita los archivos relevantes;
3. crea una rama propia;
4. documenta el baseline desktop y móvil;
5. presenta un plan corto por fases.

Mantén branding Arrive Aruba, scroll nativo, reduced motion, accesibilidad y compatibilidad Safari iOS. Para Shopify, migra los sprites 3D fijos a Theme Assets en lugar de crear un bloque editable por cada hoja. No publiques sin QA y revisión humana.
```

## 15. Contacto y decisiones que requieren aprobación

Detener el trabajo y consultar a Martin antes de:

- cambiar la ventana, persiana, logo 3D, luces o video Aruba;
- modificar timeline o velocidad de apertura;
- reducir calidad o cantidad de frames;
- volver a renderizar;
- cambiar colores oficiales;
- sustituir scroll por otra interacción;
- publicar en producción Shopify;
- mezclar cambios no relacionados dentro del mismo PR.
