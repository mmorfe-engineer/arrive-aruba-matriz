# Guía de migración de Arrive Aruba a Shopify

Esta guía describe cómo trasladar el proyecto Arrive Aruba a una tienda Shopify de forma controlada, editable y reversible. El tema usa Online Store 2.0 y no necesita React ni el runtime de la demo estática.

## 1. Fuente oficial del proyecto

| Recurso | Uso |
| --- | --- |
| Repositorio | `morfemartin/Web_Arrive-Aruba` |
| `gh-pages` | Referencia visual estática. No conectar a Shopify. |
| `codex/shopify-theme-v1` | Desarrollo y revisión del tema Shopify. |
| `main` | Tema de producción después de aprobar y fusionar el PR. |

Estado comprobado el 7 de agosto de 2026:

| Tema en Shopify | ID | Estado |
| --- | ---: | --- |
| `Web_Arrive-Aruba/codex/shopify-theme-v1` | `144459235376` | Tema correcto conectado a GitHub |
| `arrive-aruba-1-0-0` | `144459071536` | Copia ZIP antigua; no usar ni publicar |

La rama y el nombre del tema deben comprobarse antes de editar. No se deben mantener cambios paralelos en la copia ZIP antigua.

## 2. Qué incluye el tema

- Home editable con video desktop/móvil, poster, sonido, animación de la A y CTA.
- Página editorial Island Story.
- Colecciones con filtros, orden y paginación.
- Producto con medios, variantes, swatches, disponibilidad, precio, carrito y recomendaciones.
- Búsqueda predictiva y página de resultados.
- Cart drawer Ajax y página de carrito.
- Cuentas de cliente, newsletter, contacto, 404 y páginas genéricas.
- Configuración editable de logos, colores, tipografía, enlaces, imágenes y contenido.

## 3. Qué no migra con el código del tema

El repositorio contiene presentación y comportamiento del storefront. Estos datos pertenecen a Shopify y deben configurarse o migrarse por separado:

- Productos, variantes, inventario y colecciones.
- Fotografías y videos cargados en Shopify Files.
- Páginas, blogs, menús y políticas.
- Clientes, pedidos, descuentos y gift cards.
- Configuración de pagos, impuestos, mercados y envíos.
- Dominio, correo del remitente y automatizaciones.
- Contenido de apps y metafields que no existan en la tienda destino.

## 4. Requisitos previos

- Acceso de propietario, staff o colaborador con permiso de Themes.
- Acceso al repositorio GitHub con la cuenta `morfemartin`.
- Node.js y Shopify CLI para desarrollo o recuperación por terminal.
- Tienda destino creada y dominio `*.myshopify.com` identificado.
- Backup del tema publicado y exportación del catálogo actual.

Verifica las herramientas locales:

```bash
node --version
shopify version
git --version
```

Instala Shopify CLI si no está disponible:

```bash
npm install -g @shopify/cli@latest
```

## 5. Preparar el código

Desde el repositorio local:

```bash
git fetch origin
git switch codex/shopify-theme-v1
git pull --ff-only
shopify theme check --path .
shopify theme package --path .
```

Antes de producción:

1. Revisa el PR de `codex/shopify-theme-v1` hacia `main`.
2. Confirma que Theme Check termine sin errores.
3. Fusiona el PR.
4. Verifica que `main` contenga `layout/theme.liquid`, `templates/product.json` y las carpetas estándar del tema.

## 6. Conectar con GitHub (recomendado)

En la tienda Shopify destino:

1. Abre `Online Store > Themes`.
2. Selecciona `Add theme > Connect from GitHub`.
3. Autoriza la cuenta `morfemartin`.
4. Selecciona `morfemartin/Web_Arrive-Aruba`.
5. Selecciona la rama `main` para producción.
6. Mantén el tema como borrador/no publicado.
7. Abre `Customize` y confirma que el título superior muestre el repositorio y la rama correctos.

Durante desarrollo se puede conectar temporalmente `codex/shopify-theme-v1`, pero la tienda final debe quedar vinculada a `main` después del merge.

No conectes `gh-pages`: contiene la demo estática y no es un tema Liquid instalable.

## 7. Alternativa mediante Shopify CLI

Para previsualizar sin publicar:

```bash
shopify theme dev --store <tienda>.myshopify.com
```

Para crear un tema nuevo no publicado:

```bash
shopify theme push \
  --store <tienda>.myshopify.com \
  --unpublished \
  --strict
```

Para actualizar un tema de prueba identificado:

```bash
shopify theme push \
  --store <tienda>.myshopify.com \
  --theme <THEME_ID> \
  --strict
```

No uses `--allow-live` ni `--publish` durante desarrollo. La publicación debe hacerse después del QA desde Shopify Admin.

## 8. Migrar productos y colecciones

1. En la tienda de origen abre `Products > Export` y descarga el CSV completo.
2. Revisa handles, categorías, SKUs, precios, inventario y opciones antes de importar.
3. En la tienda destino abre `Products > Import` y carga el CSV.
4. Comprueba variantes de color y talla en varios productos.
5. Crea o revisa las colecciones `Swim`, `Resort`, `After Sun` y `New Arrivals`.
6. Configura condiciones automáticas o productos manuales según corresponda.
7. Instala Shopify Search & Discovery y configura filtros/recomendaciones.

Para una prueba rápida puede usarse:

```text
docs/arrive-aruba-demo-product.csv
```

## 9. Crear datos personalizados

En `Settings > Custom data > Products`, crea estas definiciones exactas:

