# Approved design: Admin-driven product page

Implement a luxury Arrive Aruba product page whose product facts come from Shopify Admin. The merchant creates definitions and enters content; the theme renders it and preserves native Shopify purchasing. Implementation was approved on 2026-10-02.

## Outcome and layout

- Desktop at the existing 900px breakpoint: media left, information/purchase right. Below it: media above information, accessible mobile purchase bar.
- Cream background, navy text, blue actions, restrained orange accents, existing luxury serif typography and theme tokens.
- Information order: eyebrow; compact GSM/fit/available-size badges; title/price/reviews/description; quality pills; native options and purchase; product-specific shipping; existing details/app blocks.
- Remove the theme-generated gallery gradient, solid blue media frame and image padding. Preserve backgrounds within uploaded photography, native media fit, and image/video/external-video/3D rendering.
- New optional content disappears when absent, including empty wrappers. No invented fabric weight, fit, freshness, UPF, delivery promise or manual size-range claim.

## Exact merchant data contract

All product definitions have owner **Product**. Enable storefront read access where Shopify exposes it.

| Namespace/key | Shopify type | Rendering contract |
| --- | --- | --- |
| `custom.fabric_weight_gsm` | `number_integer` | Positive integer followed by `GSM`; absent/nonpositive hides badge. Recommend Admin validation minimum 1. |
| `custom.fit_label` | `single_line_text_field` | Short escaped badge text; independent of existing rich-text fit accordion. |
| Native variants/options/inventory | Native Shopify data | Available-size badge uses real size values with at least one `variant.available` match in selected color, in native option order. |
| `custom.product_features` | `list.metaobject_reference` restricted to `product_feature` | Render references in merchant list order; skip entries without labels or unavailable to storefront. |
| `custom.shipping_heading` | `single_line_text_field` | Escaped product shipping title; no legacy delivery fallback. |
| `custom.shipping_details` | `rich_text_field` | Render with `metafield_tag`, preserving links, paragraphs and lists. |
| `custom.materials`, `custom.care`, `custom.fit`, `custom.size_guide` | Existing `rich_text_field` | Keep existing localized accordions and native `metafield_tag`. |

### Feature metaobject

Merchant creates the definition **Product feature**, with exact type `product_feature`:

| Field key | Shopify type | Validation |
| --- | --- | --- |
| `label` | `single_line_text_field` | Required; use as display-name field. |
| `icon_key` | `single_line_text_field` | Required; limit choices to `leaf`, `sun`, `shield`, `droplet`, `check`, `truck`. |
| `details` | `rich_text_field` | Optional; visible, accessible expandable details rather than hover-only tooltips. |

Icons are a fixed theme SVG allowlist, decorative (`aria-hidden="true"`); their presence never creates a claim. Unknown/blank icon keys render label-only. Merchant text is escaped; rich text uses the actual metafield object with `metafield_tag`, not `.value` piped into that filter. Enable the definition's storefront access and activate entries when publishable status is enabled. No standalone metaobject web pages are needed.

### Option role resolution

Variant matching always uses actual option values and positions, independent of names. Add optional section text settings `color_option_name` and `size_option_name`, with no empty default attribute, to support arbitrary merchant names.

1. Match configured name exactly after trimming/downcasing.
2. If color remains unresolved, use the first option containing native swatch metadata.
3. Resolve remaining roles by exact aliases: color `color`, `colour`, `colore`, `couleur`, `farbe`; size `size`, `talla`, `tamaño`, `tamano`, `taille`, `taglia`, `größe`, `grosse`.
4. A configured role takes precedence; a single option cannot be both roles. No guessed size option: hide the badge if unresolved. Unknown options remain normal native radio groups.

For color values prefer `option_value.swatch.image` over `.swatch.color`; absent native metadata yields a neutral/text-labelled control, without manufactured texture or product-photo substitution. New PDP swatches must not inherit name-based hardcoded color classes. Leave collection-card swatches outside this change.

## Variant state contract

### Availability and recovery

Use a dependency order with color first (if resolved), followed by other options in native order. A value is enabled if an available variant matches that value and every selected earlier dependency; later dependencies are deliberately ignored. Thus color stays switchable even when the current size is incompatible, and all dependent choices refresh after each change.

