# Arrive Aruba — Design System

> **The island stays with you. ✦**
> Premium resort lifestyle apparel — Aruba.

Arrive Aruba captures the emotional moment of arriving on the island — stepping off the plane into island life. The brand lives in that feeling: warm, premium, distinctly Aruban. Execution standard is **Ralph Lauren**: nothing overdone, everything considered. Quiet luxury, never loud branding.

This repository is the brand's design system: real assets (logos, icons, the divi-divi mark, fonts), low-level visual foundations (color, type, spacing, elevation), reusable React UI primitives, and a full marketing-website UI kit.

---

## Sources

- **Brand asset folder:** `ARRIVE ARUBA/` (locally-mounted) — logos (AI/SVG/PNG color variants), icon variables, ITC Legacy Serif + Port Blair fonts, the divi-divi illustration, the arrival video frame sequence, and social-media templates (Instagram, Facebook, web mockup).
- **Uploaded files:** `uploads/` — `MAIN LOGO.svg`, icon variables, `DIVI DIVI.png`, the three ITC Legacy Serif `.otf` cuts, and the brand audio.
- **Brand brief:** supplied directly (color/type/logo/voice rules), summarized below.

> ⚠️ The mounted `ARRIVE ARUBA/` folder disconnected partway through setup. All essential assets were already copied into `assets/`. To pull additional video frames or clean lifestyle photography, **re-attach the folder via the Import menu.** See *Caveats*.

---

## Content fundamentals

**Voice:** warm but professional, evocative, concise. Short sentences. Generous white space. Emotionally resonant, never salesy.

**Person:** speaks to *you* ("The island stays with you", "Made for the moment you step off the plane"). Brand refers to itself rarely and quietly.

**Casing:** Sentence case for everything functional and editorial. Spaced UPPERCASE only for eyebrows / small labels and the "ARUBA" lockup. Never all-caps headlines.

**Brand punctuation — the star ✦:** functions as punctuation. It closes phrases and replaces repetition of the brand name. Example: *"The island stays with you. ✦"*. Never decorative filler.

**Emoji:** none, with the single exception of the ✦ star glyph used as described.

**Always:** short sentences · generous white space · emotionally resonant copy.
**Never:** anchors, rope textures, nautical clichés, distressed aesthetics, "good vibes" language, gift-shop visual codes.

Example lines (in voice):
- "The island stays with you. ✦"
- "Made for the moment you step off the plane."
- "The polo you'll wear long after the tan."
- "We answer slowly and warmly. ✦"

---

## Visual foundations

**Color.** Star Sapphire `#386395` and Silver Lake Blue `#5F8BB8` are the foundation. Cannoli Cream `#F0F0E5` is the primary neutral for backgrounds and clean surfaces. Mock Orange `#F5A169` and Fair Green `#92AF88` are seasonal accents — **accent-only, never dominant, and never used together in one composition.** Never use pure black, navy, red, or any off-palette color. Tokens live in `tokens/colors.css`.

**Type.** Three families, strict hierarchy:
- **Port Blair Alternate** (display/script) — leads large hero moments and the logo voice only.
- **ITC Legacy Serif Std** (Medium / Italic / Bold / Ultra) — editorial titles and product names.
- **Geologica** (300–700, Google Fonts) — everything functional: UI, captions, descriptions, body.
Tokens in `tokens/typography.css`; faces in `tokens/fonts.css`.

**Spacing.** 8px base rhythm; generous white space is a *requirement*, not a preference. Section breathing room runs to `--space-10` (128px). Tokens in `tokens/spacing.css`.

**Backgrounds & imagery.** Full-bleed island photography (warm golden light, natural color, slight grain — never b&w, never cold). Cannoli Cream is the default flat surface; Star Sapphire for inverse feature blocks. No decorative gradients as backgrounds — the only gradients are **protection scrims** over photography (`--scrim-bottom` / `--scrim-top`, sapphire-tinted) so text stays legible.

**Corners & cards.** Soft radii: cards `--radius-md` (14px), feature cards / dropdowns `--radius-lg` (22px), CTAs are full pills (`--radius-pill`). Cards are white surfaces with soft, **sapphire-tinted** elevation (never pure-black shadow); an `outline` variant uses a cream hairline with no shadow.

