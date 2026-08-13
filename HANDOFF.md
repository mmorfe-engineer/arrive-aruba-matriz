# Arrive Aruba — HANDOFF FINAL COMPLETO

**Hero · Ventana · Journey · Portal · Atmósfera de nubes · Publicación**

Documento generado para que un futuro humano o agente pueda continuar **sin** depender del historial de chat.

**Regla de exactitud:** lo no verificable en código/git se marca `NO VERIFICADO` o `NO ENCONTRADO`.

**Fecha de inspección del repo (local):** 2026-08-12 (zona del autor del último commit: `-0400`).

---

## 1. ESTADO ACTUAL DEL PROYECTO

### 1.1 Branch / HEAD

| Campo | Valor verificado |
|------|-------------------|
| Branch actual | `motion/next-idea` |
| Tracking | `origin/motion/next-idea` (up to date) |
| HEAD (completo) | `37457b5723d5fe1f888291f7e2ce50d56751018a` |
| Mensaje HEAD | `docs: add final approved live preview URL` |
| Autor HEAD | RM-cyber `<murorafnell@gmail.com>` |
| Fecha HEAD | Wed Aug 12 22:53:32 2026 -0400 |

### 1.2 Remotes

| Remote | URL |
|--------|-----|
| `origin` | `https://github.com/RM-cybyer/Web_Arrive-Aruba.git` |
| `upstream` | `https://github.com/morfemartin/Web_Arrive-Aruba.git` |

### 1.3 Estado de working tree (inspección)

```
On branch motion/next-idea
Your branch is up to date with 'origin/motion/next-idea'.

Untracked files:
	_references/

nothing added to commit but untracked files present
```

| Tipo | Estado |
|------|--------|
| Archivos tracked modificados | ninguno |
| Archivos tracked eliminados | ninguno |
| Untracked | `_references/` (artefactos de validación locales; **no** forman parte del commit publicado) |
| Working tree “limpio” respecto al tip publicado | **sí** (salvo `_references/` untracked) |

### 1.4 Ramas locales relevantes

| Branch | Tip (short) | Nota |
|--------|-------------|------|
| `motion/next-idea` (actual) | `37457b5` | Tip publicado + docs preview |
| `baseline/motion-portal-approved` | `ed17531` | Copia del baseline de portal |
| `motion/next-experiment` | `ed17531` | Rama de experimentación previa al rollback de video |
| `main` (local pointer) | `ed17531` | El pointer local puede estar atrasado respecto a `origin/main` |

### 1.5 Tips remotos verificados (últimos `git ls-remote`)

| Ref | SHA completo |
|-----|--------------|
| `origin/main` | `37457b5723d5fe1f888291f7e2ce50d56751018a` |
| `origin/gh-pages` | `37457b5723d5fe1f888291f7e2ce50d56751018a` |
| `origin/motion/next-idea` | `37457b5723d5fe1f888291f7e2ce50d56751018a` |
| `upstream/main` | `37457b5723d5fe1f888291f7e2ce50d56751018a` |
| `upstream/gh-pages` | `37457b5723d5fe1f888291f7e2ce50d56751018a` |

### 1.6 Commits inmediatamente relacionados (más recientes primero)

| SHA completo | Mensaje |
|--------------|---------|
| `37457b5723d5fe1f888291f7e2ce50d56751018a` | `docs: add final approved live preview URL` |
| `e097daa158d44d73ba09ebff813b68f8a79521fc` | `feat(hero): publish approved living cloud atmosphere` |
| `ed17531cd392fa6377f459fc0bb733e1ae47e018` | `feat(motion): lock approved window portal transition baseline` |
| `3b3c66ac4ccc077d36a540c15c0c4fe449314b2f` | `chore: lock approved mobile hero baseline before motion` |

### 1.7 Stashes presentes (NO aplicar automáticamente)

```
stash@{0}: On motion/next-idea: cloud-atmosphere-leftover-working-tree
stash@{1}: On motion/next-experiment: cloud-atmosphere-experiment-before-rollback
```

También existe un archivo de backup fuera del repo (verificado `Test-Path = True`):

`C:\Users\muror\cloud-atmosphere-experiment-backup.patch`

**Clasificación:** experimento de atmósfera con video — **descartado**. No restaurar salvo petición explícita.

---

## 2. BASELINE APROBADO

### 2.1 Tag

| Campo | Valor |
|------|-------|
| Nombre | `motion-portal-approved-baseline` |
| Tag object (ref) | `d20f4596ff57202b9c4308151d36354babe43cbb` |
| Commit apuntado (completo) | `ed17531cd392fa6377f459fc0bb733e1ae47e018` |
| Mensaje del commit | `feat(motion): lock approved window portal transition baseline` |

### 2.2 Branch de respaldo del baseline

