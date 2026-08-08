# Arrive Aruba — Shopify Theme Files

Estas son las secciones Shopify OS 2.0 para el tema Arrive Aruba.

## Estructura

```
shopify/
├──── templates/
│   ├──── collection.json       → Template de colección
│   └──── product.json          → Template de producto
└──── sections/
    ├──── collection-hero.liquid         → Hero de colección (título + filtros)
    ├──── collection-grid.liquid         → Grid de productos con paginación
    ├──── featured-products-staggered.liquid → Productos destacados escalonados
    ├──── product-main.liquid            → PDP completo (galería + variantes + ATC)
    ├──── product-related.liquid         → Productos relacionados
    └──── site-footer.liquid             → Footer mejorado del sitio
```

## Cómo instalar en Shopify

### 1. Copiar archivos al tema

En Shopify Admin → Online Store → Themes → Actions → Edit code:

1. Sube cada archivo `.liquid` de `shopify/sections/` a la carpeta **Sections** del tema
2. Sube cada `.json` de `shopify/templates/` a la carpeta **Templates**

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
- **Featured Products Staggered**: productos destacados con diseño escalonado, ideal para homepage
- **Product main**: cambiar ratio de imagen, label del botón, badge de entrega, bloques de acordeón
- **Related products**: cambiar eyebrow, título, cantidad y colección de fallback
- **Site Footer**: configurar logo, enlaces de Shop/Help, redes sociales, copyright y newsletter

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

## Cambios Recientes

### Diseño Escalonado (Staggered Layout)
La sección **Featured Products Staggered** implementa el diseño escalonado original de la homepage:
- Grid de 2 columnas en desktop
- Cada 2do producto tiene un `margin-top: 36px` para crear el efecto escalonado
- En mobile se muestra en 1 columna sin escalonamiento
- Ideal para la primera sección de productos en la homepage

### Footer Mejorado
La sección **Site Footer** incluye:
- Logo y tagline de la marca
- Columnas organizadas: Shop, Help, Info (opcional)
- Enlaces de redes sociales
- Copyright
- Opcional: formulario de newsletter
- Diseño responsive que se adapta a mobile

---

## Notas de performance

- Las imágenes usan `image_url` + `image_tag` con `widths` y `sizes` → Shopify sirve el tamaño correcto automáticamente
- `loading: 'lazy'` en imágenes secundarias, `loading: 'eager'` solo en la imagen principal del PDP
- El CSS está inline en cada sección para evitar render-blocking
- El JS es mínimo, vanilla, sin dependencias externas

---

## Implementación Recomendada para Homepage

Para replicar el diseño original de GitHub Pages en Shopify:

1. **Hero Section**: Usa una sección personalizada o el theme editor para el video hero
2. **Shop by Category**: Usa **Featured Products Staggered** con 4 productos
3. **Ticker Bar**: Crea una sección HTML personalizada con el texto animado
4. **New Arrivals**: Usa **Collection Grid** o **Featured Products Staggered**
5. **Footer**: Usa **Site Footer** con todas las opciones habilitadas

---

*Arrive Aruba Premium Web · 2026*