**Elevation.** Shadow scale `xs → lg` plus a dedicated `--shadow-cta` glow, all tinted `rgba(56,99,149,…)`. Tokens in `tokens/elevation.css`.

**Motion.** Calm and considered — no bounce. Gentle ease (`--ease-out`, `--ease-standard`), generous durations (160 / 280 / 520ms). Hover = a small lift (`translateY(-6px)`) and a softer-to-stronger shadow, plus slow image scale (1.04). Press/active = color deepen (sapphire → `--sapphire-deep`), no harsh shrink. Focus = a 3px soft silver ring.

**Borders.** Hairlines are warm cream (`--border-hairline`); stronger lines use Silver Lake. On dark surfaces, borders are translucent cream.

**Transparency & blur.** Used sparingly — translucent cream for chips/borders on sapphire, and the photographic scrims. No glassmorphism.

**Logo.** Always 100% opacity — no transparency, watermarks, drop shadows, glows, outlines, or 3D. Never distort/stretch or separate the gestural **A** from the script. Approved pairings only: white logo on Star Sapphire / Silver Lake; Star Sapphire logo on Cannoli Cream or white; Cannoli Cream logo on Star Sapphire.

---

## Iconography

The brand is **mark-led, not icon-heavy.** There is no functional UI icon font in the brand kit. The visual marks are:
- **Primary logo** — gestural oversized "A" (embedded airplane/arrow) sweeping into "rrive" script, with "ARUBA" in spaced serif below. `assets/logos/` (SVG + PNG color variants 1–5, positive/negative).
- **Secondary icon** — minimal sun / horizon / airplane symbol, standalone use only. `assets/icons/icon-color-*.png`, `icon-mono-*.png`.
- **Divi-divi tree** — a secondary *local* mark for garment placement (tee hem), not a primary brand mark. `assets/illustrations/divi-divi.png` and `divi-divi-line.svg`.

**Functional UI icons** (bag, search, chevron, close, social marks) are provided as a small inline-SVG set in `ui_kits/website/Icons.jsx`, drawn at a light 1.6px stroke to match the quiet aesthetic; social glyphs (Instagram, Facebook, TikTok, WhatsApp, Mail) use single-path brand marks. If you need a broader UI icon set, substitute **Lucide** (matching 1.5–1.75px stroke) and keep it minimal. Emoji are never used as icons — only the ✦ star glyph, as brand punctuation.

---

## Index / manifest

**Root**
- `styles.css` — entry point (import list only). Consumers link this one file.
- `tokens/` — `colors.css`, `fonts.css`, `typography.css`, `spacing.css`, `elevation.css`, `base.css`.
- `assets/` — `logos/`, `icons/`, `illustrations/`, `imagery/`, `fonts/` (plus `_ref/` reference screenshots).
- `readme.md` (this file) · `SKILL.md` (Agent-Skill wrapper).

**Foundations** (`guidelines/*.html` — Design System tab cards)
- Colors: Primary, Seasonal Accents, Surface & Text Roles
- Type: Display (Port Blair), Serif (ITC Legacy), Body & UI (Geologica)
- Spacing: Scale, Radii & Elevation
- Brand: Primary Logo, Secondary Icon & Divi-Divi, Brand Punctuation ✦
- Social: 1:1 Post composition

**Components** (`components/` — `window.ArriveArubaDesignSystem_4dc787`)
- `core/` — `Button`, `Card`, `Tag`, `Eyebrow`
- `forms/` — `Input`
- `brand/` — `Logo`
- `commerce/` — `ProductCard`
Each has `.jsx` + `.d.ts` + `.prompt.md`, and a directory card HTML.

**UI kits**
- `ui_kits/website/` — Arrive Aruba marketing website: interactive home (hero · collection · editorial · newsletter), shop grid, product detail (size select + add to bag), contact, and a slide-in bag drawer. Entry: `index.html`.

---

## Caveats

- **Garment photography not provided.** Product tiles render a considered placeholder (cream/sapphire surface + secondary mark). Drop real shots into the `image` field of `ui_kits/website/Products.jsx` to go live.
- **Hero imagery** is a clean crop from the supplied web mockup / video frame. For pristine full-resolution lifestyle photography, re-attach the `ARRIVE ARUBA/` folder.
- **Fonts** are the real supplied files (Port Blair Alternate `.otf`, ITC Legacy Serif `.otf` cuts). Geologica loads from Google Fonts. No substitutions were needed.
