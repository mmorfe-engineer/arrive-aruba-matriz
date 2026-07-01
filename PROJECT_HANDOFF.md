# Arrive Aruba Web - Handoff del Proyecto

Ultima actualizacion documentada: 2026-07-01

Este documento sirve para continuar el proyecto en otra sesion de Codex, Claude Design o con otro desarrollador.

## Resumen

Arrive Aruba es una web/app premium para resortwear, pensada primero para movil y preparada para evolucionar hacia Shopify. El proyecto actual contiene una experiencia estatica navegable, una version app/mobile, paginas de coleccion y producto, carrito/guardados en frontend, assets de marca y una primera carpeta `shopify/` con secciones Liquid y templates.

## Repositorio y URLs

- GitHub: `git@github.com:morfemartin/Web_Arrive-Aruba.git`
- GitHub web: `https://github.com/morfemartin/Web_Arrive-Aruba`
- GitHub Pages: `https://morfemartin.github.io/Web_Arrive-Aruba/`
- Branch fuente: `main`
- Branch publicado: `gh-pages`

Ultimos commits relevantes:

- `main`: `0adcf3f Update site from Claude Design export`
- `gh-pages`: `783a418 Update site from Claude Design export`

## Ubicaciones Locales Importantes

Rutas usadas durante esta fase:

- Workspace original de Codex: `/Users/martinmorfe/.codex/worktrees/ee15/Arrive Aruba Web`
- Worktree limpio usado para `main`: `/tmp/arrive-aruba-publish-latest`
- Worktree limpio usado para `gh-pages`: `/tmp/arrive-aruba-pages-latest`
- ZIP fuente de Claude: `/Users/martinmorfe/Downloads/Arrive Aruba Premium Web (1).zip`
- Carpeta de marca: `/Users/martinmorfe/Documents/ARRIVE ARUBA/`

Nota: las rutas `/tmp/...` pueden desaparecer al reiniciar. Para una nueva sesion, lo mas seguro es clonar de GitHub.

```bash
git clone git@github.com:morfemartin/Web_Arrive-Aruba.git
cd Web_Arrive-Aruba
git checkout main
```

## Estructura Actual

Archivos principales:

- `index.html`: launcher que abre app en movil y web en desktop.
- `Arrive Aruba - Homepage.dc.html`: homepage editorial.
- `Arrive Aruba - App.dc.html`: prototipo app/mobile.
- `Arrive Aruba - Collection.dc.html`: coleccion mobile/shop.
- `Arrive Aruba - Product.dc.html`: producto/PDP.
- `cart-store.js`: almacenamiento local para carrito.
- `support.js`: runtime de las paginas `.dc.html`.
- `preview-assets/`: assets optimizados usados por la web.
- `assets/`: logos/fuentes del paquete de Claude.
- `shopify/`: secciones y templates Liquid para migracion Shopify.
- `uploads/`: referencias, PDFs y capturas usadas como contexto.

Assets clave:

- Video hero: `preview-assets/media/arrive-aruba-hero-sound.mp4`
- A del logo usada como mascara: `preview-assets/brand/variable-3.svg`
- Logo azul: `preview-assets/brand/logo-blue.webp`
- Logo blanco: `preview-assets/brand/logo-negative.webp`

Importante: el ZIP de Claude no traia `preview-assets/brand/variable-3.svg`, pero la homepage lo sigue usando para la A del hero. Si se reemplaza el proyecto desde un ZIP nuevo, preservar este archivo salvo que Claude ya lo incluya.

## Practicas de GitHub que Venimos Usando

1. No subir ZIPs comprimidos como entrega final.
   - El repo debe quedar ejecutable y ordenado con archivos reales.

2. Mantener dos ramas sincronizadas.
   - `main`: fuente del proyecto.
   - `gh-pages`: version publicada por GitHub Pages.

3. Publicar cambios en ambas ramas.
   - Primero validar y commitear en `main`.
   - Luego aplicar el mismo contenido/commit en `gh-pages`.

4. Preservar archivos tecnicos al reemplazar desde ZIP.
   - `.git`
   - `.gitignore`
   - `.nojekyll`
   - Cualquier asset referenciado que el ZIP no traiga, especialmente `variable-3.svg`.

5. Validar antes de empujar.
   - Revisar referencias rotas en HTML.
   - Servir localmente con `python3 -m http.server`.
   - Verificar rutas principales con `curl`.

6. Verificar despues de empujar.
   - Revisar que GitHub Pages haya terminado:

```bash
gh run list --repo morfemartin/Web_Arrive-Aruba --limit 5
gh api repos/morfemartin/Web_Arrive-Aruba/pages --jq '.status'
```

   - Verificar archivos publicos:

```bash
curl -I "https://morfemartin.github.io/Web_Arrive-Aruba/Arrive%20Aruba%20-%20Homepage.dc.html"
curl -I "https://morfemartin.github.io/Web_Arrive-Aruba/Arrive%20Aruba%20-%20Collection.dc.html"
curl -I "https://morfemartin.github.io/Web_Arrive-Aruba/Arrive%20Aruba%20-%20Product.dc.html"
curl -I "https://morfemartin.github.io/Web_Arrive-Aruba/cart-store.js"
curl -I "https://morfemartin.github.io/Web_Arrive-Aruba/preview-assets/media/arrive-aruba-hero-sound.mp4"
```

