# Window Scroll Experience — Plan de desarrollo

Rama: `feat/window-scroll-experience`
Fecha: 2026-08-07
Estado: planificacion (sin codigo aun)
Restriccion base: **debe ser ejecutable como seccion Shopify OS 2.0.** Ver seccion 10.

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
- **No hay navegacion a otra pagina en la version por defecto.** La transicion al blanco
  entrega directamente la seccion de productos en la misma pagina. Navegar de verdad rompe
  el efecto: el usuario ve un flash de carga justo en el climax.
  En Shopify esto se resuelve poniendo la seccion `journey` y una `featured-collection`
  consecutivas en `templates/index.json`. Si el negocio exige que productos sea
  `/collections/all` con URL propia, ver 10.5 — es posible pero es trabajo extra.

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
5. **Entrega final NO son frames sueltos: son sprite sheets.** Esto lo impone Shopify (ver 10.1).
   Los frames salen de Blender sueltos, y un script de build los empaqueta en hojas.
   - Formato: **WebP calidad ~72.** No AVIF: la compatibilidad de AVIF en assets/Files de
     Shopify no es confiable y el CDN de Shopify ya negocia formato por su cuenta.
   - Cada hoja **<= 4096 px por lado** por el limite de decodificacion de imagen en iOS Safari.
   - Presupuesto duro: **<= 2.5 MB mobile, <= 5 MB desktop, secuencia completa.**
   - Si no entra, se baja a 120 frames antes que subir compresion.

## 6. Trabajo de frontend

Un modulo autonomo, sin dependencias externas. **Un solo `journey.js` sirve a los dos
destinos** (sitio estatico y tema Shopify); lo unico que cambia es de donde salen las URLs
de las hojas y quien pinta el markup.

- `journey.js` — precarga, scroll listener, dibujo en canvas. Se configura leyendo
  `data-*` del contenedor, no con constantes hardcodeadas
- `journey.css` — sticky, capas, tipografia de los textos
- Punto de montaje: un solo `<div class="aa-journey" data-sheets='[...]' data-frames="180">`
  que en estatico escribe el HTML y en Shopify lo escribe Liquid

Tecnica:

- `<canvas>` + sprite sheets dibujadas con `drawImage(sheet, sx, sy, sw, sh, 0, 0, w, h)`.
- Scroll leido con `IntersectionObserver` + `requestAnimationFrame`. Nunca dibujar
  dentro del evento `scroll` directo.
- **Precarga progresiva por hoja:** se carga primero la hoja 1, la seccion ya es scrolleable
  con lo que haya, y el resto entra en orden. Evita el bloqueo de varios segundos antes de
  poder interactuar. Mientras una hoja no llego, se dibuja el ultimo frame disponible.
- **Ventana deslizante de memoria en mobile.** Cada hoja de 4096x2560 decodificada ocupa
  ~40 MB en RAM; seis a la vez revientan el presupuesto de Safari iOS y el sistema las
  purga en medio del scroll. Se mantienen como maximo 2-3 hojas vivas via
  `createImageBitmap` + `close()` sobre las que quedan fuera de rango.
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

**7.6 — Online Store speed score.** Shopify publica un score de velocidad en el Admin y el
merchant lo va a ver. Una seccion pesada en la home lo baja aunque cargue lazy. Hay que
medirlo antes y despues y dejar el numero por escrito, no descubrirlo despues del launch.

## 8. Fases

Con Shopify como destino obligatorio, Liquid deja de ser el ultimo paso y pasa a ser el
formato nativo desde la fase 2. El sitio estatico se vuelve el entorno de prueba, no el
producto final.

| Fase | Que se hace | Salida |
|---|---|---|
| 0 | Prototipo aislado en `journey.html`, sprite sheets generadas con ffmpeg del MP4 que ya existe | Se prueba en iPhone real antes de gastar un render |
| 1 | Render definitivo en Blender + script de empaquetado a sheets WebP | `tools/build-journey-sheets.sh` + assets |
| 2 | **`shopify/sections/journey.liquid`** con schema completo. Se desarrolla directo en un tema de desarrollo Shopify | Seccion instalable |
| 3 | Backport a la home estatica reusando el mismo `journey.js` | Paridad entre los dos destinos |
| 4 | QA: Lighthouse + speed score, iOS Safari, Android Chrome, reduced-motion, 3G lento, Theme Editor | Checklist verde |