`baseline/motion-portal-approved` → mismo tip `ed17531cd392fa6377f459fc0bb733e1ae47e018`

### 2.3 Qué representaba el baseline

Estado **aprobado del portal / ventana / Journey** en homepage:

- Shell Figma hero (`figma-hero.css` + markup homepage)
- Runtime Journey Organic (`journey-organic.js` / `journey-organic.css`)
- Spritesheets / manifest en `preview-assets/journey-organic/`
- Escala del portal sobre `.aa-figma-hero__window` (`data-journey-lock-scale`)
- Whiteout progresivo → Cannoli Cream
- Frame 0 / poster cerrado en primer paint
- Scroll track / reverse por scroll

**No incluía** (aún) la atmósfera CSS multi-capa de nubes vivas publicada después en `e097daa…`.

### 2.4 Baseline mobile previo (antes de Journey en homepage)

Documento: `MOBILE-HERO-BASELINE.md`  
Commit: `3b3c66ac4ccc077d36a540c15c0c4fe449314b2f`  
Mensaje: `chore: lock approved mobile hero baseline before motion`

En ese checkpoint, Journey Organic estaba **off** en homepage; layout mobile estático aprobado.

### 2.5 Relación baseline ↔ estado actual

```
3b3c66a  mobile hero baseline (pre-motion)
   ↓
ed17531  motion-portal-approved-baseline  ← TAG + branch baseline/*
   ↓
e097daa  living cloud atmosphere (CSS only; Journey intacto)
   ↓
37457b5  README live preview URL          ← HEAD actual / tip publicado
```

### 2.6 “Estado visual aprobado de la ventana”

Significa: la geometría, posición responsive, slot `.aa-figma-hero__window`, cámara portal (scale sobre el slot), frames Journey, whiteout y handoff a `#shop` tal como quedaron en `ed17531…`, **sin** alterar esos sistemas para “arreglar” nubes.

---

## 3. ARQUITECTURA ACTUAL DEL HERO

### 3.1 Archivos principales

| Archivo | Rol |
|---------|-----|
| `Arrive Aruba - Homepage.dc.html` | Markup hero + shop |
| `figma-hero.css` | Layout hero, ventana, atmósfera CSS, white veil, chrome opacity |
| `journey-organic.js` | Runtime scroll → frames → portal scale → white → chrome |
| `journey-organic.css` | Estilos del visual Journey (lab/homepage scoped) |
| `preview-assets/journey-organic/manifest.json` | Frames, timeline, aperture, sheets |
| `preview-assets/figma-hero/*.png` | Plates de atmósfera / logo / (window assets históricos de baseline) |

### 3.2 Estructura HTML real (homepage)

```
<section.aa-figma-hero
         data-figma-hero-shell
         data-journey-organic
         data-journey-lock-scale
         data-manifest="preview-assets/journey-organic/manifest.json?v=3-hq1"
         data-scroll-length="500">
  <div.aa-figma-hero__sticky>
    <div.aa-figma-hero__bg-layer>          ← FUERA de Journey visual
      <div.aa-cloud-atmosphere>           ← atmósfera CSS
        __base / __distant / __mist / __warm
      </div>
      <div.aa-figma-hero__scrim>
      <div.aa-figma-hero__haze>
    <div.aa-figma-hero__seam-fade>
    <div.aa-figma-hero__fg-layer>
      logo / nav
      <div.aa-figma-hero__window>         ← PORTAL SLOT (Journey DENTRO)
        <div.aa-organic-visual data-journey-visual>
          poster / canvas / final
      copy + CTA #shop
```

### 3.3 Qué está fuera / dentro de Journey

| Capa | ¿Journey? |
|------|-----------|
| `.aa-cloud-atmosphere` (nubes CSS) | **FUERA** — no acoplada a scroll Journey |
| Scrim / haze / seam-fade | **FUERA** |
| Logo / nav / copy | Chrome UI; opacity via `--aa-chrome-opacity` del runtime |
| `.aa-figma-hero__window` + canvas frames | **DENTRO** Journey (scrub + scale del slot) |

### 3.4 Orden / z-index (valores en CSS actual)

| Elemento | z-index / nota |
|----------|----------------|
| `.aa-cloud-atmosphere` | `0` dentro bg-layer |
| `__base` | `0` |
| `__distant` | `1` |
| `__mist` | `2` |
| `__warm` | `3` |
| `.aa-figma-hero__window` | `2` (fg-layer) |
| `.aa-figma-hero__copy` | `5` |
| White veil `sticky::after` | `30` |

### 3.5 Diagrama de relación

