# Admin-Driven Product Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render merchant-managed product highlights, fabric swatches, quality features and shipping in a responsive luxury PDP without losing native Shopify commerce.

**Architecture:** Keep the existing Liquid product section and JS custom elements. Focus new rendering in small product snippets, pass resolved option indices through section data attributes, and repair variant state within `ProductForm`; scope style changes to the main product. Shopify Admin is the data source, with setup performed by the merchant using a precise guide.

**Tech Stack:** Shopify Online Store 2.0, Liquid/JSON templates, vanilla custom elements, existing CSS/theme tokens; Shopify CLI 4.8.3 and Node 24.13.1 available. Temporary LiquidJS already exists outside the repository.

---

## Execution constraints and quick path

Approved design: [2026-10-02-product-admin-redesign-design.md](../specs/2026-10-02-product-admin-redesign-design.md). No additional design approval is needed.

Execute in `C:\Aaron_Programacion\Proyectos\arrive-aruba-website`, branch `codex/shopify-theme-v1`. Preserve the existing four dirty files (`config/settings_schema.json`, `sections/site-footer.liquid`, `sections/featured-products-staggered.liquid`, `snippets/meta-tags.liquid`) and untracked `.atl/`. No worktree, commit or push. User has an ongoing Shopify dev process; do not start another or upload/publish as a verification shortcut.

Suggested batches: **A: Tasks 1–2** (data/render/guide); **B: Task 3** (controller); **C: Task 4** (scoped design); **D: Task 5** (integrated verification). Tasks 2 and 4 depend on Task 1's markup contract; Task 3 owns JS and depends on that contract. Do not have multiple executors edit `sections/product.liquid` concurrently.

## File map

| File | Responsibility |
| --- | --- |
| `sections/product.liquid` (175 lines currently) | Roles, native options/form, initial variant/media, snippet composition, schema migration. |
| `snippets/product-highlights.liquid` (new) | GSM/fit/in-stock native-size badges; receives product, current variant and zero-based role indices. |
| `snippets/product-features.liquid` (new) | Ordered feature references with accessible optional rich-text details. |
| `snippets/product-feature-icon.liquid` (new) | Fixed six-icon allowlist; unknown keys emit no SVG. |
| `snippets/product-shipping.liquid` (new) | Optional per-product shipping; heading/details independently optional. |
| `templates/product.json` | Remove only obsolete main-product settings/exact shipping placeholder; retain app IDs, blocks and section order. |
| `assets/theme.js:337–438` | Actual ProductGallery/ProductForm state and commerce integration. |
| `assets/theme.css:240–291,425,427` | Product-only responsive layout, clean gallery, pills/options/fallback/sticky purchase. |
| `locales/en.default.json`, `locales/en.default.schema.json` | Storefront badges/fallback labels and exact role-setting help. Preserve JSON leading comments. |
| `docs/SHOPIFY_PRODUCT_DATA.md` (new), `docs/SHOPIFY_SETUP.md:44–55` | Spanish merchant guide and short link from existing setup. |
| Temporary `C:\Users\duque\AppData\Local\Temp\opencode\arrive-aruba-product-*` | Focused render/schema diagnostics and browser fixture; not theme assets or production dependencies. |

Keep `snippets/product-media.liquid`, `snippets/price.liquid`, `snippets/product-card.liquid`, shared `snippets/icon.liquid` and layout intact unless verification identifies a specific necessary integration fix. Do not refactor listings or global currency formatting.

## Shared contract for all batches

