# Instalación y configuración en Shopify

## 1. Conectar el tema

1. Fusiona el PR de `codex/shopify-theme-v1` hacia `main` cuando el QA esté aprobado.
2. En Shopify Admin abre `Online Store > Themes`.
3. Selecciona `Add theme > Connect from GitHub`.
4. Autoriza `morfemartin/Web_Arrive-Aruba` y selecciona `main`.
5. Mantén el tema sin publicar durante la carga de catálogo y contenido.

Para probar la rama antes del merge:

```bash
git switch codex/shopify-theme-v1
shopify theme dev --store store-name.myshopify.com
```

El primer comando contra la tienda abre la autenticación de Shopify. La cuenta necesita permiso de Themes.

## 2. Navegación y páginas

En `Content > Menus`, configura `Main menu` y los menús del footer. Rutas recomendadas:

- Shop: colección principal.
- Island Story: página con template `island`.
- Contact: página con template `contact`.
- Search, Customer account y Cart usan rutas nativas del tema.

Crea una página llamada `Island Story`, selecciona el template `page.island` y enlázala desde los CTA `Discover the Island` y `Read the Story` en el editor del tema.

## 3. Catálogo y colecciones

Para validar inmediatamente la plantilla de producto, importa `docs/arrive-aruba-demo-product.csv` desde `Products > Import`. El archivo crea un polo de prueba con dos colores, tres tallas, inventario y precio. No incluye fotografías para comprobar también el placeholder de marca. El producto se puede eliminar al terminar el QA.

1. Crea productos con variantes reales de talla y color.
2. Carga media en cada producto; el tema acepta imágenes, video, video externo y modelos 3D.
3. Configura precio, compare-at price, SKU, inventario y disponibilidad.
4. Crea colecciones para Swim, Resort, After Sun y New Arrivals.
5. Selecciona las colecciones desde las secciones de Home.
6. Instala o abre Shopify Search & Discovery para definir filtros y recomendaciones.

Los productos sin fotografía muestran el placeholder de Arrive Aruba automáticamente.

## 4. Datos personalizados de producto

Sigue la [guía de datos de producto](SHOPIFY_PRODUCT_DATA.md) para crear las definiciones exactas en `Settings > Custom data`, configurar el metaobjeto `product_feature` y cargar los valores desde cada producto.

La ficha toma gramaje, etiqueta de fit, características y envío de esos datos de Admin. Las tallas disponibles, los colores, las variantes y los swatches proceden de las opciones nativas de Shopify. Un dato opcional vacío se oculta; el tema no agrega promesas de envío ni características por defecto.

Se conservan `custom.materials`, `custom.care`, `custom.fit` y `custom.size_guide` como **Rich text** en los acordeones. `custom.fit_label` es una etiqueta corta independiente; no reemplaza `custom.fit`.

## 5. Editor del tema

En `Online Store > Themes > Customize`:

1. Sube logo principal, logo inverso, favicon y social sharing image en Theme settings.
2. Revisa colores, body font, ancho del contenido y motion.
3. En Home selecciona video desktop, video móvil, poster, colecciones, imágenes y enlaces.
4. Reordena u oculta secciones según el contenido disponible.
5. Configura footer, redes y localización.
6. Revisa la página Island Story y reemplaza el copy temporal al recibir el contenido final.

Los assets incluidos funcionan como fallback. Los videos seleccionados desde Shopify Files pueden incluir audio; el autoplay siempre comienza silenciado y el visitante lo activa con el control visible.

## 6. Configuración comercial

Antes de publicar, configura:

- USD y mercados activos.
- Customer accounts.
- Pagos, impuestos, descuentos y checkout.
- Tarifas y zonas de envío.
- Políticas de devolución, privacidad y términos.
- Dominio y correo del remitente.
- Formulario de newsletter y automatizaciones de email.

Saved Pieces se guarda en `localStorage` por navegador. La sincronización entre dispositivos requiere una app y queda fuera de esta fase.

## 7. QA y publicación

Valida en preview:

- iPhone Safari, Android y desktop.
- Video silencioso, control de sonido, poster y A estática/animada.
- Variantes disponibles y agotadas, precio y media.
- Add to bag, contador, cantidades, eliminación y checkout.
- Filtros, orden, paginación, búsqueda predictiva y resultados vacíos.
- Customer account, newsletter y contacto.
- Navegación por teclado, focus, contraste y reduced motion.
- SEO, canonical, social image y errores de consola.

Conserva el tema publicado anterior como rollback. Publica el nuevo tema solo después de aprobar la vista previa completa.