```
[Scroll página]
      │
      ▼
journey-organic.js ──► frames canvas (dentro ventana)
                   ──► transform:scale(.aa-figma-hero__window)
                   ──► --aa-portal-white (velo cream)
                   ──► --aa-chrome-opacity (logo/nav/copy)
      │
      ▼
[#shop background #F0F0E5]  ← handoff visual continuo

[CSS infinite animations]
.aa-cloud-atmosphere ──► object-position pans (independiente del scroll)
```

---

## 4. VENTANA

### 4.1 Elemento

Clase: `.aa-figma-hero__window`  
Archivo CSS: `figma-hero.css`  
Contenido: `.aa-organic-visual` + poster/canvas/final

### 4.2 Desktop (default)

Del CSS actual:

- `position: absolute; z-index: 2;`
- `left: 50%; top: 50%; translate: -50% -50%;`
- `width: min(var(--aa-window-max-w), 26.4vw);` con `--aa-window-max-w: 380px`
- `aspect-ratio: var(--aa-window-ratio);` → `468 / 644`
- `max-height: 72%;`
- `overflow: hidden;` (también reforzado bajo `[data-journey-organic]`)
- `pointer-events: none;`
- `filter: drop-shadow(...)`
- `border-radius` en el slot ventana: **NO ENCONTRADO** en reglas de `.aa-figma-hero__window`
- `clip-path` en el slot ventana: **NO ENCONTRADO**

### 4.3 Mobile (`@media (max-width: 760px)`)

- `--aa-window-max-w: 214px`
- `--aa-window-ratio: 243 / 334`
- `top: 34%; left: 50%; translate: -50% -50%;`
- `width: min(var(--aa-window-max-w), 57.1vw, calc((100svh - 300px) * 243 / 334));`
- `max-height: min(294px, calc(100svh - 300px));`

### 4.4 Transform / origin (runtime)

En homepage con `data-journey-lock-scale`:

- JS aplica `transform: scale(<n>) !important` al **portal slot** (`.aa-figma-hero__window`)
- `transform-origin` desde aperture del manifest (centro del aperture):
  - default fallback aperture: `{ x: 0.12, y: 0.12, width: 0.76, height: 0.76 }`
  - manifest real: `x:0.122, y:0.12, width:0.756, height:0.763`
- Inner `.aa-organic-visual` permanece `transform: none !important` y `--aa-visual-scale: 1`

### 4.5 Frame 0 / apertura

- Primer paint: poster cerrado / frame 0 (comentarios y lógica en `journey-organic.js`)
- Apertura = scrub de frames 0 → `frames.shadeOpen` (manifest: **72**) durante ~`2.5 * stableVh` de scroll de sección

### 4.6 NO TOCAR (ventana)

- Dimensiones / posición / aspect-ratio desktop+mobile
- Overflow / sticky clipping del portal
- El hecho de que **scale va en el slot**, no en el visual interno
- Frame 0 cerrado
- Integración con canvas Journey
- No rediseñar la ventana para “mejorar” nubes

---

## 5. JOURNEY

### 5.1 Archivo runtime

`journey-organic.js` — IIFE; exporta `window.__AAOrganicJourneyRuntime` con `mountWithin` / `destroyWithin`.

Homepage monta vía atributos en `<section class="aa-figma-hero" data-journey-organic …>`.

### 5.2 Flags homepage

- `data-journey-organic`
- `data-journey-lock-scale` → activa cámara portal (scale del window slot)
- `data-manifest="preview-assets/journey-organic/manifest.json?v=3-hq1"`
- `data-scroll-length="500"` → altura de sección ≈ `500vh` (clamp JS 400–600)

### 5.3 Flujo real (coincidente con código)

```
Scroll down en la sección hero
  → scrollMetrics(): sectionScroll / usableScroll / progress
  → frameForScroll():
       fase 1 (< ~2.5vh): frames 0 → shadeOpen(72)  [ventana abre]
       fase 2: frames shadeOpen → last               [paisaje / continuación]
  → portalScaleForScroll() [lockScale]:
       pre-gate: push-in suave 1 → approachEnd
       post-gate: crece a portalFillScale() (= max(vw/apW, vh/apH)*1.03, floor 1.35)
  → portalWhiteForScroll(): white tras enterT≈0.55
  → portalChromeForScroll(): fade logo/nav/copy
  → sticky::after opacity = --aa-portal-white (#f0f0e5)
  → usuario llega a #shop (mismo cream)
```

Scroll up = **reverse** del mismo progreso (ver §9).

### 5.4 Funciones relevantes (lista no exhaustiva pero real)

`OrganicJourney`, `scrollMetrics`, `frameForScroll`, `portalFillScale`, `portalEnterProgress`, `portalScaleForScroll`, `portalWhiteForScroll`, `portalChromeForScroll`, `applyVisualScale`, `applyPortalWhite`, `applyPortalChrome`, `renderProgress`, `calculateTargetScale` (path **non-lockScale** / lab), `tick`, `onScroll`, `onResize`, `onOrientation`, `renderStatic`, `fallback`, `shadeScrollGate`.

