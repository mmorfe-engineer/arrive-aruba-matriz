# Arrive Aruba — Premium Web & App

Resortwear shaped by the island. *Take home what you felt. ✦*

This repository contains the Arrive Aruba digital flagship, built on the official brand system (Star Sapphire palette, Cannoli Cream surfaces, ITC Legacy Serif + Geologica, the ✦ star).

## Contents

| File | What it is |
|------|------------|
| `index.html` | Landing launcher (entry point for GitHub Pages) |
| `Arrive Aruba - Homepage.dc.html` | Editorial marketing homepage (mobile-first) |
| `Arrive Aruba - App.dc.html` | Full mobile-app prototype — the complete App Flow (login → home → search → product → cart → checkout → profile → settings) |
| `assets/` | Brand logos + fonts (ITC Legacy Serif, Port Blair) |
| `support.js` | Runtime that powers the interactive pages |

All pages open directly in a browser — no build step.

## Publish on GitHub Pages

The preview is published through GitHub Pages at:

`https://morfemartin.github.io/Web_Arrive-Aruba/`

That URL loads `index.html`, which links to the website and the app.

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Stable, approved source |
| `preview/static` | Static HTML preview before Shopify conversion |
| `gh-pages` | Published GitHub Pages branch |
| `shopify/theme` | Shopify/Liquid theme development branch |

See `BRANCHING.md` for the full workflow.

## Notes
- Geologica loads from Google Fonts; ITC Legacy Serif and the logos are bundled in `assets/`.
- Fully responsive and mobile-first. Respects `prefers-reduced-motion`.