- Metaobject type `product_feature`: required `label` and `icon_key` single-line text; optional `details` rich text. Allowed icons `leaf,sun,shield,droplet,check,truck`.
- Product fields: `custom.fabric_weight_gsm:number_integer`, `custom.fit_label:single_line_text_field`, `custom.product_features:list.metaobject_reference(product_feature)`, `custom.shipping_heading:single_line_text_field`, `custom.shipping_details:rich_text_field`.
- Existing `custom.materials/care/fit/size_guide` remain rich text and preserve rendering.
- Section role settings: `color_option_name`, `size_option_name`. Configured trimmed/case-insensitive exact names first; native swatch metadata for unresolved color; exact multilingual aliases next (see design). Never assign both roles to the same option. All matching uses actual variant option positions/values.
- On `.product-layout`: optional zero-based `data-color-option-index`, `data-size-option-index`.
- Option fieldsets: `data-option-position` is zero-based; preserve `data-option-input` radios/adjacent labels and `data-selected-option`. `data-variant-options` wraps enhanced radio groups.
- Highlights: `data-available-sizes` badge with localized prefix and child `data-available-sizes-values`; keep hidden size badge node when a recognized size exists but none are available so JS can reveal it. Emit no size badge node if role absent. Keep native ordered size values in JSON `script[data-size-values]` adjacent to highlights. Omit empty overall highlights wrapper, or keep it hidden with a JS-revealable size badge when relevant.
- Form: preserve `[data-variants]`, purchase buttons and error node; hidden `[name="id"][data-variant-id]` initially disabled; visible labeled `select[name="id"][data-variant-fallback]` and native submit in `[data-variant-fallback-container]` enabled until successful enhancement (submit disabled only if `product.available` is false). Enhanced buttons/sticky bar use `[data-enhanced-purchase]`; native payment wrapper uses `[data-dynamic-checkout]`. Use `data-enhanced` on `product-form` only after initialization succeeds.
- Put variant and size JSON through `json` and neutralize `</script>` by replacing `<` with `\u003c`; escape all new text/attributes and use `metafield_tag` on rich metafield objects. JS uses `textContent` for merchant/option text.

### Task 1: Liquid data and native form integration

**Files:** Create four product snippets in file map; modify `sections/product.liquid`, `templates/product.json`, `locales/en.default.json`, `locales/en.default.schema.json`. Temporary diagnostic: `arrive-aruba-product-render.cjs`.

- [ ] **1. Capture baseline and meaningful render expectations.** Inspect just mapped files/current diff; record exact Judge.me block IDs/order and shared placeholders. Create a temporary Node `node:test` diagnostic that renders actual snippets via the installed LiquidJS package, with minimal Shopify `image_url`, `json`, translation and `metafield_tag` adapters. Stub only Shopify runtime services, not the new rendering logic. Register/strip Liquid `{% doc %}` only for diagnostics if the installed parser lacks it. These adapters cannot prove full Shopify rendering; record that limitation.

  Run (after creating diagnostic using `apply_patch`):
  ```powershell
  node "C:\Users\duque\AppData\Local\Temp\opencode\arrive-aruba-product-render.cjs" "C:\Aaron_Programacion\Proyectos\arrive-aruba-website"
  ```
  Initial assertions should fail for missing new snippets. Assert actual output: missing fields produce no visible new facts; `245` produces `245 GSM`; label `<img src=x onerror=alert(1)>` is text/escaped; list ordering survives; blank labels skip; unknown icon preserves text without arbitrary markup; heading-only/details-only shipping works; native rich-text adapter is called with the field object. Include an option value `</script><script>alert(1)</script>` to verify inert serialized JSON.

- [ ] **2. Implement snippets and role resolution.** In section's initial Liquid block compute the role positions following the shared contract; pass explicit arguments to isolated snippets (`render` does not inherit local variables). Build highlights by testing native values against `product.variants` with `variant.available` and selected color. Do not use `option_value.available` for the aggregate size badge. Features use `.value` on the reference list, then each referenced object's fields. Representative rendering boundaries:
  ```liquid
  {%- assign gsm = product.metafields.custom.fabric_weight_gsm.value -%}
  {% if gsm != blank and gsm > 0 %}<span class="product-highlight">{{ gsm | escape }} GSM</span>{% endif %}
  {%- for feature in product.metafields.custom.product_features.value -%}
    {% if feature.label.value != blank %}
      {% render 'product-feature-icon', icon_key: feature.icon_key.value %}
      <span>{{ feature.label.value | escape }}</span>
      {% if feature.details != blank %}<div class="rte">{{ feature.details | metafield_tag }}</div>{% endif %}
    {% endif %}
  {%- endfor -%}
  ```
  Wrap details in real `details/summary` with the label as summary; simple label-only entries are static pills. Implement SVG paths in the new icon snippet using six `case` branches and no dynamic SVG/HTML from Admin. Add localized keys `available_sizes`, `variant`, and `product_highlights`; only nonempty new content becomes visible.