### 5.5 `calculateTargetScale` / `visualScale` / `finalSwap`

| Símbolo | Estado actual |
|---------|----------------|
| `calculateTargetScale()` | Existe; usado cuando **no** hay `lockScale` |
| Homepage `lockScale` | Usa `portalFillScale` / `portalScaleForScroll` en su lugar |
| `--aa-visual-scale` | Forzado a `1` en lockScale; scale real en portal |
| `timeline.finalSwap` (manifest `0.9`) | Influye `--aa-final-opacity`; en lockScale se atenúa con `portalWhite * 0.35` |

### 5.6 Eventos / RAF

- `scroll` → coalesced `requestAnimationFrame(tick)` (un paint; no loop perpetuo)
- `IntersectionObserver` visibility
- `resize` / `orientationchange` (homepage ignora jitter de altura URL-bar vía `stableVh` + umbrales)

### 5.7 Reduced motion / slow connection

`staticMode = prefers-reduced-motion || slow connection` → `renderStatic()` (poster cerrado, scale 1, white 0).

---

## 6. PORTAL

### 6.1 Implementación actual

- **Elemento:** `.aa-figma-hero__window`
- **Control:** `journey-organic.js` (`applyVisualScale` branch `lockScale`)
- **Fill formula:** `max(viewW/apertureW, viewH/apertureH) * 1.03`, mínimo `1.35`
- **Clipping:** sticky `overflow:hidden` + hero `overflow-x:clip` — el slot puede crecer más allá del layout box sin scroll horizontal de página
- **Atributos runtime:** `data-portal-scale`, `--aa-portal-scale`

### 6.2 Relación ventana ↔ blanco

1. Portal crece hasta fill (Estados 3–4 en comentarios del código)
2. Luego whiteout (`--aa-portal-white`)
3. Chrome fade paralelo (`--aa-chrome-opacity`)

### 6.3 NO modificar

- Formula `portalFillScale`
- Curva `portalScaleForScroll`
- Origin basado en aperture
- El contrato “scale en slot, no en visual interno”

---

## 7. TRANSICIÓN A BLANCO

### 7.1 Elemento productor

Pseudo-elemento:

`.aa-figma-hero[data-journey-organic] .aa-figma-hero__sticky::after`

- `background: #f0f0e5`
- `opacity: var(--aa-portal-white, 0)`
- `z-index: 30`

### 7.2 Timing (JS)

`portalWhiteForScroll`:

- Requiere `lockScale`
- `enterProgress = portalEnterProgress(metrics)`
- White scroll: `ease(clamp((enterProgress - 0.55) / 0.45, 0, 1))`
- Frame hint: `frames.whiteoutStart` = **84** en manifest
- Preferencia por timing de scroll para no blanquear antes del fill

Easing local: smoothstep `t*t*(3-2*t)` en función `ease()`.

### 7.3 Estado final

White ≈ 1; chrome ≈ 0; siguiente sección `#shop` con `background:#F0F0E5`.

---

## 8. SHOP HANDOFF

| Aspecto | Realidad en código |
|---------|-------------------|
| Destino | `<section id="shop" … style="…background:#F0F0E5;">` |
| Continuidad visual | Mismo cream que el velo `#f0f0e5` |
| Navegación JS automática al terminar Journey | **NO ENCONTRADA** |
| CTA | `href="#shop"` (“SKIP TO SHOP”) |
| Archivo responsable del velo | `figma-hero.css` + setters en `journey-organic.js` |
| “Handoff” | Continuidad de color + scroll natural a `#shop` |

No hay router/Shopify redirect en este paso del hero.

---

## 9. REVERSE

No hay botón “reverse” dedicado.

**Trigger:** scroll hacia arriba sobre la sección hero.

**Lógica:** `sectionScroll = max(0, round(-root.getBoundingClientRect().top))` disminuye → `progress`, `frame`, `portal scale`, `white`, `chrome` se recalculan en `renderProgress`.

**Elementos que revierten:** frame canvas, `transform` del window slot, `--aa-portal-white`, `--aa-chrome-opacity`, `--aa-final-opacity`.

Comentario en código: al salir de visibility se hace un último paint para no dejar frame tardío al volver arriba.

---

## 10. HISTORIAL DE ANIMACIONES (COMMITS PEDIDOS)

### 10.1 `caadb6074d3ac2e517817b16ae316a294be207bd` — Add subtle hero video zoom

| Campo | Valor |
|-------|-------|
| Autor | Martin Morfe |
| Fecha | Mon Jun 29 12:46:35 2026 -0400 |
| Archivos | `Arrive Aruba - Homepage.dc.html` (+2/-2) |

