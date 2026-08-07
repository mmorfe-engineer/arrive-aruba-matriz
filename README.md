# Arrive Aruba Shopify Theme

Custom Shopify Online Store 2.0 theme for Arrive Aruba. The theme translates the published prototype into a responsive, merchant-editable storefront connected to Shopify products, collections, inventory, search, cart, customer accounts, forms, and checkout.

## Branches

- `gh-pages`: published static design reference.
- `codex/shopify-theme-v1`: Shopify theme development and review.
- `main`: production Shopify theme after the pull request is approved and merged.

The static React prototype and its simulated commerce runtime are intentionally excluded from the Shopify branch.

## Features

- Editable video hero with desktop/mobile sources, poster, animated A fallback, sound control, and reduced-motion support.
- Modular home and Island Story JSON templates.
- Native product media, variants, inventory state, prices, dynamic checkout, and product recommendations.
- Collection filters powered by Shopify Search & Discovery, sorting, and pagination.
- Predictive search and full search results.
- Ajax cart drawer and cart page using Shopify's Cart and Section Rendering APIs.
- Native customer account component, newsletter, contact form, localization, and checkout routes.
- Device-local Saved Pieces drawer.
- Branded placeholders until campaign photography is available.

## Local Development

Requirements: Node.js, Shopify CLI, and theme permissions for the target store.

```bash
npm install -g @shopify/cli@latest
shopify version
shopify theme dev --store store-name.myshopify.com
```

Run validation before every pull request:

```bash
shopify theme check --path .
shopify theme package --path .
```

## Shopify Setup

See [docs/SHOPIFY_SETUP.md](docs/SHOPIFY_SETUP.md) for store configuration and [docs/MIGRACION_SHOPIFY.md](docs/MIGRACION_SHOPIFY.md) for the complete migration, QA, launch, and rollback procedure.

## Quality and Security

- No API credentials, store tokens, `.env` files, or private keys belong in this repository.
- Theme changes are validated with Shopify Theme Check in CI.
- Checkout, payments, taxes, discounts, shipping, and orders remain managed by Shopify.

## Author

Built for Arrive Aruba by [Martin Morfe](https://github.com/morfemartin).
