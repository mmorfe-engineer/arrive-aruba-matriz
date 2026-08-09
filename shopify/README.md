# Arrive Aruba — Shopify Theme Files

Estas son las secciones Shopify OS 2.0 para el tema Arrive Aruba.

## Estructura

```
shopify/
├── templates/
│   ├── collection.json       ← Template de colección
│   └── product.json          ← Template de producto
└── sections/
    ├── collection-hero.liquid     ← Hero de colección (título + filtros)
    ├── collection-grid.liquid     ← Grid de productos con paginación
    ├── product-main.liquid        ← PDP completo (galería + variantes + ATC)
    ├── product-related.liquid     ← Productos relacionados
    └── journey-organic.liquid     ← Journey Organic v3 dirigido por scroll
```

## Cómo instalar en Shopify

### 1. Copiar archivos al tema

En Shopify Admin → Online Store → Themes → Actions → Edit code:

1. Sube cada archivo `.liquid` de `shopify/sections/` a la carpeta **Sections** del tema
2. Sube cada `.json` de `shopify/templates/` a la carpeta **Templates**

Para Journey Organic sube también `journey-organic.css` y `journey-organic.js` a **Assets**.

### 2. Fuentes (agregar a `layout/theme.liquid`)

```html
<!-- En el <head> del tema -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Geologica:wght@300;400;500;600&display=swap" rel="stylesheet">
```

Para ITC Legacy Serif, súbela como archivo de fuente en **Assets** y declárala en `assets/base.css`:

```css
@font-face {
  font-family: 'ITC Legacy Serif Std';
  src: url('ITCLegacySerifStd-Medium.otf') format('opentype');
  font-weight: 500;
  font-display: swap;
}
```

### 3. Configurar en Theme Editor

Una vez instaladas las secciones, el merchant puede:

- **Collection hero**: cambiar eyebrow, título, descripción, colores, padding
- **Collection grid**: cambiar columnas (desktop/mobile), ratio de imagen, gap, productos por página, radio de tarjeta
- **Product main**: cambiar ratio de imagen, label del botón, badge de entrega, bloques de acordeón
- **Related products**: cambiar eyebrow, título, cantidad y colección de fallback
- **Journey Organic**: seleccionar logo, posters, stills finales y cada sprite sheet en el orden del manifiesto generado

### Journey Organic v3

1. Abre `preview-assets/journey-organic/manifest.json`.
2. Carga el poster y still final de cada variante en sus campos correspondientes.
3. Agrega un bloque **Sprite sheet** por entrada de `variants.desktop.clip.sheets` y `variants.mobile.clip.sheets`.
4. Copia `frameOffset`, `frameCount`, `columns` y `rows` de cada entrada al bloque.
5. Copia las dimensiones de `cell` a los ajustes de desktop y móvil.

La sección soporta varias instancias, `shopify:section:load`, `shopify:section:unload` y libera imágenes y observadores al desmontarse. Los colores principales son fijos para preservar el branding.

### 4. Palette de colores (variables globales sugeridas)

Agrega en `config/settings_schema.json` (sección Colors):

| Nombre | Valor | Uso |
|--------|-------|-----|
| Star Sapphire | `#386395` | Primary brand, botones, CTAs |
| Silver Lake Blue | `#5F8BB8` | Acentos, links, labels |
| Cannoli Cream | `#F0F0E5` | Fondo principal |
| Mock Orange | `#F5A169` | Acento cálido (badges sale) |
| Fair Green | `#92AF88` | Acento natural (delivery icon) |

### 5. Requisitos de variantes en Shopify

Para que los swatches de color funcionen:
- Nombra la opción exactamente `Color` (con mayúscula)
- El valor del color debe coincidir con un nombre CSS o hex válido, ej: `Star Sapphire` → CSS no reconoce este, así que usa `#386395` como `metafield` de swatch separado, o un nombre CSS válido

Para la función `recommendations`:
- Activa **Product Recommendations** en Shopify Admin → Online Store → Themes → Theme Settings
- O usa la [API de recomendaciones](https://shopify.dev/docs/api/ajax/reference/product-recommendations)

---

## Notas de performance

- Las imágenes usan `image_url` + `image_tag` con `widths` y `sizes` → Shopify sirve el tamaño correcto automáticamente
- `loading: 'lazy'` en imágenes secundarias, `loading: 'eager'` solo en la imagen principal del PDP
- El CSS está inline en cada sección para evitar render-blocking
- El JS es mínimo, vanilla, sin dependencias externas

---

*Arrive Aruba Premium Web · 2026*