| Nombre | Namespace y key | Tipo |
| --- | --- | --- |
| Materials | `custom.materials` | Rich text |
| Care | `custom.care` | Rich text |
| Fit | `custom.fit` | Rich text |
| Size guide | `custom.size_guide` | Rich text |

Después completa estos campos en cada producto. El tema oculta automáticamente los campos vacíos.

## 10. Migrar archivos y contenido editorial

1. Sube logos, favicon, posters, fotografías y videos a `Content > Files`.
2. Crea la página `Island Story` y asigna el template `page.island`.
3. Crea la página de contacto y asigna el template `page.contact`.
4. Copia las políticas desde la tienda anterior y revisa su contenido legal.
5. Configura `Main menu` y los menús del footer en `Content > Menus`.
6. Abre el editor del tema y vuelve a seleccionar imágenes/videos alojados en la tienda destino.

Los IDs de archivos y recursos de una tienda no son portables. Aunque el diseño se copie, los selectores de imagen o video pueden necesitar asignarse de nuevo.

## 11. Configurar el editor del tema

En `Online Store > Themes > Customize`:

1. Confirma que estás editando el tema conectado a la rama correcta.
2. Configura logo principal, logo inverso, favicon y social image.
3. Mantén activada la tipografía de marca Arrive Aruba.
4. Selecciona videos desktop/móvil y poster del hero.
5. Conecta las colecciones y productos destacados.
6. Revisa enlaces `Shop the Collection`, `Discover the Island` y `Read the Story`.
7. Configura newsletter, redes sociales y footer.
8. Revisa los templates Home, Product, Collection, Island Story, Cart y Search.

## 12. Configuración comercial

Antes de publicar configura y prueba:

- Moneda USD y mercados activos.
- Shopify Payments o proveedor de pagos.
- Impuestos y recaudación correspondiente.
- Zonas, tarifas y tiempos de envío.
- Customer accounts.
- Descuentos y códigos promocionales.
- Checkout, emails transaccionales y políticas.
- Dominio principal y redirecciones.

## 13. QA obligatorio

### Diseño y responsive

- Desktop, laptop, iPhone Safari y Android Chrome.
- Header, logos y menús sin desbordamiento.
- Video, poster, animación y control de sonido.
- Textos, botones e imágenes sin superposición.
- Reduced motion y navegación por teclado.

### Producto y catálogo

- Productos con una variante y con múltiples variantes.
- Cambios de color/talla, precio, disponibilidad y medio asociado.
- Producto agotado y variante no disponible.
- Add to bag, drawer, cantidades, eliminación y subtotal.
- Recomendaciones, filtros, orden, búsqueda y paginación.

### Conversión y administración

- Newsletter y formulario de contacto.
- Login/cuenta de cliente.
- Descuentos, impuestos y envío en checkout.
- Pedido de prueba de inicio a fin.
- SEO, canonical, social sharing image y errores de consola.

## 14. Publicación y rollback

1. Mantén el tema anterior publicado durante todo el QA.
2. Genera y comparte el preview del tema nuevo.
3. Obtén aprobación visual y comercial.
4. En `Online Store > Themes`, abre el menú del tema correcto y selecciona `Publish`.
5. Revisa inmediatamente Home, Product, Cart y Checkout en el dominio real.
6. Conserva el tema anterior sin modificar como rollback.

Si aparece una regresión crítica, vuelve a publicar el tema anterior desde la Theme library. No borres el tema de rollback hasta completar varios pedidos reales.

## 15. Flujo Git posterior a la migración

```text
codex/<descripcion> -> Pull Request -> main -> Shopify
```

- Los cambios de código deben entrar por PR.
- Los commits del desarrollo deben usar la identidad GitHub de Martin Morfe.
- No subir `.env`, tokens, claves, certificados ni credenciales.
- Antes de publicar, ejecutar `git status`, revisar el diff y correr Theme Check.
- Evitar editar simultáneamente el mismo archivo desde GitHub y Shopify Admin.

## 16. Solución de problemas

### El editor muestra una versión antigua

1. Revisa el nombre del tema en la parte superior del editor.
2. Confirma repositorio y rama.
3. Cierra previews de temas ZIP antiguos.
4. Abre el tema conectado desde `Online Store > Themes`.
5. Verifica en GitHub que la rama contenga el commit esperado.

### El producto muestra errores Liquid

1. Confirma que estás en el tema correcto.
2. Ejecuta `shopify theme check --path .`.
3. Revisa `sections/product.liquid` y `templates/product.json`.
4. No publiques mientras exista texto `Liquid error` en preview.

### Faltan imágenes o videos

Los archivos de una tienda no se copian con el tema. Súbelos en la tienda destino y vuelve a seleccionarlos desde el editor.

### No aparecen filtros o recomendaciones

Configura Shopify Search & Discovery, crea filtros compatibles y asegúrate de que existan suficientes productos publicados.

## 17. Checklist final

- [ ] `main` contiene la versión aprobada.
- [ ] Shopify está conectado al repositorio y rama correctos.
- [ ] El tema nuevo sigue sin publicar durante QA.
- [ ] Productos, variantes, inventario y colecciones están revisados.
- [ ] Metafields y archivos están cargados.
- [ ] Menús, páginas, políticas y enlaces están configurados.
- [ ] Pagos, impuestos, envíos y dominio están listos.
- [ ] QA desktop/móvil completado.
- [ ] Pedido de prueba completado.
- [ ] Tema anterior conservado como rollback.
- [ ] Tema nuevo publicado y verificado en producción.
