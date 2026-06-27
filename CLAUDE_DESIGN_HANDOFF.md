# Arrive Aruba Web - Handoff para Claude Design

Este documento sirve como punto de entrada para que Claude Design encuentre el proyecto correcto en GitHub y pueda trabajar a partir de la version actual sin depender de archivos comprimidos.

## Ubicacion del proyecto

Repositorio GitHub:
https://github.com/morfemartin/Web_Arrive-Aruba

Rama recomendada para continuar el trabajo:
`codex/current-upload`

Enlace directo a la rama:
https://github.com/morfemartin/Web_Arrive-Aruba/tree/codex/current-upload

Pull Request sugerido desde esta rama:
https://github.com/morfemartin/Web_Arrive-Aruba/pull/new/codex/current-upload

## Archivo principal para revisar primero

Para entender la version visual temporal:

`index.html`

Archivos relacionados:

- `preview.css`
- `preview.js`
- `preview-assets/`

Esta version funciona como una preview estatica navegable y puede abrirse directamente en navegador.

## Estructura importante del proyecto

### Preview estatica

- `index.html`: pagina principal temporal para revisar la direccion visual y estructural.
- `preview.css`: estilos de la preview.
- `preview.js`: interacciones basicas de la preview.
- `preview-assets/brand/`: logos, isotipo y recursos visuales de marca.
- `preview-assets/fonts/`: tipografias de Arrive Aruba.
- `preview-assets/media/`: imagenes principales usadas en la preview.

### Base para Shopify

- `layout/theme.liquid`: layout principal del theme.
- `sections/`: secciones editables pensadas para Shopify.
- `snippets/`: componentes reutilizables.
- `templates/`: templates JSON de Shopify.
- `assets/arrive-aruba.css`: estilos del theme Shopify.
- `assets/arrive-aruba.js`: interacciones del theme Shopify.
- `config/settings_schema.json`: configuracion editable desde el editor visual de Shopify.
- `locales/`: textos traducibles.

## Intencion del proyecto

El objetivo es construir una web premium para Arrive Aruba con estas prioridades:

1. Afinidad total con la identidad visual de Arrive Aruba.
2. Prioridad mobile-first.
3. Estructura compatible con Shopify y editable sin codigo.
4. Portada sobria, lujosa, moderna y con animaciones elegantes.
5. Carga rapida, assets optimizados y buenas practicas de seguridad.
6. Inspiracion visual en marcas luxury fashion como Gucci, Louis Vuitton y Saint Laurent, sin copiar literalmente su diseno.

## Linea visual esperada

La estetica debe sentirse:

- Editorial.
- Premium.
- Limpia.
- Moderna.
- Serena.
- Con mucho aire visual.
- Con fotografia protagonista.
- Con tipografia de marca bien aplicada.
- Con animaciones sutiles, no recargadas.

Evitar que la web parezca generica, saturada, tipo plantilla comun o demasiado decorativa.

## Prioridad estructural

Antes de refinar estetica, mantener clara esta estructura:

1. Header premium y simple.
2. Hero principal de marca/producto.
3. Bloques de categorias o colecciones.
4. Productos destacados.
5. Secciones editoriales de marca.
6. Servicios o beneficios.
7. Newsletter / contacto.
8. Footer completo.

## Notas para trabajar en Claude Design

Usar como base la rama:
`codex/current-upload`

No trabajar desde un `.zip` ni desde archivos sueltos. Clonar o importar el repo desde GitHub para conservar la estructura completa.

Si Claude Design pregunta por el archivo inicial, abrir:
`index.html`

Si el objetivo es convertirlo o mejorarlo para Shopify, usar como base:

- `layout/theme.liquid`
- `sections/`
- `templates/`
- `assets/arrive-aruba.css`
- `config/settings_schema.json`

## Pendientes sugeridos

- Refinar estructura segun wireframes y app flow originales.
- Reforzar uso de logo, colores y tipografias de Arrive Aruba.
- Mejorar jerarquia visual mobile.
- Revisar que todas las secciones puedan ser editadas desde Shopify.
- Sustituir imagenes temporales por fotografia final de producto/marca.
- Preparar contenido real de productos, precios, tallas y variantes.
- Publicar version de preview en GitHub Pages cuando la rama final sea aprobada.