La fase 0 es la que decide. Si en un iPhone de verdad no se siente bien, se corta ahi
y no se gasto un render.

## 9. Decision pendiente

Confirmar si productos queda en la misma pagina (recomendado, ver 4) o si debe ser
`/collections/all` con URL propia. Eso cambia la fase 2 y agrega el trabajo de 10.5.

## 10. Ejecucion en Shopify

Restricciones reales de la plataforma que cambian el diseno tecnico.

### 10.1 — La carpeta `assets/` del tema es plana y no quiere 180 archivos

No admite subcarpetas, y subir 180 frames por breakpoint (360 archivos) hace que cada push
del tema sea lento y que el codigo del tema quede inmanejable. **Por eso sprite sheets.**

Con frames mobile de 512x683 en hojas de 4096x2732 entran 8x4 = 32 frames por hoja.
180 frames = 6 hojas. De 360 archivos se pasa a 12 (6 mobile + 6 desktop).

### 10.2 — Las hojas van por Shopify Files, no por `assets/`

Se suben en Settings → Files y se seleccionan desde el Theme Editor con settings de tipo
`image_picker`. Ventajas sobre meterlas en `assets/`:

- Pasan por el CDN de imagenes de Shopify, que negocia formato y tamano solo
- No inflan el repositorio del tema ni cada `shopify theme push`
- Se pueden reemplazar sin tocar codigo

En Liquid las URLs se construyen con `image_url` y se inyectan como JSON en el `data-sheets`
del contenedor. Verificar en la implementacion el tope de dimension del CDN de Shopify
(del orden de 5760 px por lado) — nuestras hojas de 4096 quedan debajo, pero hay que
confirmarlo antes de fijar el tamano de hoja.

### 10.3 — Schema de la seccion

Lo que el merchant si puede tocar desde el Theme Editor:

- Las hojas mobile y desktop (`image_picker`), el poster de fallback
- Los textos de cada fase y el texto final sobre blanco
- Label y destino del CTA, y el label del "Skip to shop"
- Largo del scroll (`range`, 200-400vh, default 300)
- Numero de frames y grilla de la hoja, para que cambiar el render no exija tocar Liquid

Lo que **no** se expone: nada que permita romper el performance sin darse cuenta.

### 10.4 — Formato y carga del JS

`journey.js` y `journey.css` van como assets del tema y se cargan con `asset_url`, con
`defer`. El CSS se deja inline en la seccion siguiendo la convencion que ya usan las
cuatro secciones existentes del repo. El JS **no** se duplica inline: si la seccion se
inserta dos veces en una pagina, debe montar dos instancias sin recargar el script.

La seccion tiene que sobrevivir a que el Theme Editor la re-renderice sin recargar la
pagina. Eso significa escuchar `shopify:section:load` y `shopify:section:unload` para
montar y desmontar limpio, liberando las `ImageBitmap`. Si no, editar un texto en el
editor deja canvases huerfanos comiendo memoria.

### 10.5 — Si productos tiene que ser una URL propia

Ruta de dos capas, ambas necesarias porque el soporte de la primera no es universal:

1. **View Transitions cross-document**, activadas con `@view-transition { navigation: auto }`
   en el CSS del tema. Da la transicion nativa donde el navegador la soporta.
2. **Fallback universal:** al llegar al final de la seccion se deja el overlay blanco
   opaco, se marca una bandera en `sessionStorage` y se navega. El template de coleccion
   arranca con un overlay blanco que se desvanece si encuentra esa bandera. Funciona en
   todos lados y es poco codigo.

Trabajo extra estimado: la seccion `journey` mas un fragmento compartido de overlay que
hay que insertar tambien en `templates/collection.json`.

### 10.6 — Lo que NO cambia por Shopify

- Canvas + sprite sheets sigue siendo la tecnica correcta
- Sigue sin haber WebGL. `<model-viewer>` de Shopify es para 3D de producto, no aplica aqui
- Los fallbacks de la seccion 6 son identicos
- El riesgo 7.1 (regeneracion de los `.dc.html`) sigue vigente mientras exista el sitio
  estatico en paralelo
