# SyncLead.io — Design Tokens Reference (v2 — WD-032)

Standalone reference for all CSS variables, Tailwind config extensions, and font configuration for the `synclead_site/` Astro project. This is the single source of truth; [`site-spec.md`](site-spec.md) references these token names throughout.

**Decisions & change history**: [`memory-bank.md`](memory-bank.md) — visual decisions carry `WD-nnn` IDs (WD-003 superseded by WD-032, WD-012 logo component, WD-014 no raw hex).
**Site context & claim evidence**: [`project-context.md`](project-context.md)

---

## 0. Brand Color Rationale (WD-032 Overhaul)

Approved by founder on 2026-09-03:
- **Dark Cinema Background Scale**: `--bg-0` (`#05080F`) through `--bg-3` (`#141D33`) for high-contrast B2B infrastructure aesthetic.
- **Sky Blue**: `--color-sky` (`#41C8FF`), `--color-sky-2` (`#7FD9FF`), `--color-sky-ink` (`#0E86C8`) representing the "Booked" outcome state, highlights, and primary actions.
- **Violet**: `--color-violet` (`#9D8BFF`), `--color-violet-2` (`#B7A8FF`), `--color-violet-ink` (`#6C58E8`) representing the "Sent" state and the AI section. (WD-003 purple ban explicitly superseded by WD-032).
- **Semantics**: Green (`#3DD68C` ok), Gold (`#F5B74E` warn), Pink (`#F0618C` err).

---

## 1. CSS Custom Properties (`src/styles/tokens.css`)

All tokens are defined on `:root`.

### 1.1 Backgrounds
| Token | Value | Usage |
|---|---|---|
| `--bg-0` | `#05080F` | Deepest black — page background, hero background |
| `--bg-1` | `#0A0F1D` | Primary dark section background |
| `--bg-2` | `#0E1626` | Dark surface card background |
| `--bg-3` | `#141D33` | Elevated dark background |

### 1.2 Lines & Borders
| Token | Value | Usage |
|---|---|---|
| `--line` | `rgba(151, 166, 199, 0.14)` | Hairline borders on dark surfaces |
| `--line-2` | `rgba(151, 166, 199, 0.24)` | Stronger borders on dark surfaces |
| `--line-l` | `#E2E9F3` | Borders on light surfaces |

### 1.3 Ink & Typography
| Token | Value | Usage |
|---|---|---|
| `--ink` | `#E8EDF7` | Primary text on dark surfaces |
| `--ink-2` | `#9AA6BE` | Secondary text on dark surfaces |
| `--ink-3` | `#5F6B85` | Tertiary / muted text on dark |
| `--ink-l` | `#0D1626` | Primary text on light surfaces |
| `--ink-l-2` | `#525E77` | Secondary text on light surfaces |
| `--ink-l-3` | `#8B96AD` | Tertiary text on light surfaces |

### 1.4 Accents & Semantics
| Token | Value | Usage |
|---|---|---|
| `--color-sky` | `#41C8FF` | Primary accent — links, focus ring, booked indicator |
| `--color-sky-2` | `#7FD9FF` | Lighter sky accent |
| `--color-sky-ink` | `#0E86C8` | Sky text on light backgrounds |
| `--color-violet` | `#9D8BFF` | Secondary accent — sent chips, AI section glow |
| `--color-violet-2` | `#B7A8FF` | Lighter violet for emphasis |
| `--color-violet-ink` | `#6C58E8` | Violet text on light backgrounds |
| `--color-ok` | `#3DD68C` | Success, verified records, booked status |
| `--color-warn` | `#F5B74E` | Warning, stopped steps |
| `--color-err` | `#F0618C` | Error states |

### 1.5 Fonts & Typography
| Token | Value | Usage |
|---|---|---|
| `--f-ui` | `'Instrument Sans', ui-sans-serif, system-ui, sans-serif` | Global UI text |
| `--f-serif` | `'Instrument Serif', Georgia, serif` | Italic headline emphasis words |
| `--f-mono` | `'JetBrains Mono', ui-monospace, monospace` | Eyebrows, chips, code, machine stats |

---

## 2. Font Configuration (`@fontsource/*`)

Self-hosted only — **no Google Fonts CDN** (WD-001).

Packages:
- `@fontsource/instrument-sans` (400, 500, 600, 700)
- `@fontsource/instrument-serif` (400, 400-italic)
- `@fontsource/jetbrains-mono` (500, 600)

Imported in [`BaseLayout.astro`](../src/layouts/BaseLayout.astro).

---

## 3. Brand Asset Inventory

| File | Contents | Use on |
|---|---|---|
| `public/logo-icon.svg` | Icon mark only | Favicon, square contexts |
| `public/logo-full-on-dark.svg` | Icon + wordmark (white) | Dark surfaces (navbar, footer, mobile menu) |
| `public/logo-full-on-light.svg` | Icon + wordmark (black) | Light surfaces |
| `public/favicon-64.png` | 64 × 64 raster | PNG favicon fallback |

---

## 4. Editorial & Legal Prose Typography (`.legal-prose`, `.prose-cinema` — WD-036)

Engineered for legal documents and future blog articles:
- **Headings (H2)**: `clamp(22px, 2.4vw, 26px)`, 700 weight, `#FFFFFF`, `letter-spacing: -0.02em`, `scroll-margin-top: 120px`, subtle top separator rule (`rgba(151, 166, 199, 0.12)`).
- **Subheadings (H3)**: `18px`, 600 weight, `#F1F5F9`, `letter-spacing: -0.01em`, `scroll-margin-top: 120px`.
- **Body / Paragraphs / Lists**: `16px` / `1.8` line-height, `#CAD5E8` (10.5:1 WCAG AAA contrast against `--bg-0`/`--bg-1`).
- **Strong / Labels**: `#FFFFFF` bold emphasis.
- **Bullets**: `6px` circular sky indicator with soft ambient glow (`rgba(65, 200, 255, 0.45)`).
- **Entity & Address Cards**: `bg-[#0E1626]/80 border border-white/[0.1] border-l-[3px] border-l-sky rounded-xl p-5 text-[#E2E8F0]`.
- **Links**: `text-sky underline underline-offset-[3px] hover:text-sky-2`.