- [ ] **3. Repair PDP-native swatch precedence and progressive form markup.** Prefer native image, else native color; do not add `swatch--{{ option_value | handle }}` to new PDP labels since it implies hardcoded color metadata. Render value text/accessibility for metadata-free swatches; escape names/values and image URL attributes. Increase hit area in Task 4. Native fallback pattern inside existing Shopify product form:
  ```liquid
  <input type="hidden" name="id" data-variant-id value="{{ current_variant.id }}" disabled>
  <div data-variant-fallback-container>
    <label for="Variant-{{ section.id }}">{{ 'products.product.variant' | t }}</label>
    <select id="Variant-{{ section.id }}" name="id" data-variant-fallback>
      {% for variant in product.variants %}
        <option value="{{ variant.id }}"{% if variant.id == current_variant.id %} selected{% endif %}{% unless variant.available %} disabled{% endunless %}>{{ variant.title | escape }} — {{ variant.price | money }}{% unless variant.available %} — {{ 'products.product.sold_out' | t }}{% endunless %}</option>
      {% endfor %}
    </select>
    <button class="button button--primary" type="submit"{% unless product.available %} disabled{% endunless %}>{{ 'products.product.add_to_cart' | t }}</button>
  </div>
  ```
  Provide localized fallback sold-out/no-available behavior; no duplicate successful ID controls. Synchronize initial gallery visibility/pagination to `current_variant.featured_media.id`, falling back to first media if absent. Continue rendering `product-media` for all native types. Keep existing quantity, dynamic checkout, sticky button, price snippet and details/app loops.

- [ ] **4. Migrate only conflicting PDP settings.** Remove old `delivery_note/heading/text` rendering, schema settings and main template values; render product-shipping instead. Remove gallery/media background variables and their obsolete schema/template settings, retain `media_fit`. Add role settings (type `text`, no empty `default`) with help and schema translations. Remove exact untouched `delivery` placeholder/block-order entry if still matching current source; preserve modified merchant blocks, size-fit/returns, all app/recommendation sections. Do not invent replacement shipping default or modify global/footer copy.

- [ ] **5. Run focused renders and Theme Check.** Include color values having both image/color (image wins), color only, neither; populated/missing/all-sold-out/no-size fields; compare native ordering and feature escaping. Actual swatch label render can be tested by parsing/rendering the section option fragment rather than copying its decisions. Re-run diagnostic command; expected all cases pass. Run `shopify theme check --path .`; expect no new errors (record baseline/pre-existing findings distinctly). Do not use live uploads to resolve a local diagnostic.

### Task 2: Deliver merchant Admin guide

**Files:** Create `docs/SHOPIFY_PRODUCT_DATA.md`; modify only product-data subsection of `docs/SHOPIFY_SETUP.md`.

- [ ] **1. Write a Spanish quick path and exact definition tables.** Cover Settings > Custom data > Products/Metaobjects (UI wording may vary), exact keys/types above, metaobject `product_feature`, required label/display name, icon choices and optional rich details. Set storefront access and active entry status when available; no website-page capability required. Explain field creation precedes product entry; no claim values prefilled in theme.
- [ ] **2. Document native swatches and per-product workflow.** Associate product category/category metafield for Shopify native color swatches where supported, connect color option to that native category data, edit each color entry to upload an actual fabric image or set solid color, assign variant media separately. Do not promise that an ordinary product image automatically becomes `option_value.swatch.image`. Explain role override settings for arbitrary names (e.g. `Tono`/`Medida`); normal `Color`/`Colour`/`Talla` detection; choose actual variants and track inventory; disable continuing sales at zero for strict stock badges. Define reusable feature entries, select/reorder references per product, populate actual shipping heading/details (under 48 hours only if true), retain rich materials/care/fit/size-guide fields.
- [ ] **3. Add preview/troubleshooting checklist and setup link.** Verify missing fields hide, drafts/private metaobjects hide, color change updates sizes, fabric-photo swatch wins, rich shipping formatting remains, media and purchase still work. Explain data visibility delays/current dev preview and that local diagnostics cannot create Admin definitions. Add a short link to this guide in existing setup, preserving unrelated instructions. Manually cross-check every key/type/icon against Task 1.