7. Si Pages da 404 despues del push, revisar primero si esta construyendo.
   - Puede tardar varios minutos.
   - Si `gh-pages` contiene los archivos pero la web da 404, normalmente Pages esta en `building`.

## Flujo Recomendado para Actualizar desde un ZIP de Claude

```bash
rm -rf /tmp/arrive-claude-latest
mkdir -p /tmp/arrive-claude-latest
unzip -q "/Users/martinmorfe/Downloads/Arrive Aruba Premium Web (1).zip" -d /tmp/arrive-claude-latest
```

Crear worktrees limpios desde el repo local o desde un clone:

```bash
git fetch origin main gh-pages
git worktree add -B codex/publish-claude-latest /tmp/arrive-aruba-publish-latest origin/main
git worktree add -B codex/publish-claude-pages /tmp/arrive-aruba-pages-latest origin/gh-pages
```

Reemplazar contenido preservando Git y archivos tecnicos:

```bash
rsync -a --delete \
  --exclude='.git' \
  --exclude='.gitignore' \
  --exclude='.nojekyll' \
  /tmp/arrive-claude-latest/ \
  /tmp/arrive-aruba-publish-latest/
```

Si el ZIP no trae `variable-3.svg`, recuperarlo:

```bash
cd /tmp/arrive-aruba-publish-latest
git checkout HEAD -- preview-assets/brand/variable-3.svg
```

Validar local:

```bash
cd /tmp/arrive-aruba-publish-latest
python3 -m http.server 4202
```

En otra terminal:

```bash
curl -I "http://localhost:4202/"
curl -I "http://localhost:4202/Arrive%20Aruba%20-%20Homepage.dc.html"
curl -I "http://localhost:4202/Arrive%20Aruba%20-%20Collection.dc.html"
curl -I "http://localhost:4202/Arrive%20Aruba%20-%20Product.dc.html"
curl -I "http://localhost:4202/preview-assets/media/arrive-aruba-hero-sound.mp4"
```

Commit y push:

```bash
git add -A
git commit -m "Update site from Claude Design export"
git push origin HEAD:main
```

Repetir el mismo reemplazo/commit/push en `/tmp/arrive-aruba-pages-latest` hacia `gh-pages`.

## Consideraciones Shopify

El proyecto todavia es un prototipo estatico, pero ya trae base para Shopify:

- `shopify/sections/collection-hero.liquid`
- `shopify/sections/collection-grid.liquid`
- `shopify/sections/product-main.liquid`
- `shopify/sections/product-related.liquid`
- `shopify/templates/collection.json`
- `shopify/templates/product.json`

Principios que se definieron:

- Imagenes siempre dentro de marcos/contenedores estables.
- El layout manda; la imagen se reemplaza sin romper proporciones.
- Evitar depender de medidas especificas de una sola imagen.
- Preparar textos, productos e imagenes para ser editables sin codigo en Shopify.
- Wishlist/guardados prototipo con `localStorage`; en Shopify puede migrarse a customer metafields, product IDs o una app de wishlist.
- Carrito prototipo con `cart-store.js`; en Shopify debe conectarse al cart real.

## Decisiones Importantes Tomadas

- El video original `.mov` se convirtio a MP4 optimizado:
  - `preview-assets/media/arrive-aruba-hero-sound.mp4`
  - Esto es mejor para web, Pages y Shopify.

- El sonido del video no inicia activo.
  - Los navegadores moviles suelen bloquear autoplay con sonido.
  - La mejor practica es autoplay muted + boton para activar sonido.

- La barra inferior mobile fue retirada.
  - En iPhone competia con la UI del navegador.
  - Se priorizo navegacion superior y CTAs visibles.

- La homepage usa video hero y A de marca.
  - No eliminar `variable-3.svg` mientras el HTML lo referencie.

- Las paginas de producto antiguas especificas fueron reemplazadas.
  - Eliminadas:
    - `product-performance-pique-polo.html`
    - `product-smooth-performance-tee.html`
    - `product-star-sapphire-hoodie.html`
  - Reemplazo:
    - `Arrive Aruba - Product.dc.html?id=p1`
    - `Arrive Aruba - Product.dc.html?id=p2`
    - `Arrive Aruba - Product.dc.html?id=p3`

## Prompt Corto para Nueva Sesion

Pega esto en una nueva conversacion:

> Estoy continuando el proyecto Arrive Aruba Web. El repo es `git@github.com:morfemartin/Web_Arrive-Aruba.git`, Pages esta en `https://morfemartin.github.io/Web_Arrive-Aruba/`. Trabajamos con `main` como fuente y `gh-pages` como publicado. La ultima version viene del ZIP de Claude `Arrive Aruba Premium Web (1).zip` y el ultimo commit publicado es `783a418 Update site from Claude Design export`. Antes de hacer cambios, revisa `PROJECT_HANDOFF.md`, valida localmente con `python3 -m http.server`, conserva `.nojekyll` y `preview-assets/brand/variable-3.svg`, y al terminar sube automaticamente a `main` y `gh-pages`, verificando GitHub Pages con `gh run list` y `curl`.

## Checklist Antes de Cerrar una Fase

- [ ] `git status` limpio en el worktree usado.
- [ ] HTML principal carga localmente.
- [ ] `Collection`, `Product`, `cart-store.js` y video responden 200.
- [ ] `main` actualizado.
- [ ] `gh-pages` actualizado.
- [ ] Pages build terminado en `success`.
- [ ] URL publica verificada con cache evitada.

