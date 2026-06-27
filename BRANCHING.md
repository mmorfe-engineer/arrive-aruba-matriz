# Branching strategy

This repository separates the static preview work from the Shopify theme conversion.

## Branches

| Branch | Purpose |
| --- | --- |
| `main` | Stable, approved source. Keep this branch clean and release-ready. |
| `preview/static` | Static HTML preview branch. Use this for client/design review before Shopify conversion. |
| `gh-pages` | Published GitHub Pages branch. This mirrors the preview site that is live at GitHub Pages. |
| `shopify/theme` | Shopify theme implementation branch. Use this for Liquid sections, snippets, templates, config, and Shopify CLI work. |

## Workflow

1. Build and review static changes in `preview/static`.
2. Publish the approved preview to `gh-pages` so the GitHub Pages URL stays stable.
3. Merge approved preview changes into `main`.
4. Port approved pieces from `main` into `shopify/theme` when building the Shopify theme.
5. Keep Shopify-specific code out of `preview/static` unless it is part of the static preview contract.

## Naming conventions

Use short, scoped branches for new work:

```bash
feature/static-homepage-section
feature/shopify-product-card
fix/static-mobile-nav
fix/shopify-cart-state
```

## Release rule

Only approved work should reach `main`. GitHub Pages should remain preview-focused and safe to share.