### Task 3: Repair contextual variant state in the actual controller

**Files:** Modify `assets/theme.js:364–438`; adjust ProductGallery initialization only if needed. Temporary browser fixture/server: `arrive-aruba-product-dom.html`, `arrive-aruba-product-preview.cjs` in pre-approved temp directory.

- [ ] **1. Establish a browser red case using the real theme JS.** Serve temporary fixture over loopback with Node `http` (read actual `assets/theme.js`/CSS from workspace), attach real `product-form`/gallery markup and standard live region. Use chrome-devtools snapshots/interactions/evaluate for assertions. Reuse open local preview if available; do not start Shopify dev or mutate remote cart. Minimal variants:
  ```js
  const variants = [
    { id: 101, options: ['Blue', 'S'], available: true, price: 10000, compare_at_price: 12000, featured_media: { id: 1 } },
    { id: 102, options: ['Blue', 'M'], available: false, price: 10000 },
    { id: 103, options: ['Orange', 'M'], available: true, price: 11000, featured_media: { id: 2 } },
    { id: 104, options: ['Orange', 'L'], available: true, price: 11000 }
  ];
  ```
  Start Blue/S: Orange must remain reachable, not disabled just because Orange/S is nonexistent; changing Orange clears stale S, exposes M/L, hides price and disables purchase until explicit M or L. This fails with current code's fixed Liquid disabled flags/stale hidden ID. Run `node "C:\Users\duque\AppData\Local\Temp\opencode\arrive-aruba-product-preview.cjs" "C:\Aaron_Programacion\Proyectos\arrive-aruba-website"`; server reports loopback URL. Stop only this temporary server after QA.

- [ ] **2. Add focused controller methods and initialization.** `connectedCallback` reads actual role indices from closest layout, ordered size JSON, native variant JSON, fieldsets, fallback and hidden ID. Treat absent role attributes as unresolved, not index0 (`Number(null)` and empty strings incorrectly yield0). Parse/validate before adding `data-enhanced`; use explicit `[data-variant-id]` rather than ambiguous `[name="id"]`. Initialize labels/badge/variant media without clearing explicit sold-out deep-link selections. Only after success disable fallback select/native submit, enable appropriate hidden ID, attach radio/submit listeners and set enhanced state. For no-fieldset/default-variant products resolve the Liquid-initialized ID directly instead of attempting to match an empty options array.

  Define `selectedOptions()` in native fieldset order, `optionOrder()` (color first, others in native order), `refreshOptionAvailability(changedPosition)` (prefix matching plus downstream reconciliation), `updateAvailableSizes()` (inventory aggregate by color), and `updateVariant()` (exact tuple/state). Event carries changed native position. Prefix rule for each candidate:
  ```js
  const supported = this.variants.some((variant) => variant.available
    && variant.options[position] === input.value
    && earlierPositions.every((index) => !selected[index] || variant.options[index] === selected[index]));
  input.disabled = !supported;
  ```
  Process dependencies sequentially and reread selected values after clearing unsupported downstream checked inputs; never clear the newly chosen upstream input or select a replacement. Initial exact unavailable tuples keep their checked values and sold-out state. Do not refresh only English `Color`/`Size` names. For available badge: dedupe/filter native size JSON with available variants matching selected color only; other dimensions do not limit the badge. Set child `textContent`, hidden states and accessible announcement where helpful.

