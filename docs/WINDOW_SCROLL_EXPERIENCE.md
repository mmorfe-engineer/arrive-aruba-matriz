# Window Scroll Experience — Plan de desarrollo

Rama: `feat/window-scroll-experience`
Fecha: 2026-08-07
Estado: planificacion (sin codigo aun)

## 1. La idea

Al bajar en la home, una ventana de avion se abre progresivamente controlada por el scroll.
Afuera hay nubes. Adentro aparece Aruba. Al final la luz de la ventana crece hasta
llenar la pantalla de blanco, aparece un texto, y desde ese blanco se entra a productos.

## 2. Veredicto de viabilidad

**Viable. Pero no con el modelo 3D corriendo en el navegador.**

La recomendacion es **no** portar el `.blend` a WebGL/three.js, y en su lugar hacer
scroll-scrubbing de la animacion ya renderizada. Razones concretas de este proyecto:

1. **La animacion no necesita 3D.** Es una camara fija con una persiana que sube.
   No hay orbita, no hay interaccion libre, no hay configurador. El scroll solo
   controla una linea de tiempo. Eso es exactamente el caso de uso donde el 3D real
   no aporta nada y solo suma costo.
2. **La calidad de imagen bajaria.** El render de Blender ya tiene vidrio, bloom,
   luz de tarde y grano. Igualar eso en WebGL en tiempo real es semanas de trabajo
   y aun asi se ve peor.
3. **Peso.** glTF + HDRI + texturas realistas son 10-30 MB y exigen GPU.
   Una secuencia de imagenes bien comprimida vive en 2-4 MB y corre en cualquier telefono.
