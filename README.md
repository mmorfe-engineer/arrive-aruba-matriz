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

## LIVE PREVIEW

[Arrive Aruba — Live Preview](https://morfemartin.github.io/Web_Arrive-Aruba/Arrive%20Aruba%20-%20Homepage.dc.html)

## Publish on GitHub Pages

1. **Create a repo** at https://github.com/new (e.g. `arrive-aruba`), public.
2. **Upload these files** — drag the whole folder into the repo's "uploading an existing file" page, or push with git:
   ```bash
   git init
   git add .
   git commit -m "Arrive Aruba — web & app"
   git branch -M main
   git remote add origin https://github.com/<your-user>/arrive-aruba.git
   git push -u origin main
   ```
3. **Enable Pages:** repo **Settings → Pages → Build and deployment → Source: "Deploy from a branch" → Branch: `main` / `(root)` → Save.**
4. After ~1 minute your site is live at:
   `https://<your-user>.github.io/arrive-aruba/`

That URL loads `index.html`, which links to the website and the app.

## Notes
- Geologica loads from Google Fonts; ITC Legacy Serif and the logos are bundled in `assets/`.
- Fully responsive and mobile-first. Respects `prefers-reduced-motion`.
