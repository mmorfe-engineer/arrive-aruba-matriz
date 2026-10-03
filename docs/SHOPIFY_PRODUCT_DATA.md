# Configurar los datos de la ficha de producto

Crea las definiciones una vez en Shopify Admin y luego edita los valores de cada producto. El tema muestra únicamente los datos conectados: no completa gramaje, fit, características ni condiciones de envío por su cuenta.

## Ruta rápida

1. En **Settings > Custom data > Metaobjects**, crea **Product feature** con tipo `product_feature` y los tres campos indicados abajo.
2. En **Settings > Custom data > Products**, crea los metacampos con las claves y tipos exactos de la tabla.
3. En **Content > Metaobjects > Product feature**, crea las características que realmente correspondan a tus prendas.
4. Abre **Products > tu producto**: carga sus metacampos, selecciona las características en el orden deseado y configura opciones, variantes, inventario e imágenes.
5. Comprueba la ficha en vista previa. Cambiar los valores después de este setup actualiza lo que muestra el tema sin editar código.

## 1. Definición del metaobjeto

Nombre recomendado: **Product feature**. Tipo exacto: **`product_feature`**.

| Nombre | Key exacta | Tipo en Admin | Validación |
| --- | --- | --- | --- |
| Label | `label` | Single line text | Obligatorio; seleccionarlo como **Display name** de la definición. |
| Icon key | `icon_key` | Single line text | Obligatorio; limitar a las opciones `leaf`, `sun`, `shield`, `droplet`, `check`, `truck`. |
| Details | `details` | Rich text | Opcional; admite párrafos, listas y enlaces. |

En las opciones de acceso de la definición, habilita **Storefronts / acceso de lectura a la tienda online**. Si activas la capacidad **Publishable**, cambia cada entrada utilizada a **Active**; las entradas **Draft** no están disponibles para la tienda. No hace falta activar páginas web individuales para estos metaobjetos.

El campo `label` es el texto visible completo. Si una característica comprobada de tu producto se llama «Fresca» o «IPH UPF50+», escribe tú ese texto exacto: el tema no lo deduce del icono ni añade una afirmación de protección. Usa solamente etiquetas que describan el producto real.

| Icon key | Icono decorativo |
| --- | --- |
| `leaf` | Hoja |
| `sun` | Sol |
| `shield` | Escudo |
| `droplet` | Gota |
| `check` | Marca de verificación |
| `truck` | Camión |

Los iconos son SVG estáticos del tema, sin HTML ni archivos cargados desde el metaobjeto. Una clave desconocida o vacía deja solo la etiqueta. Una referencia no accesible o una etiqueta vacía no genera una característica. Cuando hay `details`, la etiqueta abre un desplegable accesible por teclado y toque; no depende de pasar el cursor.

## 2. Definiciones de metacampos de producto

En **Settings > Custom data > Products > Add definition**, comprueba el namespace y key, el tipo y si es un valor o una lista. Habilita lectura para storefront donde Admin ofrezca esa opción.

| Nombre recomendado | Namespace y key exactos | Tipo Shopify / selección en Admin | Qué muestra |
| --- | --- | --- | --- |
| Fabric weight GSM | `custom.fabric_weight_gsm` | `number_integer` / Integer, un valor | Número positivo seguido de `GSM`. Configura mínimo **1**; vacío, cero o negativo se oculta. |
| Fit label | `custom.fit_label` | `single_line_text_field` / Single line text, un valor | Etiqueta corta del fit, tal como la escribes. |
| Product features | `custom.product_features` | `list.metaobject_reference` / Metaobject reference, **List of values** | Restringe la definición permitida a **Product feature (`product_feature`)**. Muestra las referencias seleccionadas en el orden de la lista. |
| Shipping heading | `custom.shipping_heading` | `single_line_text_field` / Single line text, un valor | Título de envío propio del producto. |
| Shipping details | `custom.shipping_details` | `rich_text_field` / Rich text, un valor | Condiciones de envío con párrafos, listas y enlaces. |
| Materials | `custom.materials` | `rich_text_field` / Rich text, un valor | Acordeón de materiales existente. |
| Care | `custom.care` | `rich_text_field` / Rich text, un valor | Acordeón de cuidados existente. |
| Fit | `custom.fit` | `rich_text_field` / Rich text, un valor | Acordeón de fit existente, independiente de `fit_label`. |
| Size guide | `custom.size_guide` | `rich_text_field` / Rich text, un valor | Guía de tallas existente. |

Si las cuatro definiciones anteriores ya existen, consérvalas. No cambies `custom.fit` a texto simple para crear la etiqueta: usa la nueva clave `custom.fit_label`.

### Cargar o cambiar valores

En **Products > tu producto > Metafields**, completa los campos que correspondan. Selecciona las entradas de **Product features** y ordénalas. Puedes reutilizar una entrada en varios productos; editar esa entrada cambia su etiqueta y detalles en todos los productos que la referencian.