**Qué hacía:** sobre el `<video>` hero (y fallback img) añadía `transform:scale(1.08); transform-origin:center;` y ajustaba `object-position` a `50% 35%`.

**Clasificación:** **D — histórica / NO es la implementación final.** Era zoom sobre **video** full-bleed, no Journey portal ni atmósfera CSS actual.

### 10.2 `b63e1d612b027694bb28da684190b11cee4db4ac` — Add cinematic hero reveal

| Campo | Valor |
|-------|-------|
| Autor | morfemartin |
| Fecha | Thu Jul 2 11:36:35 2026 -0400 |
| Archivos | Homepage HTML + mobile hero mp4 binario |

**Qué hacía:** curtain/reveal por **opacity/visibility** (transiciones ~0.7s), lógica JS `revealHeroCurtain` / timeouts, coordinación con mark video y hero video ready.

**Clasificación:** **D — histórica.** Reveal de video/mark; no portal Journey actual.

### 10.3 `dc87ee9f073e43e830dde074315f0a9667521d4c` — Add scroll flight hero animation

| Campo | Valor |
|-------|-------|
| Autor | Martin Morfe |
| Fecha | Sat Jun 27 11:58:37 2026 -0400 |
| Archivos | Homepage + `preview-assets/brand/variable-3.svg` |

**Qué hacía:** escena `data-flight-scene`, path SVG, avión; carga **GSAP 3.13.0** + ScrollTrigger + MotionPathPlugin desde jsDelivr; timeline scroll-driven; blur/scale del mark.

**Clasificación:** **D — NO utilizar / NO recuperar.** GSAP externo + flight overlay; incompatible con reglas actuales del hero Journey/nubes CSS-only.

---

## 11. BÚSQUEDA HISTÓRICA

### 11.1 Historial de archivos clave (tips observados)

**`journey-organic.js`:** aparece en tip con `ed17531` (lock portal baseline). Commits Journey más antiguos existen en historial del repo (prototipos `ba38c26`, `03bad1f`, `39ed5f7`, etc.) — muchos son prototipos pre-homepage-lock.

**`figma-hero.css`:** `3b3c66a` (creación baseline mobile/desktop shell) → `ed17531` (portal CSS) → `e097daa` (atmósfera nubes).

**`Arrive Aruba - Homepage.dc.html`:** larga historia de video hero → shell Figma → Journey → atmósfera.

### 11.2 Clasificación de implementaciones

| ID | Tipo | Notas |
|----|------|-------|
| A | **Actual** | Journey Organic lockScale + CSS cloud atmosphere `object-position` |
| B | Histórica video hero | mp4 full-bleed, zoom, reveal curtain |
| C | Experimento descartado | Atmósfera **video** (stashes + patch backup); rollback a `ed17531` luego atmósfera CSS |
| D | No recuperar | GSAP flight (`dc87ee9…`), Ken Burns scale como sustituto de nubes, video como cielo vivo |

---

## 12. ATMÓSFERA DE NUBES (DETALLE)

### 12.1 Archivos

- Markup: `Arrive Aruba - Homepage.dc.html` (bloque `.aa-cloud-atmosphere`)
- CSS: `figma-hero.css`
- Commit de publicación visual: `e097daa158d44d73ba09ebff813b68f8a79521fc`

### 12.2 Imagen fuente (única aprobada, reutilizada)

| Asset | Ruta |
|-------|------|
| Desktop plate | `preview-assets/figma-hero/atmosphere-desktop.png` |
| Mobile plate | `preview-assets/figma-hero/atmosphere-mobile.png` |

Misma plate repetida en capas base/distant/mist/warm (no hay assets nuevos de nube).

### 12.3 Capas

| Clase | z | Base opacity / filter | Rol |
|-------|---|------------------------|-----|
| `__base` | 0 | (filtro del bg general) | Masa principal |
| `__distant` | 1 | opacity 0.34; blur(4.5px)… | Plano lejano (dirección opuesta en keyframes) |
| `__mist` | 2 | opacity 0.28; blur(1.5px); mask inferior | Bruma baja |
| `__warm` | 3 | opacity 0.18; soft-light; mask radial derecha | Luz cálida sutil |

### 12.4 Técnica

**`object-position` pan** con `animation-timing-function: linear`, keyframes multi-waypoint, `animation-delay` negativos (fase).  
**No** Ken Burns por `scale` como motor de movimiento.  
Desktop overscan: plate `inset:-8%; width/height:116%`.  
Mobile overscan atmósfera: left/top/width/height ampliados (+14% / 110%).

---

## 13. FILOSOFÍA VISUAL DE LAS NUBES

**Buscado:** cielo vivo, atmósfera, fluidez orgánica, profundidad, movimiento evidente pero agradable, loop imperceptible, continuidad.

