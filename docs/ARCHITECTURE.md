# Architecture and portfolio scope

## Runtime

`index.html` selects the mobile app or desktop homepage, with explicit `view` query overrides. The four `.dc.html` pages share the `support.js` runtime and bundled React/Babel dependencies. `cart-store.js` persists cart state in the browser. Local state is not an order database or a payment integration.

The homepage loads `figma-hero.css`, `journey-organic.css` and `journey-organic.js`. Journey reads its manifest and desktop/mobile sprite sheets from `preview-assets/journey-organic/`. These are active dependencies of the final website and must remain here even though future 3D work now has its own repository.

`preview-assets/` contains runtime imagery, fonts and animation assets. `assets/fonts/` contains fonts still referenced by the app prototype. `_ds/` is retained as portfolio documentation of the design system; it is not a runtime dependency of the published pages.

## Selected process material

`docs/design/` preserves one copy of the original wireframes and app-flow PDFs. `docs/screenshots/` shows the current main-branch homepage at desktop and mobile widths. This selection replaces the bulky competitor screenshots and intermediate captures formerly committed under `uploads/` and `screenshots/`.

## Repository separation and recovery

The independent 3D repository was seeded from original `gh-pages` commit `86c125635621eaa02446702d3d5d397b0c1880ef`, preserving its ancestry and later mobile Journey work. This cleanup is based on original `main` commit `4c16ed71aaa120c9ffca0e76cf9c1181e6ce5e49`.

Removed files remain available at that original commit. For example, inspect an old file with `git show 4c16ed7:path/to/file`. The cleanup does not rewrite history, delete other branches, change the existing Pages source or alter the 3D repository.

The old `shopify/` scaffold, its deployment script and automatic workflow were removed from `main` because they are outside the static final-web deliverable. Existing Shopify branches are retained. Store credentials were not transferred or modified.

## Cleanup validation

The source tree decreased from approximately 119.3 MB to 22.5 MB (decimal MB, approximately 81%), including the selected PDFs and new screenshots. These numbers exclude Git history.

Browser checks covered the launcher, homepage, collection, product and app pages at 1440×900 and 390×844, with scrolling and a reduced-motion homepage check. No new missing local resources were introduced. The unmodified baseline and cleaned tree both request unresolved template image URLs (`{{ activeImageSrc }}`, `{{ rel.image }}`, `{{ item.image }}`) on prototype pages; those pre-existing 404 requests are outside this cleanup. A Gitleaks scan of the cleaned tree reported no findings.