- Do not automatically choose a first variant or another size. After a change clear checked downstream values unsupported by the updated prefix; enable legitimate alternatives for explicit selection.
- Exact selected tuple resolves to its native variant ID. Sold-out exact variants remain distinguishable from nonexistent tuples, including sold-out deep links on initialization.
- Missing/partial tuple: disable both purchase buttons and dynamic payment control, clear/disable hidden ID, show localized unavailable-combination message, hide stale price, remove stale `variant` query parameter, and make no cart request.
- Valid tuple: restore price/compare price, availability, ID, selected labels, variant media and `?variant=` while preserving other URL parameters and locale paths. Valid sold-out tuples show sold-out label and cannot submit.
- Initialize from Liquid's `selected_or_first_available_variant`, including explicit `?variant=` IDs; do not overwrite it with an arbitrary available variant. Show its featured media initially and synchronize gallery controls.

### Available-size badge

Resolve size/color indices once and pass them as zero-based `data-size-option-index` / `data-color-option-index` on the main `.product-layout`; omit unresolved attributes. Iterate native size values in their defined order. Include a size once if any available variant has that size and the selected color; other dimensions do not constrain this aggregate badge. Without a color role aggregate across variants; without size role omit badge. Hide the badge when no sizes are available. Liquid and JavaScript must agree on the initial result; update on every color change using `textContent`.

`variant.available` is Shopify's purchase-availability authority, including its inventory policy; do not infer stock from nonexistent quantities in variant JSON. The guide must explain that strict on-hand stock messaging requires tracked inventory and **Continue selling when out of stock** disabled.

### Commerce and accessibility

- Retain native product form, quantity configuration, monetary localization, `cart/add.js`, drawer refresh, checkout and wishlist/back links.
- Progressive enhancement: a real labeled `select[name="id"]` lists native variants (sold-out disabled) and has its own native submit enabled when the product has any available variant. This permits selecting a purchasable alternative even from a sold-out deep link with JS absent. JS only enables its hidden ID and disables fallback controls after successful controller initialization; enhanced purchase buttons are shown then. Exactly one successful ID control. Keep fallback visible if initialization fails.
- Radios keep accessible names, legends, native keyboard behavior, visible focus and sufficiently large touch targets. Images have existing alt text; icons are decorative. Shipping/feature details support keyboard and touch.
- Mobile sticky purchase stays synchronized with main button, respects safe-area inset and does not obscure final content or drawer. Native dynamic checkout, when configured, cannot purchase a stale ID.
- Preserve all description/details/app rendering and all media types. Do not globally restyle other templates.

## Migration of current shared content

`sections/product.liquid:71–75,133` currently exposes `delivery_note`, `delivery_heading`, `delivery_text`; schema/template default to 24 hours/free $150. Remove these three PDP rendering paths and their obsolete schema/template settings; product-specific shipping is the only new shipping source. No 48-hour default is introduced: merchant enters it only when accurate.

Remove the `delivery` template collapsible only when it still equals the untouched placeholder (`Delivery` / `<p>Add delivery timing and service areas here.</p>`); remove its block-order entry at the same time. Preserve any changed merchant block, the existing size-fit/returns blocks, recommendations, empty app sections and both Judge.me widgets. Runtime remains able to render merchant-created collapsibles. Do not alter unrelated footer/global delivery statements.

Retire `gallery_background` and `media_background` from this product section/template; they drive the unwanted blue frame. Keep `media_fit` and its native fit behavior.

## Verification and boundaries

Acceptance covers missing/populated data, escaping, image-first swatches, color/size inventory matrices, arbitrary option names/order, deep links, invalid/sold-out/default variants, no-JS submission and responsive media/purchase behavior. Use actual Liquid render diagnostics and the actual registered JS custom element in a browser; avoid regex-only mirror tests or a new production testing framework.

Run offline Theme Check, supplemental JSON/schema constraints and `git diff --check`. Live verification is read-only against an existing dev preview if available. Theme CLI access was previously verified for `myzeiq-wp.myshopify.com`, development theme `166299041840`; no Admin API integration exists. The merchant performs Admin data writes. Work remains in the current directory/branch, with no worktree, commits, push, publishing or new dev process in this plan.

Preserve pre-existing changes in `config/settings_schema.json`, `sections/site-footer.liquid`, `sections/featured-products-staggered.liquid`, `snippets/meta-tags.liquid` and untracked `.atl/`.

Implementation handoff: [implementation plan](../plans/2026-10-02-product-admin-redesign.md).