**No buscado / prohibido para este efecto:** video, GIF, slideshow, secuencia de frames de cielo, Ken Burns evidente, zoom mecánico, GSAP, WebGL, JS de nubes, mouse/touch driving, acoplar nubes al scroll Journey.

Intención para futuros agentes: **no cambiar la intención visual** aunque se “pueda” con otra técnica.

---

## 14. EVOLUCIÓN DEL EFECTO DE NUBES

1. **Baseline estático** (`3b3c66a`): plates fijas aprobadas.
2. **Portal Journey** (`ed17531`): ventana viva; cielo aún estático.
3. **Experimento video atmósfera** (stashes / patch): descartado / rollback.
4. **CSS multi-capa** con movimiento (iteraciones en working tree → commit `e097daa`).
5. Problema: Ken Burns / ease-in-out ping-pong se sentía mecánico.
6. **Fix de fluidez:** `linear` + waypoints + delays de fase (valores actuales en CSS).
7. **Estado final aprobado** publicado en `e097daa` + tip `37457b5` (docs).

---

## 15. IMPLEMENTACIÓN FINAL DE NUBES (VALORES REALES DEL CSS)

Animaciones solo bajo `@media (prefers-reduced-motion: no-preference)`.

### Base (`.aa-cloud-atmosphere__base .aa-figma-hero__bg`)

- Duration: **38s** `linear` infinite  
- Delay: **-6s**  
- Keyframes `aa-cloud-base-pan` object-position:

| % | position |
|---|----------|
| 0% | 50% 46% |
| 14% | 47.2% 48.2% |
| 30% | 42.4% 51.8% |
| 44% | 39.1% 54.6% |
| 50% | 38% 56% |
| 56% | 39.2% 54.8% |
| 70% | 43.6% 51.2% |
| 86% | 47.8% 47.8% |
| 100% | 50% 46% |

### Distant / far

- Img pan: **54s** linear, delay **-19s**, `aa-cloud-far-pan` (56% 49% ↔ 70% 41%, opuesta a base)
- Layer veil: **54s** linear, delay **-19s**, opacity 0.28 → 0.4 → 0.28

### Mist / near

- Img pan: **32s** linear, delay **-11s**, `aa-cloud-near-pan` (46% 58% ↔ 62% 64%)
- Veil: opacity 0.22 → 0.32 → 0.22

### Warm

- Layer breathe: **44s** linear, delay **-23s**, opacity 0.15 → 0.24 → 0.15
- Img pan: **44s** linear, delay **-23s**, 70% 40% ↔ 80% 47%

`will-change: object-position, opacity` en `.aa-cloud-atmosphere .aa-figma-hero__bg`.

---

## 16. RESPONSIVE

Breakpoint principal atmósfera/layout mobile: `@media (max-width: 760px)`.

| Viewport pedido | Comportamiento verificado en CSS |
|-----------------|----------------------------------|
| 1440×900 | Desktop composition `--aa-comp-h:900px`; bg desktop visible; overscan 116% |
| 1280×800 | Mismas reglas desktop (`min-width` no cambia layout mobile); sticky puede usar 100svh si altura ≥901 (este viewport no) |
| 390×844 | Mobile rules; `--aa-comp-h:812px`; bg mobile; window top 34%; atmósfera overscan mobile |
| 375×667 | Idem mobile; height sticky/comp 812 con ajustes `min-height`/`svh` en media anidada |
| 320×568 | Idem mobile; window width limitada por vw/svh caps |

**Diferencias clave desktop vs mobile**

- Imagen: `atmosphere-desktop.png` vs `atmosphere-mobile.png`
- Crop mobile: left/width Figma `-180/375` + overscan atmósfera
- `object-position` estático base mobile (fuera anim): `50% 38%` en `.aa-figma-hero__bg--mobile`; la animación de atmósfera sobrescribe vía keyframes mientras corre
- Window geometry distinta (ver §4)

Performance: mismas animaciones CSS; filtros blur en distant/mist/warm (costo GPU/CPU posible en móviles low-end — no medido cuantitativamente aquí: **NO VERIFICADO** números de FPS).

---

## 17. PERFORMANCE

| Tema | Hecho |
|------|-------|
| Props animadas (nubes) | `object-position`, `opacity` (veils) |
| Props NO usadas como motor de nube | `scale` Ken Burns, scroll-linked JS |
| Compositing hints | `will-change: object-position, opacity` (nubes); `will-change: transform` en window durante scale |
| Journey paint | RAF one-shot por scroll (no loop continuo) |
| Filtros | blur/contrast/saturate en capas distant/mist/warm |
| Reduced motion | ver §18 |

---

## 18. ACCESSIBILITY — `prefers-reduced-motion`

En `figma-hero.css` (`reduce`):