- [ ] **3. Make invalid/valid state transitions atomic.** Refresh disabled values/legends even when no tuple exists. Missing/partial tuple clears/disables ID, hides price/compare, disables both submits and dynamic checkout wrapper, announces unavailable, removes `variant` URL param, preserves other query params/path. Exact tuple restores ID/price, compare visibility, both labels/availability, featured media and URL. Use existing localized `formatMoney`, locale-aware root and cart/drawer refresh. Keep an explicit current-variant state so `addToCart` guards missing/sold-out variants independently of a single button. No cart request for invalid state. Dynamic payment control must not be interactive with stale ID; restore it only for available tuple.

- [ ] **4. Prove the matrix and commerce behavior in the browser.** Inspect the real registered element, not a rewritten pure function. Assertions after user-style change events:
  ```js
  const form = document.querySelector('product-form');
  const assert = (ok, message) => { if (!ok) throw new Error(message); };
  assert(form.querySelector('[data-variant-id]').disabled, 'invalid ID must be disabled');
  assert(form.querySelector('[data-variant-id]').value === '', 'invalid ID must be cleared');
  assert([...form.querySelectorAll('[data-product-submit]')].every((button) => button.disabled), 'both purchase buttons must be disabled');
  assert(document.querySelector('[data-available-sizes-values]').textContent === 'M, L', 'Orange sizes must match inventory');
  ```
  Then choose Orange/M: ID103, price11000/local currency, media2, `?variant=103`, both buttons enabled. Cover return Blue, Blue/M sold-out deep link, nonexistent tuple, all-sold-out, default variant, Color after Talla, explicit roles for `Tono`/`Medida`, third option with sparse tuples, missing role/no-size. Mock browser `fetch` only on the local fixture: verify actual FormData ID103/quantity/sections goes to locale-root `cart/add.js`, section replacement and cart opening still occur; invalid tuple sends zero requests and API errors announce. Verify fallback without JS has exactly one submitted ID, allows choosing an available variant from a sold-out deep link, and initialization-failure fallback remains visible/enabled. `node --check assets/theme.js` must exit 0.

### Task 4: Apply scoped luxury responsive styling

**Files:** Modify `assets/theme.css:240–291,425,427`; only adjust section markup if a demonstrated styling/accessibility need cannot be addressed with the agreed selectors.

- [ ] **1. Capture existing PDP desktop/mobile and implement gallery cleanup.** Remove generated gradient/blue background and both outer frame/inner image padding at all product breakpoints; scoped selectors must override current mobile padding. Keep native fit/media ratio and placeholder intentional. Use cream/transparent media canvas. Example of required scope, not a global reset:
  ```css
  .main-product .product-gallery{padding:0;background:transparent}
  .main-product .product-media{background:transparent}
  .main-product .product-media img{padding:0}
  .main-product product-form:not([data-enhanced]) [data-variant-options]{display:none}
  .main-product product-form:not([data-enhanced]) [data-enhanced-purchase]{display:none}
  .main-product product-form:not([data-enhanced]) [data-dynamic-checkout]{display:none}
  .main-product product-form[data-enhanced] [data-variant-fallback-container]{display:none}
  ```
  Hide fallback label with the select as a labeled wrapper after enhancement. Respect explicit `[hidden]` on badges/prices/media; do not let `display:flex/grid` resurrect hidden nodes.

- [ ] **2. Style compact badges, feature pills and shipping.** Wrap rows, allow long translated/merchant text (`min-width:0`, sensible overflow wrapping), preserve existing serif title/tokens, navy/blue/orange hierarchy. Features/details and rich shipping lists/links remain readable. PDP color controls have at least 44px hit areas with real fabric image centered inside, focus/checked rings and clear disabled states; retain accessible value text. Do not fabricate textures or globally change collection-card swatches.
- [ ] **3. Correct responsive/sticky behavior.** Keep two columns at >=900px and stacked media-first below. Avoid sticky right-column content taller than viewport being inaccessible; make long information flow naturally. Keep mobile sticky purchase at drawer-safe z-index, reserve bottom content/safe-area padding and avoid duplicate no-JS sticky controls if confusing. Keyboard can reach all options/details and checkout. No broad overflow hiding to conceal layout bugs.
- [ ] **4. Verify computed styles and interaction.** Browser at widths320/390/768/899/900/1280 and keyboard zoom200%; compare `document.documentElement.scrollWidth` to `clientWidth`, also product element bounds because global body already hides overflow. Confirm no generated blue/gradient/frame in computed PDP styles while blue within photo stays; image/video/external/3D and pagination remain operational. Verify color/size focus, feature details, drawer over sticky bar and visible final content. No new CSS/runtime errors.