Los textos cortos se muestran como texto, no como código HTML. Los campos **Rich text** conservan su formato. Vaciar un campo opcional oculta su contenido, sin valor de sustitución. En envío puedes completar solo el título, solo los detalles o ambos; con ambos vacíos desaparece todo el bloque.

Las condiciones de envío son copy informativo del producto: no configuran las tarifas, zonas ni políticas del checkout. Mantén esos ajustes comerciales en **Settings > Shipping and delivery**. El tema ya no introduce en esta ficha el aviso compartido de 24 horas ni el umbral de envío gratis de $150.

## 3. Opciones, swatches e inventario nativos

### Color y tejido

1. En el producto, configura la **Product category** adecuada para que Shopify ofrezca los metacampos de categoría de color y sus entradas de swatch.
2. En **Product options**, conecta la opción de color al metacampo de categoría compatible de Shopify. Define los colores con sus datos nativos de swatch.
3. Para un swatch de tejido, carga la imagen de muestra en la entrada nativa de color, cuando Shopify ofrezca ese campo. También puedes definir su color sólido.
4. Si existen imagen y color para un mismo valor, la ficha muestra la **imagen primero**. Sin datos de swatch muestra el nombre de la opción; no inventa colores ni usa la fotografía del producto como textura.

Las fotos y demás medios se cargan en **Product media**. Puedes asociar media a variantes para que se muestre al seleccionarlas. La galería admite imágenes, video, video externo y modelos 3D; el ajuste **Media fit** del editor sigue disponible. El tema no añade un fondo azul a las fotos: un fondo dentro de una fotografía se conserva.

### Tallas y disponibilidad

Usa valores de talla reales en **Product options** y ordénalos como quieras que aparezcan. La etiqueta de tallas disponibles toma ese mismo orden y muestra únicamente tallas con al menos una variante comprable para el color seleccionado. Otras dimensiones, como largo, no limitan esa etiqueta agregada. Sin opción de color reconocida, agrega las tallas de todas las variantes; sin opción de talla reconocida, o sin tallas comprables, la etiqueta se oculta.

La fuente de disponibilidad es `variant.available` de Shopify. Para que «disponible» signifique inventario físico positivo, activa **Track quantity**, carga las cantidades por ubicación y desactiva **Continue selling when out of stock**. Si permites vender sin existencias, Shopify puede considerar comprable una variante con cantidad cero y el tema respetará esa política.

Los controles de opciones usan las posiciones reales: color no tiene que ser la primera opción. Primero se evalúa color y después las otras opciones en su orden nativo; así sigue siendo posible cambiar a otro color aunque la talla actual esté agotada. La mejora JS no debe cambiar por su cuenta la talla elegida: una combinación incompleta exige que el comprador elija una alternativa.

## 4. Ajustes opcionales del editor del tema

En **Online Store > Themes > Customize > Products > Main product**, puedes indicar **Color option name** y **Size option name** si tus opciones usan nombres particulares. Escribe el nombre completo; se ignoran mayúsculas y espacios al principio/final. Estos ajustes identifican el rol de una opción; no crean valores, características ni inventario.

Orden de detección:

1. Nombre configurado exacto, normalizado; una misma opción no puede ocupar ambos roles. Si configuras el mismo nombre para ambos, color conserva ese rol y talla busca otra coincidencia.
2. Para color todavía no identificado: primera opción con metadatos nativos de swatch que no esté reservada como talla.
3. Alias exactos de color: `color`, `colour`, `colore`, `couleur`, `farbe`. Alias de talla: `size`, `talla`, `tamaño`, `tamano`, `taille`, `taglia`, `größe`, `grosse`.

Si no hay coincidencia, la opción conserva su control normal. Deja los nombres vacíos cuando la detección automática sea suficiente. Los demás ajustes del editor controlan presentación, cantidad, compra rápida, media y bloques; los hechos del producto se editan en Admin.

## Checklist de vista previa

- [ ] El gramaje y fit coinciden con los datos del producto; vacío no genera una etiqueta ficticia.
- [ ] Las características tienen tus etiquetas, el orden esperado y detalles desplegables cuando corresponda.
- [ ] Las entradas referenciadas están accesibles al storefront y **Active** si usan Publishable.
- [ ] Una muestra con imagen y color usa la imagen; sin swatch se puede leer el nombre.
- [ ] Las tallas cambian según color y respetan las variantes comprables y su orden nativo.
- [ ] Las condiciones de envío son las que cargaste, con sus enlaces y formato.
- [ ] Descripción, materiales, cuidados, fit detallado, guía de tallas y Judge.me siguen presentes.
- [ ] Sin JavaScript puedes elegir una variante disponible en el selector nativo y enviarla a la bolsa, incluso si abriste una variante agotada.

Si no aparece un dato, revisa primero **key**, **tipo**, valor cargado, acceso storefront y estado de la entrada. Para instalación y QA general, vuelve a [SHOPIFY_SETUP.md](SHOPIFY_SETUP.md).