- Animaciones de `.aa-cloud-atmosphere*` y `.aa-figma-hero__bg` → `animation: none !important`
- Capas distant/mist/warm → `display: none !important`
- Base plate permanece visible
- Journey: `journey-organic.js` entra en `staticMode` y muestra poster cerrado (no scrub)

No oculta el hero ni altera la geometría de ventana por reduced-motion más allá de lo anterior.

---

## 19. ASSETS

### Aprobados / en uso hero actual

| Asset | Ruta | Función |
|-------|------|---------|
| atmosphere-desktop.png | `preview-assets/figma-hero/` | Cielo desktop (todas las capas) |
| atmosphere-mobile.png | `preview-assets/figma-hero/` | Cielo mobile |
| logo-desktop/mobile.png | `preview-assets/figma-hero/` | Logo |
| journey manifest + sheets/poster/final | `preview-assets/journey-organic/**` | Frames portal |
| Fonts Port Blair / ITC Legacy | `preview-assets/fonts/` / `@font-face` | Tipografía hero |

### Históricos / no son el cielo actual

| Asset | Nota |
|-------|------|
| `preview-assets/media/arrive-aruba-hero-sound.mp4` y variantes mobile | Hero video histórico |
| `preview-assets/figma-hero/window-*.png` | Presentes desde baseline mobile; **ventana actual** usa canvas Journey, no estos PNG como motor visual del portal |

### No agregar para atmósfera

Video/GIF/WebM nuevos, secuencias de cielo, assets generados, PNG adicionales de nube.

---

## 20. ARCHIVOS IMPORTANTES

| Archivo | Función | Estado | ¿Modificar? |
|---------|---------|--------|-------------|
| `Arrive Aruba - Homepage.dc.html` | Markup hero/shop | Aprobado | Solo con tarea explícita |
| `figma-hero.css` | Layout + atmósfera + veil | Aprobado | Atmósfera solo si se pide; ventana/portal CSS NO |
| `journey-organic.js` | Runtime portal | Baseline locked | **NO** salvo tarea Journey explícita |
| `journey-organic.css` | Estilos Journey | Baseline | **NO** casual |
| `preview-assets/journey-organic/**` | Frames | Locked | **NO** |
| `preview-assets/figma-hero/atmosphere-*.png` | Cielo | Aprobado | **NO** reemplazar |
| `README.md` | Incluye LIVE PREVIEW | Publicado | Docs OK |
| `MOBILE-HERO-BASELINE.md` | Checkpoint pre-motion | Histórico útil | No borrar |
| `PROJECT_HANDOFF.md` | Handoff web general antiguo | Parcialmente desactualizado vs tip actual | No confundir con este HANDOFF |
| `_references/` | Validaciones locales | Untracked | No publicar como producto |
| Stashes / `.patch` backup | Experimento video | Descartado | **NO aplicar** |

---

## 21. DO NOT TOUCH

**NO TOCAR sin mandato explícito y acotado:**

- Journey (`journey-organic.js`, CSS Journey, manifest, sheets)
- Ventana (geometría, slot, overflow, sticky clip)
- Portal (scale curve, fill formula, transform-origin aperture)
- Frames / Frame 0 / shadeOpen / whiteoutStart
- Scroll length / reverse behavior
- White veil / cream handoff / `#shop` continuity
- Runtime eventos / RAF / stableVh
- Assets de Journey y plates de atmósfera aprobadas

**NO:**

- Restaurar commits históricos automáticamente  
- Aplicar stashes `cloud-atmosphere-*`  
- Reconstruir Journey  
- Sustituir implementación actual por GSAP flight / video zoom / cinematic curtain  
- Introducir GSAP / video / GIF / Canvas nuevo / WebGL para nubes  
- Introducir JavaScript para animar nubes  
- Cambiar la ventana para resolver problemas de atmósfera  

---

## 22. GIT / WORKFLOW

### Commits finales de esta fase

1. `ed17531cd392fa6377f459fc0bb733e1ae47e018` — portal baseline  
2. `e097daa158d44d73ba09ebff813b68f8a79521fc` — atmósfera aprobada  
3. `37457b5723d5fe1f888291f7e2ce50d56751018a` — docs preview URL  

### Cómo continuar

```bash
git status
git log --oneline --decorate -20
git show motion-portal-approved-baseline
git diff
# Trabajar en rama feature desde tip actual si se itera
# Nunca aplicar stashes de cloud video sin pedirlo
```

Antes de modificar: leer este HANDOFF; confirmar área de tarea; no tocar Journey/ventana si la tarea es solo atmósfera (o viceversa).

---

## 23. PUBLICACIÓN