### Task 5: Integrated validation and handoff

**Files:** Temporary `arrive-aruba-product-schema.cjs`; all changed files reviewed; merchant guide verification status updated only if useful.

- [ ] **1. Validate Shopify schema beyond Theme Check.** Create a temporary Node `node:test` diagnostic parsing actual section `{% schema %}` JSON and template/locale JSON (strip only leading Shopify comment, not `//` in URLs). Assert unique setting/block IDs, every template setting/block/order refers to a schema/actual block, valid range grids/max step counts, legal URL defaults, nonempty text defaults if present, configured role translation keys, and untouched Judge.me/recommendations IDs/settings/order. Existing URL schema rejections were not caught by Theme Check; inspect new schema rather than assuming its pass proves upload compatibility.
- [ ] **2. Run the required commands once after integrated changes.**
  ```powershell
  node "C:\Users\duque\AppData\Local\Temp\opencode\arrive-aruba-product-render.cjs" "C:\Aaron_Programacion\Proyectos\arrive-aruba-website"
  node "C:\Users\duque\AppData\Local\Temp\opencode\arrive-aruba-product-schema.cjs" "C:\Aaron_Programacion\Proyectos\arrive-aruba-website"
  node --check assets/theme.js
  shopify theme check --path .
  git diff --check
  git status --short
  git diff --stat
  ```
  Expected: diagnostics pass, JS syntax valid, no new Theme Check errors, no whitespace errors, only planned new/modified paths plus original dirty files/.atl. Compare original four diffs to the captured baseline; do not “clean up” them. Record actual outputs and any genuine test/runtime limitations.
- [ ] **3. Read-only dev preview if already available.** Use existing page/local dev URL or read-only theme preview for `myzeiq-wp.myshopify.com` theme `166299041840`; inspect real product Liquid, missing/populated fields if merchant has entered them, native swatches, Judge.me and deep-linked media. Do not manufacture Admin data or upload/start/publish a theme to obtain evidence. Live cart/checkout writes are excluded; local mocked commerce validates request behavior. If remote populated data is absent, report that specific acceptance item as merchant follow-up rather than claim verified.
- [ ] **4. Finish with a concise evidence-based handoff.** State changed files, exact Admin contract/guide path, diagnostics/browser scenarios actually checked, any remaining real-store validation and preservation of existing changes. Save important discoveries/fixes to Engram project `arrive-aruba-website`. No commits, push or additional approval loop.

## Acceptance coverage checklist

- [ ] GSM/fit optional, escaped and Admin-defined: Task1 + Task2.
- [ ] Native fabric-photo swatches first, no fake texture/color claims: Task1 + Task4.
- [ ] Ordered features/icons/rich details and storefront access: Task1 + Task2.
- [ ] Product-specific shipping without legacy24h/free150/48h fallback: Task1 + Task2.
- [ ] Actual per-color sizes, inventory, role overrides, arbitrary order/third options: Task1 + Task3.
- [ ] Deep links, invalid/sold-out/default variants, no-JS form, local-money/cart/drawer/dynamic payment: Task1 + Task3.
- [ ] Description/metafield accordions/media/Judge.me/recommendations retained: Task1 + Task5.
- [ ] Luxury product-only desktop/mobile/focus/sticky/overflow behavior: Task4.
- [ ] Schema/server-constraint diagnostics, Theme Check and clean diff evidence: Task5.