4. **El repo no tiene build step.** Las paginas `.dc.html` se exportan desde Claude Design
   y se regeneran. Meter un pipeline de three.js aqui es fragil (ver riesgo #7.1).
5. **iOS ya viene dando pelea.** Los ultimos seis commits del repo son endurecimiento de
   autoplay y carga del hero en iPhone. Sumar WebGL encima es multiplicar esa superficie.

Es la misma tecnica que usan Apple (AirPods Pro), Igloo y la mayoria de los sitios que la
gente cree que son "3D en la web": no lo son. Son frames renderizados en offline y
dibujados en un `<canvas>` segun la posicion del scroll.

## 3. Que material ya existe

| Recurso | Ubicacion | Nota |
|---|---|---|
| Render de la ventana | `preview-assets/media/arrive-aruba-hero-sound.mp4` | 1920x1080, 24 fps, 19.2 s. Ya en el repo, hoy es el hero |
| Version mobile | `preview-assets/media/arrive-aruba-hero-mobile.mp4` | Ya optimizada |
| Poster | `preview-assets/media/arrive-aruba-hero-poster.jpg` | Sirve de fallback |
| Secuencia PNG del logo | `~/Documents/ARRIVE ARUBA/VIDEO/ARRIVE ARUBA SEQUENCE/` | 212 frames 1920x1080. Es el logo, no la ventana |
| Master con audio | `~/Documents/ARRIVE ARUBA/VIDEO/MP4/ARRIVE ARUBA AUDIO.mp4` | 22 MB |

Es decir: **el prototipo se puede hacer hoy mismo sin volver a Blender**, extrayendo frames
del MP4 que ya esta en el repo. Blender solo hace falta para la version final (ver 5).

Lo que el render actual **no** tiene y hay que agregar:
- No termina en blanco puro. Hoy cierra con la ventana abierta sobre mar turquesa.
- No hay capa de nubes separada.
- No hay version en vertical real; el mobile de hoy es un recorte del 16:9.

## 4. Arquitectura de la experiencia

Bloque nuevo entre el hero y productos. Nunca antes del hero.

```
[01 Hero]                     <- se queda como esta
[02 Journey]  <- NUEVO, ~300vh de scroll, contenido sticky a 100vh
[03 Productos]                <- se revela desde el blanco
```

Mapa de progreso `p` de 0 a 1 dentro de la seccion:

| p | Que pasa | Capa |
|---|---|---|
| 0.00 - 0.12 | Ventana cerrada, cabina oscura. Nubes pasando lento | canvas + capa nubes |
| 0.12 - 0.55 | La persiana sube. Aruba entra en cuadro | canvas |
| 0.30 | Entra texto 1: *"Nine degrees north."* | HTML sobre canvas |
| 0.55 - 0.82 | Push-in: la ventana crece y ocupa el cuadro | `transform: scale()` sobre canvas |
| 0.70 | Entra texto 2: *"You already know how it felt."* | HTML |
| 0.82 - 1.00 | La luz de la ventana desborda y llena de blanco | overlay blanco |
| 1.00 | Cierre: *"Take home what you felt."* sobre blanco, luego productos | HTML |

Puntos de diseno que importan:

- **Las nubes van en capa CSS aparte, no en el render.** Asi se mueven a otra velocidad
  que la ventana (parallax) y se pueden apagar en mobile sin retocar el video.
- **El blanco final es un overlay CSS, no frames.** Ahorra el 30% de la secuencia y da
  control fino del timing.
- **No hay navegacion a otra pagina.** La transicion al blanco entrega directamente la
  seccion de productos en la misma pagina. Navegar de verdad rompe el efecto: el usuario
  ve un flash de carga justo en el clímax. Si mas adelante productos tiene que ser una URL
  propia (Shopify), se resuelve con View Transitions API y el blanco como estado compartido.

## 5. Assets que hay que producir en Blender

1. **Re-render de la toma completa** con camara fija, sin corte, 180 frames.
   180 es el punto dulce: por debajo de 120 se ve a saltos al scrollear despacio,
   por encima de 240 solo pesa mas.
2. **Extender el final** hasta blanco puro (unos 20 frames extra de sobreexposicion),
   aunque el blanco final se refuerce por CSS.
3. **Dos encuadres, no un recorte:**
   - Desktop: 1600x900
   - Mobile: 1080x1440 (4:5) o 1080x1620. Recortar el 16:9 a vertical mata el encuadre de la ventana.
4. **Pass de nubes con alpha** (opcional). Si sale caro, se fake con CSS/SVG y nadie lo nota.
5. **Export a AVIF calidad ~60, con fallback WebP ~70.**
   Presupuesto duro: **<= 2.5 MB mobile, <= 5 MB desktop, secuencia completa.**
   Si no entra, se baja a 120 frames antes que subir compresion.

## 6. Trabajo de frontend

Un modulo autonomo, sin dependencias externas:

- `journey.js` — precarga, scroll listener, dibujo en canvas
- `journey.css` — sticky, capas, tipografia de los textos
- Punto de montaje en la home: un solo `<div id="aa-journey">`

Tecnica:

- `<canvas>` + array de `Image` precargadas.
- Scroll leido con `IntersectionObserver` + `requestAnimationFrame`. Nunca dibujar
  dentro del evento `scroll` directo.
- **Precarga progresiva en dos pasadas:** primero 1 de cada 8 frames (la seccion ya es
  scrolleable, solo se ve a saltos), despues se rellenan los intermedios. Evita el
  bloqueo de 4 segundos antes de poder interactuar.
- **Nada de scroll-jacking.** Sticky + scroll nativo. Sin `preventDefault` en wheel/touch.
  Secuestrar el scroll es lo que hace que estas experiencias se sientan hostiles en mobile.

Fallbacks obligatorios:

| Condicion | Comportamiento |
|---|---|
| `prefers-reduced-motion` | Seccion colapsa a 100vh, frame estatico + textos. Sin scrub |
| `saveData` o `effectiveType` 2g/3g | Poster estatico + texto. No se descarga la secuencia |
| Sin JS | Poster estatico, scroll normal |
| Viewport < 380px | Se sirve la secuencia de 120 frames |

Reglas de rendimiento:

- La seccion **no puede ser el LCP**. Va debajo del hero y su carga arranca solo cuando
  esta a menos de 1 viewport de distancia.
- Sin sonido. El hero ya tiene su toggle; duplicarlo confunde.
- Link "Skip to shop" visible durante toda la seccion. Quien vino a comprar debe poder salir.

## 7. Riesgos

**7.1 — El riesgo real de este repo.**
Segun `PROJECT_HANDOFF.md`, los `.dc.html` se regeneran desde exports de Claude Design.
Si la experiencia vive inline en `Arrive Aruba - Homepage.dc.html`, el proximo export la borra.
Mitigacion: todo el codigo va en `journey.js` / `journey.css` como archivos propios, la home
solo aporta el div de montaje, y se agregan a la lista de archivos preservados del handoff
igual que `preview-assets/brand/variable-3.svg`.

**7.2 — Peso en 4G.** 3 MB en una conexion movil real son entre 4 y 8 segundos.
Por eso el gate de `saveData` y la precarga progresiva no son opcionales.

**7.3 — Largo del scroll.** 300vh es el techo. Mas que eso el usuario siente que la pagina
no avanza y hace scroll rapido hasta el final, que es peor que no tener la animacion.

**7.4 — Canibalizar la conversion.** Va despues del hero, no antes. Como puerta a productos,
no como peaje de entrada.

**7.5 — Scrubbing de video en iOS.** Existe la tentacion de hacerlo mas simple moviendo
`video.currentTime`. En iOS Safari eso da saltos y frames congelados. Por eso canvas.

## 8. Fases

| Fase | Que se hace | Salida |
|---|---|---|
| 0 | Prototipo aislado en `journey.html`, frames extraidos con ffmpeg del MP4 que ya existe | Se prueba en iPhone real antes de tocar la home |
| 1 | Render definitivo en Blender (final en blanco, encuadre vertical, 180 frames) | Assets en `preview-assets/journey/` |
| 2 | Integracion en la homepage + transicion a productos | Home funcionando |
| 3 | QA: Lighthouse, iOS Safari, Android Chrome, reduced-motion, 3G lento | Checklist verde |
| 4 | Empaquetado como seccion Liquid para la migracion Shopify | `shopify/sections/journey.liquid` |

La fase 0 es la que decide. Si en un iPhone de verdad no se siente bien, se corta ahi
y no se gasto un render.

## 9. Decision pendiente

Confirmar si productos queda en la misma pagina (recomendado) o si debe ser una URL propia
desde el arranque por SEO / Shopify. Eso cambia la fase 2.