| Campo | Valor verificado |
|------|------------------|
| Método | GitHub Pages vía branch `gh-pages` (+ sincronización `main`) |
| Infra documentada | `PROJECT_HANDOFF.md` + `README.md` |
| Tip publicado | `37457b5723d5fe1f888291f7e2ce50d56751018a` |
| Branches publicadas | `main`, `gh-pages`, `motion/next-idea` en `origin` y `upstream` (tips iguales en última inspección) |
| URL pública FINAL | https://morfemartin.github.io/Web_Arrive-Aruba/Arrive%20Aruba%20-%20Homepage.dc.html |
| README LIVE PREVIEW | Misma URL |
| Verificación HTTP (inspección) | `HTTP/1.1 200 OK`; CSS contenía `aa-cloud-base-pan` |
| Desktop / mobile sobre URL pública | Verificado en sesión de publicación previa (Playwright) — nubes animaban, ventana/Journey presentes |

**No depende de localhost** para el preview público.

---

## 24. VALIDACIÓN FINAL (CHECKLIST)

### Desktop

- [x] Hero  
- [x] Nubes (movimiento CSS)  
- [x] Ventana  
- [x] Journey  
- [x] Portal  
- [x] Blanco  
- [x] Shop handoff visual  

### Mobile

- [x] Hero  
- [x] Nubes  
- [x] Ventana  
- [x] Journey  
- [x] Portal  
- [x] Blanco  
- [x] Shop  

### Performance / calidad movimiento

- [x] Sin overflow horizontal (checks previos)  
- [x] Reduced motion previsto en CSS/JS  
- [x] Movimiento continuo linear multi-waypoint  
- [ ] Métricas FPS formales en dispositivos reales: **NO VERIFICADO** en esta inspección de handoff  

---

## 25. PROBLEMAS CONOCIDOS

- Working tree local puede tener `_references/` untracked (no afecta tip git).  
- Pointer local de branch `main` puede no coincidir con `origin/main` hasta hacer checkout/ff.  
- Stashes de experimento video siguen en el repo — riesgo si alguien los aplica sin querer.

Fuera de eso: **No se encontraron problemas conocidos bloqueantes en el tip publicado durante la inspección de este handoff.**

---

## 26. DECISIONES IMPORTANTES

| Decisión | Por qué | Alternativa descartada | Impacto |
|----------|---------|------------------------|---------|
| Scale del portal en `.aa-figma-hero__window` | Unifica marco+paisaje como portal físico | Escalar solo el canvas interno | Contrato lockScale |
| White via sticky `::after` cream | Handoff continuo a `#shop` | Crossfade independiente | Continuidad visual |
| `stableVh` en homepage | Evitar jitter por URL-bar mobile | Usar `innerHeight` vivo siempre | Estabilidad frames |
| Nubes = CSS `object-position` | Cielo vivo sin video/JS | Video MP4 / GSAP / Ken Burns scale | Atmósfera fuera de Journey |
| `linear` + waypoints | Loop/turnaround menos mecánico | `ease-in-out` 0/50/100 | Fluidez aprobada |
| Rollback video atmósfera | Dirección rechazada | Mantener video | Stashes conservados pero no activos |
| Publicar en `gh-pages` + `main` | Infra existente Pages | Solo tunnel temporal | URL estable github.io |

---

## 27. FINAL APPROVED STATE

**Terminado y aprobado:**

- Portal Journey homepage (baseline `ed17531` + tip actual)  
- Atmósfera CSS de nubes fluidas (`e097daa`)  
- Responsive desktop/mobile del shell  
- White → Shop cream  
- Preview público documentado  

**NO modificar** sin nueva aprobación explícita: ventana, Journey/portal, frames, scroll/reverse, plates de cielo, filosofía de movimiento CSS.

**Disponible para futuras iteraciones (fuera del lock visual):** otras secciones de la web, Shopify, app prototype, docs — siempre sin romper el hero aprobado.

---

## 28. INSTRUCCIONES PARA EL PRÓXIMO AGENTE

1. Leer `HANDOFF.md` (y/o `HANDOFF.txt`).  
2. Ejecutar `git status` y anotar HEAD.  
3. Revisar tag `motion-portal-approved-baseline` (`ed17531…`).  
4. Identificar archivos del área pedida.  
5. No modificar Journey si la tarea no lo requiere.  
6. No modificar la ventana para “arreglar” atmósfera.  
7. Trabajar solo el área solicitada.  
8. Verificar desktop (p.ej. 1440×900, 1280×800).  
9. Verificar mobile (p.ej. 390×844, 375×667, 320×568).  
10. Revisar `git diff` antes de commit.  
11. No aplicar stashes `cloud-atmosphere-*`.  
12. No introducir GSAP/video/GIF/WebGL/JS para nubes.  

---

*Fin de HANDOFF.md — generado desde inspección real del repositorio; no inventar datos adicionales.*
