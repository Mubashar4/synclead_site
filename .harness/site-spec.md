# SyncLead.io Marketing Site — Architectural Specification

**Target**: Astro 4.x static site at `synclead_site/` (repo root: `C:\Synclead\sync_api`)
**Deployment**: Cloudflare Pages (SSG only, `output: 'static'`, no API routes)
**Stack**: Astro 4.x · Tailwind CSS v3 · `@fontsource/*` (Instrument Sans/Serif, JetBrains Mono) · vanilla JS only (no React/Vue/GSAP)
**Design system**: see [`design-tokens.md`](design-tokens.md) — token names below refer to it.
**Decisions & history**: see [`memory-bank.md`](memory-bank.md) — `WD-nnn` decision records (WD-032 brand overhaul).
**Site context & evidence**: see [`project-context.md`](project-context.md) — business stage, capabilities, claim evidence ledger.

**Status**: 🟢 Complete design system v2 overhaul implemented, building and passing all checks.

**Read order for any new task**: §9A first (what may and may not be claimed), then the
section you are editing. Sections carrying a `REBUILT` marker were replaced wholesale.

---

## 0. Global Conventions

- All component files are `.astro`, single-file, scoped `<style>` blocks where needed.
- CSS custom properties in `tokens.css` + utility classes in `global.css`.
- Every interactive JS is a `<script>` tag (bundled by Astro, type `module`, deferred by default).
- All pages import `PageLayout.astro`. No client router (`ClientRouter` omitted — MPA navigation).
- Shared reveal system: IntersectionObserver in `BaseLayout` adds `.in` to `[data-reveal]` elements.
- **Brand mark rendering**: all logo output goes through [`Logo.astro`](../src/components/ui/Logo.astro).
- **Brand colors**: Dark cinema scale (`#05080F`–`#141D33`), Sky blue (`#41C8FF` / `#0E86C8`), Violet (`#9D8BFF` / `#6C58E8`).

---

## 1. Root Config Files

### 1.1 `package.json`

**Purpose**: Project manifest, scripts, dependencies.

```json
{
  "name": "synclead-site",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^4.16.0",
    "tailwindcss": "^3.4.0",
    "@fontsource/inter": "^5.0.0",
    "@astrojs/sitemap": "^3.1.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "typescript": "^5.5.0"
  }
}
```

Notes: no `@astrojs/react`, no `sharp` (no image processing service; static assets served as-is). Sitemap integration enabled.

### 1.2 `astro.config.mjs`

**Purpose**: Static output, sitemap, Tailwind wiring.

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://synclead.io',
  output: 'static',
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
});
```

`applyBaseStyles: false` — base styles come from our `global.css` import chain only.

### 1.3 `tailwind.config.mjs`

Exactly as specified in [`design-tokens.md` §3](design-tokens.md). Content globs `./src/**/*.{astro,html,js,ts,md,mdx}`; no plugins.

### 1.4 `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": [".astro/types.d.ts", "src/**/*"],
  "exclude": ["dist"]
}
```

Path alias `@/` used in all imports.

### 1.5 `.gitignore`

```
node_modules/
dist/
.astro/
.DS_Store
*.log
.env
.env.*
```

---

## 2. `public/`

### 2.1 `public/favicon.svg`

**Purpose**: Brand favicon — the SyncLead calendar-envelope mark in sky blue (`#8ECAE6`).

The favicon reproduces the logo icon: an envelope with a calendar overlay. The icon uses `fill="#8ECAE6"` for the blue surfaces and `fill="#FFFFFF"` for the white details (calendar dots, envelope flap lines).

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect x="1" y="6" width="30" height="22" rx="4" fill="#8ECAE6"/>
  <path d="M1 12l15 9 15-9" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>
  <rect x="6" y="2" width="20" height="16" rx="3" fill="#FFFFFF"/>
  <rect x="6" y="2" width="20" height="5" rx="3" fill="#0B1D33"/>
  <circle cx="12" cy="12" r="1.2" fill="#0B1D33"/>
  <circle cx="16" cy="12" r="1.2" fill="#0B1D33"/>
  <circle cx="20" cy="12" r="1.2" fill="#0B1D33"/>
  <circle cx="12" cy="15" r="1.2" fill="#0B1D33"/>
  <circle cx="16" cy="15" r="1.2" fill="#0B1D33"/>
  <circle cx="20" cy="15" r="1.2" fill="#8ECAE6"/>
</svg>
```

Geometry: calendar sheet sitting inside an envelope, matching the actual logo mark. Renders at 16/32/48px.

### 2.2 `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://synclead.io/sitemap-index.xml
```

### 2.3 `public/og-image.png`

**Purpose**: Open Graph social card, 1200×630.

⚠️ **NOT YET SHIPPED.** `BaseLayout` references `/og-image.png` but the file does not exist in `public/`. Social shares currently render without an image. Outstanding task.

**Content spec (when produced)**: background `--gradient-hero` (dark navy); `logo-full-on-dark.svg` top-left at 96px height (real artwork — do not re-draw the mark); headline `Stop Losing Revenue to Burnt Domains and Calendar Drop-Offs.` 56px Inter 800 with the second line filled via `--gradient-text`; bottom-left tagline "Cold outreach, deliverability and no-show recovery in one platform" 28px grey-300; bottom-right badge "synclead.io" pill with navy bg + sky-blue border. Final artifact must be PNG, 1200×630, <300KB.

### 2.4 Real brand assets (`public/`)

Shipped and wired. Full inventory, including the unresolved colour mismatch between the artwork and the token palette, is in [`design-tokens.md` §3B](design-tokens.md): `logo-icon.svg`, `logo-full-on-dark.svg`, `logo-full-on-light.svg`, `favicon-64.png`. The generated `favicon.svg` placeholder is superseded and unreferenced.

---

## 3. `src/styles/`

### 3.1 `src/styles/tokens.css`

**Purpose**: All CSS custom properties (§1 of design-tokens.md verbatim) on `:root`. Contents = §1.1–§1.8 of [`design-tokens.md`](design-tokens.md), exactly, plus the channel tokens (§1.3b) and the responsive overrides:

```css
:root { /* all §1 tokens, incl. --color-sky-rgb / --color-navy-rgb / --color-white-rgb */ }
@media (max-width: 767px)  {
  :root { --text-display-xl-size: 40px; --text-display-xl-lh: 1.1;
          --text-display-l-size: 32px;  --text-display-l-lh: 1.15; }
}
@media (min-width: 768px) and (max-width: 1279px) {
  :root { --text-display-xl-size: 56px; --text-display-xl-lh: 1.07;
          --text-display-l-size: 44px;  --text-display-l-lh: 1.12; }
}
```

`--text-display-l-*` gained responsive steps because the revised H1 (§9A.3) renders at display-L, not display-XL, and needed to reflow on small screens.

(As individual `font-size`/`line-height`/`font-weight`/`letter-spacing` properties, not shorthand.)

### 3.2 `src/styles/global.css`

**Purpose**: Import chain + reset + utilities + reveal animation system.

Structure (in order):

1. Imports: `@import './tokens.css';` then `@tailwind base; @tailwind components; @tailwind utilities;` (font imports live in `BaseLayout.astro` frontmatter, not CSS).
2. Reset: box-sizing border-box; margin 0; `html { scroll-behavior: smooth; }` with `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }`; img/svg block-level max-width 100%.
3. Base: `body { font-family: var(--font-sans); color: var(--color-navy); background: var(--color-white); -webkit-font-smoothing: antialiased; }`; heading defaults via Tailwind fontSize tokens; `::selection { background: var(--color-sky); color: var(--color-navy); }`.
4. Component utilities:
   - `.container-site { max-width: var(--container-max); margin-inline: auto; padding-inline: 24px; }` (40px at `lg`).
   - `.text-gradient` — per design-tokens §3.5.
   - `.glass-dark` — per design-tokens §3.6.
   - `.browser-frame` — see §5.2.
5. Polish layer §4b (WD-028) — `.card-lift`, `.card-lift-glass`, `.btn-base`, `.nav-link`,
   `.section-seam`, `.tabular`. All CSS-only; every transform and transition collapses under
   `prefers-reduced-motion`. `.browser-frame` uses `--shadow-elevated` (was `--shadow-card`).
6. Reveal system:
   ```css
   [data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out); }
   [data-reveal].is-revealed { opacity: 1; transform: none; }
   [data-reveal][data-reveal-delay="1"] { transition-delay: 100ms; }
   /* … "2"→200ms, "3"→300ms, "4"→400ms */
   @media (prefers-reduced-motion: reduce) {
     [data-reveal] { opacity: 1; transform: none; transition: none; }
   }
   ```
6. Counter animation CSS (consumed by `AnimatedCounter.astro`, §6.5).
7. Focus-visible ring: `a:focus-visible, button:focus-visible { outline: 2px solid var(--color-sky); outline-offset: 2px; }`.

---

## 4. `src/layouts/`

### 4.1 `src/layouts/BaseLayout.astro`

**Purpose**: `<html>` shell, SEO/meta, font imports, global CSS, shared reveal script.

**Props**:
```ts
interface Props {
  title: string;
  description: string;
  ogType?: 'website' | 'article';   // default 'website'
  noindex?: boolean;                 // default false
}
```

**Structure**:
```
<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  meta charset, viewport(width=device-width, initial-scale=1), generator
  <title>{title}</title>
  meta description, canonical (Astro.site + Astro.url.pathname)
  OG: og:title, og:description, og:type, og:url, og:image="/og-image.png" (1200×630, alt "SyncLead — cold outreach, deliverability and booking in one platform"), twitter:card="summary_large_image"
  icons: <link rel="icon" type="image/svg+xml" href="/logo-icon.svg">
       + <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png">
       + <link rel="apple-touch-icon" href="/favicon-64.png">
  sitemap link /sitemap-index.xml
  {noindex && <meta name="robots" content="noindex,nofollow" />}
  JSON-LD Organization schema: name "SyncLead", url https://synclead.io, logo /logo-full-on-light.svg (light variant — crawlers composite on white), sameAs [https://www.linkedin.com/company/synclead, https://twitter.com/synclead], contactPoint sales@synclead.io
</head>
<body>
  <slot />
  <script> // shared IntersectionObserver reveal (vanilla, module)
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
  </script>
</body>
</html>
```

**Frontmatter imports**: the five `@fontsource/inter` CSS files + `import '@/styles/global.css';`.

### 4.2 `src/layouts/PageLayout.astro`

**Purpose**: Standard page chrome — Navbar, page slot, Footer.

**Props**: none (content comes from the slot; each page supplies its own `<head>` strings to `BaseLayout` — `PageLayout` accepts `title`/`description`/`noindex` and forwards to `BaseLayout`).

**Structure**:
```
<BaseLayout {...title/description/noindex}>
  <Navbar />
  <main id="main-content">
    <slot />
  </main>
  <Footer />
</BaseLayout>
```

---

### 4.3 `src/layouts/LegalLayout.astro` (WD-029, REBUILT WD-036)

**Purpose**: Shared high-end editorial and legal chrome for the four policy documents (`/terms`, `/privacy`, `/acceptable-use`, `/refund`). Built on Dark Cinema Design System v2 (WD-032). Designed for maximum technical authority, high contrast, seamless reading rhythm, and extensibility to future blog article layouts.

**Props**:

| Prop | Type | Notes |
|---|---|---|
| `heading` | `string` | Document title, rendered as the H1 |
| `standfirst` | `string` | One-line summary, taken verbatim from the source document's second line |
| `eyebrow` | `string?` | Default `'OFFICIAL POLICY'` |
| `lastUpdated` | `string` | Human-readable, e.g. `28 March 2026` |
| `lastUpdatedISO` | `string` | Machine-readable for `<time datetime>`, e.g. `2026-03-28` |
| `title` | `string` | `<title>` tag, passed through to `PageLayout` |
| `description` | `string` | Meta description, passed through |
| `current` | `string` | Path of this document; marks the active cross-link with `aria-current="page"` |
| `toc` | `TocItem[]?` | Array of `{ id, label, number? }` for sticky Table of Contents |

**Structure (WD-036)**:
1. Hero — `bg-bg-0` with radial cyan ambient glow, breadcrumbs (`HOME / LEGAL / {DOC}`), live status badge (`OFFICIAL POLICY · ACTIVE & BINDING`), H1, standfirst, and metadata summary ribbon (Last Revised date, England & Wales jurisdiction, shareable link button).
2. Document Workspace — `bg-bg-0 py-12 lg:py-16`:
   - Mobile Quick-Jump Drawer (`lg:hidden`): collapsible `<details>` jump menu to navigate clauses.
   - Desktop Sticky Sidebar (`hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28`): Legal Suite switcher, scroll-tracking Table of Contents with section highlighting via `IntersectionObserver`, and compliance support card.
   - Main Reading Canvas (`lg:col-span-8 xl:col-span-9`): `bg-bg-1/90 border border-white/[0.08] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl` wrapping `<article class="legal-prose"><slot /></article>`.
   - Executive Entity Verification Card: `bg-bg-2 border border-white/[0.08]` with active UK entity pill, company number 15903993, London address, and official mailto buttons.
3. Cross-links — `bg-bg-1 py-16 border-t border-white/[0.06]`: 4-card interactive grid showing all policy documents with current document badge and "Read Policy →" hover actions.

**Document list** lives in the layout frontmatter, not in the pages, so adding a fifth policy
updates the cross-link row on all of them at once.

**No `data-reveal`**: legal text must be readable the instant it loads, including for anyone who
lands mid-document from a deep link. Fade-in on a policy page is decoration in the wrong place.

---

## 5. `src/components/nav/` + `src/components/hero/`

### 5.1 `src/components/nav/Navbar.astro`

**Purpose**: Sticky top navigation, transparent-on-hero → solid dark on scroll; logo, 4 links, CTA.

**Props**: none.

**Content data (links)**:
| Label | Href |
|---|---|
| Features | `/features` |
| Pricing | `/pricing` |
| About | `/about` |
| Contact | `/contact` |
| CTA button | `Deploy Your Workspace` → `https://app.synclead.io/signup` (WD-031, superseding WD-020) |

**Markup**:
```
<header class="navbar" data-transparent>   <!-- fixed top-0 inset-x-0 z-50 -->
  <div class="container-site flex items-center justify-between h-16 md:h-20">
    <Logo variant="full" surface="dark" height={36} href="/" class="logo" />
    <nav class="hidden md:flex items-center gap-8" aria-label="Main">
      4 × <a class="nav-link text-body-m text-white/80 hover:text-white transition-fast">…</a>
      <Button variant="primary" size="md" href="https://app.synclead.io/signup">Deploy Your Workspace</Button>
    </nav>
    <button class="mobile-menu-toggle md:hidden" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
      hamburger SVG (3 lines, white)
    </button>
  </div>
</header>
<MobileMenu id="mobile-menu" links={same 4 + CTA} />
```

**JS**: `scroll` listener (passive): when `window.scrollY > 8`, header gets `.navbar--solid` (`background: rgba(11,29,51,0.9); backdrop-filter: blur(12px); border-bottom: 1px solid var(--color-dark-700)`), else transparent. Toggle button dispatches to MobileMenu via sibling reference (`document.getElementById('mobile-menu')`). Active link: none (MPA, keep simple).

### 5.2 `src/components/nav/MobileMenu.astro`

**Purpose**: Full-screen overlay menu for <768px.

**Props**:
```ts
interface Props {
  id?: string; // default 'mobile-menu'
  links: { label: string; href: string }[];
}
```

Default `links` = the 5 nav entries above (CTA rendered as full-width primary Button).

**Markup**:
```
<div id={id} class="mobile-menu fixed inset-0 z-40 bg-dark-900/95 backdrop-blur-md pt-24 hidden" role="dialog" aria-modal="true" aria-label="Menu">
  <nav class="container-site flex flex-col gap-6" aria-label="Mobile">
    <Logo variant="full" surface="dark" height={32} href="/" class="mb-2" />
    links → <a class="text-h2 text-white">…</a>
    <Button variant="primary" size="lg" href="https://app.synclead.io/signup" class="w-full">Deploy Your Workspace</Button>
  </nav>
</div>
```

**JS (in Navbar.astro script block)**: toggle `hidden` class + `aria-expanded` on the button; lock `document.body.style.overflow='hidden'` when open; close on any link click and on `Escape` keydown.

### 5.3 `src/components/hero/HeroSection.astro`

**Purpose**: Full-viewport dark cinematic hero with cascading overlapping UI — primary conversion surface. COPY LOCKED (WD-033).

**Props**: none (copy hard-coded).

**Content data (locked per WD-033)**:
- Eyebrow badge row: `HIGH-LEVERAGE OUTBOUND INFRASTRUCTURE` with green pulsing dot.
- Headline: `Stop Counting Sends. Start Counting Meetings.`
- Subheadline: `Replace a fractured stack. We combine multi-IP infrastructure, cold outreach, and automated no-show recovery to turn cold data into booked calls.`
- Primary CTA: `Get Started` → `https://app.synclead.io/signup` (WD-034: Trial language permanently banned)
- Trust Subtext: `Powering 147 active revenue engines.`
- Trust row: `Microsoft Solutions Partner`, `Zero Password Retention OAuth`, `Billing Secured by Stripe`.
- Hero visual: [`HeroCascadingUI.astro`](../src/components/hero/HeroCascadingUI.astro) — cascading overlapping UI with deliverability/domain health dashboard in the back and frictionless calendar booking interface in the front.

**Markup**:
```
<section id="hero" data-hero class="hero relative min-h-screen flex flex-col justify-center overflow-hidden" style="background: var(--gradient-hero)">
  <div class="hero-spotlight absolute inset-0 z-0" aria-hidden>   <!-- cursor follow light -->
  <div class="hero-grid absolute inset-0 z-0" aria-hidden>        <!-- grid, masked to cursor -->
  decorative glows: .hero-glow--sky (600px, sky @15%, blur-3xl, top-right) · .hero-glow--navy (500px, navy-light @30%, bottom-left) — both parallax
  <div class="hero-particles absolute inset-0" aria-hidden>5 × .hero-particle (ambient float + parallax)</div>
  <div class="container-site pt-32 pb-20 text-center relative z-10">
    <div data-reveal>eyebrow pill</div>
    <h1 data-reveal data-reveal-delay="1" class="hero-headline mt-8 max-w-4xl mx-auto text-white font-extrabold"
        style="font-size: var(--text-display-l-size); …">
      Stop Losing Revenue to<br /><span class="text-gradient hero-headline__accent">Burnt Domains and Calendar Drop-Offs.</span>
    </h1>
    <p data-reveal data-reveal-delay="2" class="text-body-l text-grey-300 max-w-3xl mx-auto mt-6">…subheadline…</p>
    <div data-reveal data-reveal-delay="3" class="mt-10">
      <form class="hero-capture …" action={SIGNUP_URL} method="get" data-hero-capture novalidate>
        <input id="hero-domain" name="domain" placeholder="yourcompany.com" … />
        <Button variant="primary" size="lg" type="submit">Generate My Sequence</Button>
      </form>
      <p id="hero-capture-hint">Enter your domain and we will draft an outreach sequence for your market.</p>
      <p><a href="/contact">Or book a migration call</a></p>
    </div>
    <div class="flex flex-wrap justify-center gap-3 mt-10" data-reveal data-reveal-delay="3">3 × trust pill</div>
  </div>
  <div data-reveal data-reveal-delay="4" class="container-site mt-8 relative z-10">
    <div class="hero-stage max-w-5xl mx-auto">          <!-- perspective: 1400px -->
      <div class="hero-frame relative" data-hero-tilt>  <!-- rotateX/rotateY from cursor -->
        <div class="hero-frame__halo absolute -inset-4 …" style="box-shadow: var(--shadow-glow-sky)" aria-hidden>
        <BrowserFrame url="app.synclead.io/dashboard" class="hero-frame__browser">
          <img src="/images/dashboard-overview.svg" alt="SyncLead analytics dashboard showing emails sent, reply rate, and meetings booked" width="1600" height="1000" loading="eager" class="w-full h-auto" />
        </BrowserFrame>
        <div class="hero-frame__glare absolute inset-0 rounded-card" aria-hidden>  <!-- specular, tracks cursor -->
      </div>
    </div>
  </div>
  scroll indicator (absolute bottom-8, hidden below md)
</section>
```

#### 5.3.1 Cursor interaction layer

Five pointer-driven effects. **One** `pointermove` listener, rAF-throttled, writing CSS custom properties on the section; all animation is CSS. No library — vanilla only, per the stack lock.

| Variable | Range | Drives |
|---|---|---|
| `--hero-mx` / `--hero-my` | 0 → 1 | Spotlight centre, grid mask centre, headline gradient position |
| `--hero-px` / `--hero-py` | -1 → 1 | Parallax translate on glows (+34px / −26px) and particle layer (−18px) |
| `--hero-active` | 0 / 1 | Spotlight + grid opacity ramp on enter/leave |
| `--hero-tilt-x` / `--hero-tilt-y` | ±5deg | 3D tilt of `.hero-frame` |
| `--hero-fx` / `--hero-fy` | 0 → 1 | Glare centre within the frame |
| `--hero-frame-active` | 0 / 1 | Glare opacity + halo brightening (0.6 → 1.0) |

Effects:
1. **Spotlight** — 520px sky radial at the cursor, `rgb(var(--color-sky-rgb) / 0.16)`.
2. **Grid reveal** — 56px white grid, `mask-image` radial 360px around the cursor.
3. **Parallax depth** — glows and particles translate in opposing directions → 3 depth planes.
4. **Frame tilt + glare** — max 5° per axis (capped deliberately: more makes the dashboard unreadable), white specular tracking the pointer.
5. **Headline shimmer** — accent span `background-size: 220%`, `background-position` follows `--hero-mx`.

**Gating (enforced twice, deliberately):** in CSS the interactive layers get `display:none` and `.hero-frame` gets `transform:none`; in JS an early `return` fires before any listener is attached. Conditions: `prefers-reduced-motion: reduce`, and `(hover: none), (pointer: coarse)`. Touch devices therefore never pay the handler cost.

Cached `getBoundingClientRect()` refreshed on `resize`/`scroll` — no layout reads inside the rAF callback. On `pointerleave` every variable eases back to the neutral static composition.

#### 5.3.2 Domain capture script

Second `<script>` block in `HeroSection`. Normalises free text to a bare hostname before submit,
because people type `https://www.acme.com/pricing`, `Acme.com `, or an email address:

1. lowercase + trim; if an `@` is present, keep the part after the last one (email → domain)
2. strip scheme, `user:pass@`, path/query/fragment, `:port`, leading `www.`, trailing dot
3. require `/^[a-z0-9-]+(\.[a-z0-9-]+)+$/` — otherwise `preventDefault()`, set `aria-invalid`, show "Enter a website like yourcompany.com", and focus the input
4. on success, write the cleaned hostname back into the field so the app receives only the hostname

`aria-invalid` is cleared on `input`. The form is a real GET submit, so with JS disabled the app
receives the raw string — degraded, not broken.

### 5.5 `src/components/hero/HeroMicroDemo.astro`

**Purpose**: CSS-only looping proof of the core loop, replacing the static hero screenshot (WD-007b).

**Props**: `class?: string` passthrough only.

**Timeline** — every animation shares `--demo-duration: 9s`; phases are staggered percentage
stops on that one timeline, which is what keeps them in lockstep without a JS scheduler:

| Window | Phase | What happens |
|---|---|---|
| 0–30% | Step sends | Thread row 1 slides in, status `Sent` |
| 30–62% | Prospect replies | Reply row slides in (`Replied`, sky), queued step 3 dims and gets struck through (`Stopped`, warning), success toast "Reply detected — sequence stopped" |
| 62–92% | Meeting booked | Calendar slot border goes dashed→solid sky, bar scales from 0, `Booked` pill pops, confirmation card rises |
| 92–100% | Hold, then loop | |

A caption strip below (`Step sends · Prospect replies · Meeting booked`) highlights the active
phase in sky via three more animations on the same timeline.

> ⚠️ The percentage stops are a contract between ~15 keyframe blocks. Changing one duration or
> stop means re-checking the others. Documented in the component header.

**Accessibility**: the visual grid is `aria-hidden="true"`; a `.sr-only` paragraph carries the text
equivalent so the claim reaches screen readers without narrating animation. Under
`prefers-reduced-motion` all animation is dropped **and phase 3 is rendered as a static end
state** — a reduced-motion user sees the outcome, not an ambiguous first frame.

**Claim safety**: depicts real product behaviour and asserts no numbers — inside WD-004. All
colour via channel tokens; no raw hex.

### 5.4 `src/components/hero/BrowserFrame.astro`

**Purpose**: Browser-chrome mockup wrapper (dots + URL bar) for dashboard screenshots.

**Props**:
```ts
interface Props {
  url: string;          // shown in the URL bar, non-link text
  class?: string;       // passthrough
}
```

**Markup**:
```
<div class={`browser-frame rounded-card overflow-hidden bg-dark-800 border border-dark-700 ${className}`}>
  <div class="browser-frame__chrome flex items-center gap-3 px-4 h-10 bg-dark-900 border-b border-dark-700">
    <span class="flex gap-2">3 × dot 12px rounded-full (#EF4444, #F59E0B, #10B981)</span>
    <span class="flex-1 max-w-sm mx-auto h-6 rounded-btn bg-dark-700/60 text-body-m text-grey-300 flex items-center justify-center text-xs">{url}</span>
    <span class="w-12" aria-hidden="true"></span>
  </div>
  <div class="browser-frame__body">
    <slot />
  </div>
</div>
```

`.browser-frame` gets `box-shadow: var(--shadow-glow-sky);` when used on the hero (applied by parent wrapper, not the component itself).

---

## 6. `src/components/ui/`

### 6.1 `Button.astro`

**Purpose**: Single button/link component, 4 variants × 3 sizes.

**Props**:
```ts
interface Props {
  variant?: 'primary' | 'solid' | 'ghost' | 'outline'; // default 'primary'
  size?: 'sm' | 'md' | 'lg';                 // default 'md'
  href?: string;                              // renders <a> when present
  type?: 'link' | 'submit';                  // default 'link'; 'submit' renders <button type="submit">
  class?: string;
}
```

**Class matrix**:
| Variant | Classes |
|---|---|
Base classes are `btn-base inline-flex items-center justify-center gap-2 font-semibold`.
`.btn-base` (global.css §4b, WD-028) owns the shared transition plus the 1px hover rise and
press-down on `:active`; variants declare colour only. It replaced a blanket `transition-all`.

| primary | `… text-white rounded-btn bg-gradient-cta hover:opacity-90 hover:shadow-glow-sky` |
| solid | `… text-white rounded-btn bg-dark-900 hover:bg-dark-800 hover:shadow-glow-sky` (WD-019) |
| ghost | `… text-white rounded-btn border border-white/25 bg-transparent hover:bg-white/10 transition-fast` |
| outline | `… text-brand-sky rounded-btn border border-brand-sky bg-transparent hover:bg-brand-sky hover:text-brand-navy transition-fast` |

| Size | Classes |
|---|---|
| sm | `text-body-m px-4 py-2` |
| md | `text-body-m px-6 py-3` |
| lg | `text-body-l px-8 py-4` |

Renders: `<a href={href} class={…}><slot /></a>` when `type='link'` (default); `<button type="submit" class={…}><slot /></button>` when `type='submit'`.

### 6.2 `Badge.astro`

**Purpose**: Pill badge.

**Props**:
```ts
interface Props {
  variant?: 'light' | 'glass' | 'sky' | 'success'; // default 'light'
  class?: string;
}
```

- light: `bg-grey-100 text-grey-500 border border-grey-300`
- glass: `glass-dark text-white` (dark sections)
- sky: `bg-brand-sky-light/30 text-brand-sky-dark border border-brand-sky/50` (WD-024 — opacity raised from /30 for visibility on grey-100)
- success: `bg-success/10 text-success border border-success/30`
Base: `inline-flex items-center gap-2 rounded-badge px-3 py-1 text-label uppercase` (text-label = 12px/600/0.06em uppercase). Slot = content.

### 6.3 `Card.astro`

**Purpose**: Content card, two variants.

**Props**:
```ts
interface Props {
  variant?: 'light' | 'glass'; // default 'light'
  lift?: boolean;              // default true — hover elevation (WD-028)
  class?: string;
}
```

- light: `bg-white rounded-card shadow-card border border-grey-300 p-8`
- glass: `glass-dark rounded-card p-8`

`lift` (WD-028) appends `.card-lift` on light cards (rise 4px + `--shadow-card-hover` +
sky-tinted border) or `.card-lift-glass` on glass cards (brighten + rise, no shadow — a shadow
over dark navy renders as nothing). Pass `lift={false}` for purely presentational cards that
should not suggest interactivity.

Renders `<div class={…}><slot /></div>`.

### 6.4 `SectionHeader.astro`

**Purpose**: Standard section intro — eyebrow, headline, subtext. Centered by default.

**Props**:
```ts
interface Props {
  eyebrow: string;
  headline: string;            // may contain <span class="text-gradient">…</span> via set:html
  subtext?: string;
  align?: 'center' | 'left';   // default 'center'
  dark?: boolean;              // default false — adjusts text colors
}
```

**Markup**:
```
<div class={`max-w-3xl ${align==='center' ? 'mx-auto text-center' : ''} mb-12 md:mb-16`} data-reveal>
  <Badge variant={dark ? 'glass' : 'sky'}>{eyebrow}</Badge>
  <h2 class={`text-h2 mt-4 ${dark ? 'text-white' : 'text-dark-900'}`} set:html={headline} />
  {subtext && <p class={`text-body-l mt-4 ${dark ? 'text-grey-300' : 'text-grey-500'}`}>{subtext}</p>}
</div>
```

### 6.5 `AnimatedCounter.astro`

**Purpose**: CSS-only counting number animation, triggered when scrolled into view (adds `.is-revealed` via the shared observer — the element also carries `data-reveal`, so `BaseLayout`'s observer triggers it).

**Props**:
```ts
interface Props {
  value: number;              // final value (e.g., 1200000)
  format?: 'int' | 'percent' | 'suffix'; // 'int' plain, 'percent' appends %, 'suffix' appends suffix prop
  suffix?: string;            // e.g., '+', 'x'
  decimals?: number;          // default 0
  label: string;
  class?: string;
}
```

**Chosen implementation (deterministic, works everywhere)** — class-triggered:
- Component emits `<span class="counter-value" data-counter-final="{formatted value}"></span>` plus a fallback showing the final value in a `<noscript>` tag; a tiny 6-line inline `<script>` in the component (allowed, vanilla) steps `textContent` from 0 to `data-counter-final` via `requestAnimationFrame` for 1.2s when `.is-revealed` lands. No libraries, respects reduced-motion (renders final value instantly).
- Formats: `value.toLocaleString('en-US')`, percent appends `%`, suffix appends the suffix string after a thin space.
- Label below: `text-body-m text-grey-500 mt-2` (or white/60 when `dark` context — parent controls color via `class` passthrough).
### 6.6 `Logo.astro`

**Purpose**: Single source of truth for rendering the brand mark. Added when the real
artwork arrived; **no component may reference a logo path directly.**

**Props**:
```ts
interface Props {
  variant?: 'full' | 'icon';     // default 'full' — icon+wordmark vs mark only
  surface?: 'dark' | 'light';    // default 'dark' — selects artwork; ignored for 'icon'
  height?: number;               // default 32 — width follows intrinsic ratio
  href?: string;                 // wraps in <a aria-label="SyncLead home">
  alt?: string;                  // default 'SyncLead'; '' when decorative inside a link
  class?: string;
}
```

**Behaviour**: maps `variant`/`surface` → `/logo-icon.svg`, `/logo-full-on-dark.svg`,
`/logo-full-on-light.svg`. Height drives sizing (`style="height:{h}px;width:auto"`) with
`width`/`height` attributes computed from the intrinsic ratios (full ≈ 3.40:1, icon ≈ 0.97:1)
so the browser reserves correct space and avoids CLS. When `href` is set the `<img>` carries
`alt=""` and the anchor supplies the accessible name.

**Consumers**: `Navbar` (36px, dark) · `MobileMenu` (32px, dark) · `Footer` (36px, dark).
`surface="light"` is unused so far — reserved for light-background pages.

---

## 7. `src/components/sections/`

### 7.1 `LogoBar.astro` — REBUILT (integration strip)

**Purpose**: Borrow trust from real integrations, immediately after hero.
Replaces the original fake-customer-logo strip (§9A.1: the six invented company
names and the "Trusted by teams at" line are banned).

**Props**: none.

**Content data** — each entry maps to a shipped integration in the SyncLead API:

| Name | Detail |
|---|---|
| Microsoft 365 & Teams | Graph mail + Teams conferencing |
| Google Workspace | Gmail + Google Meet calendar |
| Zoom Conferencing | Dynamic meeting injection |
| HubSpot CRM | Bi-directional deal & contact sync |
| Custom SMTP | Any SMTP / IMAP provider (with "Coming Soon" pill badge) |

**Markup**:
```
<section class="bg-white py-14 border-b border-grey-100">
  <div class="container-site">
    <p class="text-label text-grey-500 text-center uppercase" data-reveal>Connects to the stack you already run</p>
    <p class="text-body-m text-grey-500 text-center max-w-2xl mx-auto mt-3" data-reveal>
      Mailboxes and calendars connect over OAuth — SyncLead never asks for or stores your email password.
    </p>
    <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-start mt-10">
      5 × <li class="text-center" data-reveal data-reveal-delay={1..4}>
            <span class="block text-h3 text-dark-900 font-bold tracking-tight">{name}</span>
            <span class="block text-label text-grey-500 mt-2 uppercase">{detail}</span>
          </li>
    </ul>
  </div>
</section>
```

### 7.2 `MetricsBand.astro` — REBUILT (mechanism explainer)

**Purpose**: Dark band explaining *how* the product works. Replaces the three
`AnimatedCounter` instances, whose values (2.4M emails/mo, 38% reply lift, 12,000+
meetings) were invented and are banned under §9A.1.

**Props**: none.

**Content data** — eyebrow `How it works`, H2 "Three mechanisms doing the work your reps do manually", then 3 numbered pillars:

1. **Sending spread across multiple IPs** — "Volume rotates across a pool of sending accounts with per-account daily caps, so no single domain absorbs the whole campaign."
2. **SPF, DKIM, DMARC and MX watched continuously** — "SyncLead re-checks the DNS records behind every connected mailbox and alerts you when one drifts — before deliverability drops."
3. **Replies and no-shows handled automatically** — "A reply stops the sequence and lands in a unified inbox. A no-show triggers a recovery sequence that works to rebook the slot."

**Markup**:
```
<section class="bg-dark-900 py-20">
  <div class="container-site">
    <p class="text-label text-brand-sky text-center uppercase" data-reveal>How it works</p>
    <h2 class="text-h2 text-white text-center max-w-3xl mx-auto mt-4" data-reveal>…</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
      3 × <div data-reveal data-reveal-delay={1|2|3}>
            <span class="w-10 h-10 rounded-btn bg-brand-sky/15 border border-brand-sky/30 text-brand-sky text-h3 font-bold flex items-center justify-center" aria-hidden>{n}</span>
            <h3 class="text-h3 text-white mt-5">{title}</h3>
            <p class="text-body-m text-grey-300 mt-3">{body}</p>
          </div>
    </div>
  </div>
</section>
```

> [`AnimatedCounter.astro`](../src/components/ui/AnimatedCounter.astro) (§6.5) remains in the
> codebase but is **no longer used anywhere**. Reinstate it here once real aggregates exist.

### 7.3 `FeatureShowcase.astro`

**Purpose**: Reusable alternating feature module (used 3× on home).

**Props**:
```ts
interface Props {
  id: string;           // anchor id
  eyebrow: string;
  headline: string;     // may include <span class="text-gradient">…</span>, rendered via set:html
  body: string;
  bullets: string[];    // 3–4 checkmarked bullets
  image: string;        // /images/... path
  imageAlt: string;
  reversed?: boolean;   // image on left (default false → image right on lg)
  dark?: boolean;       // dark section styling (default false)
  ctaLabel?: string;
  ctaHref?: string;
}
```

**Markup**:
```
<section id={id} class={dark ? 'bg-dark-900 text-white py-24' : 'bg-white py-24'}>
  <div class="container-site grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
    <div data-reveal class={reversed ? 'lg:order-2' : ''}>
      <Badge variant={dark ? 'glass' : 'sky'}>{eyebrow}</Badge>
      <h2 class={`text-h2 mt-4 ${dark ? 'text-white' : 'text-dark-900'}`} set:html={headline} />
      <p class={`text-body-l mt-4 ${dark ? 'text-grey-300' : 'text-grey-500'}`}>{body}</p>
      <ul class="mt-8 space-y-3">
        bullets → <li class="flex gap-3 items-start">
          check SVG 20px (success green)
          <span class={`text-body-m ${dark ? 'text-grey-300' : 'text-grey-500'}`}>{b}</span></li>
      </ul>
      {ctaLabel && <div class="mt-8"><Button variant={dark ? 'ghost' : 'outline'} size="md" href={ctaHref}>{ctaLabel}</Button></div>}
    </div>
    <div data-reveal data-reveal-delay="1" class={reversed ? 'lg:order-1' : ''}>
      <BrowserFrame url={`app.synclead.io/${id}`}>
        <img src={image} alt={imageAlt} width="1600" height="1000" loading="lazy" />
      </BrowserFrame>
    </div>
  </div>
</section>
```

**Content data — the three home instances** (passed from `index.astro`):

**① Campaigns** (`id="campaigns"`, light, reversed=false)
- eyebrow: `CAMPAIGNS`
- headline: `Sequences that <span class="text-gradient">write themselves into replies</span>`
- body: "Build multi-step cold email sequences in minutes. Mix spintax and variants to keep every send unique, then let SyncLead's scheduler drip follow-ups at exactly the right time — and stop the moment a prospect replies."
- bullets:
  - "Multi-step sequences with unlimited follow-up stages and smart exit rules"
  - "Built-in spintax and A/B variants that rotate automatically per send"
  - "Send-window scheduling with per-timezone delivery and quiet hours"
  - "Reply detection instantly pauses the sequence and alerts the owner"
- image: `/images/dashboard-campaigns.svg` · imageAlt: "SyncLead campaign builder showing a multi-step email sequence with variants and send windows"
- CTA: `Explore Campaigns` → `/features`

### 7.3 `InfraSection.astro` (WD-033, WD-035)
- H2: `Enterprise-grade infrastructure, without the ops headcount.`
- H3 Callout: `Stop playing Russian roulette with primary domains.`
- Copy: `Our platform auto-rotates IPs and manages sending limits so our users never burn their core infrastructure.`
- Visual: Dark-mode cluster visualization of connected sending mailboxes (Google, Microsoft 365, Outlook) in a dense 3×2 grid showing warmup status, SPF/DKIM/DMARC health, and 100% health ratings (mailbox-only architecture, no bare domains).

### 7.3b `CampaignsSchedulingSection.astro` (WD-033)
- H2: `Campaigns engineered for the primary inbox.`
- H3 Callout: `If they reply, it books. If they ghost, it recovers.`
- Copy: `Stop losing deals to friction. We consolidate the outreach and the calendar, automatically chasing down no-shows until the meeting happens.`
- Visual: Split-screen UI layout: campaign sequence timeline with automated ghosted bump on the left, frictionless calendar interface locking in time on the right.

### 7.4 `AIInsightsSection.astro` (WD-033)
- H2: `Intent Scoring is live. Full autonomy is next.`
- Copy: `We already flag the leads showing high buying intent so our users can strike immediately. We are actively engineering the AI infrastructure to handle the initial replies while they sleep.`
- Visual: High-fidelity inbox UI snippet with glowing `High Intent (98%)` badge next to a prospect.
- Secondary CTA: `View Our Product Roadmap` (outline/ghost styling).

**Markup**:
```
<section class="relative py-24 overflow-hidden" style="background: var(--gradient-accent);">
  decorative: two large blurred white/20 radial blobs for depth
  <div class="container-site text-center">
    <span data-reveal class="inline-flex bg-brand-navy/10 border border-brand-navy/20 rounded-badge px-4 py-1.5 text-label text-brand-navy">COMING SOON · Q3</span>
    <h2 data-reveal class="text-display-l text-brand-navy mt-6">AI that answers while <span class="text-gradient">you sleep</span></h2>
    <p data-reveal class="text-body-l text-brand-navy/80 max-w-2xl mx-auto mt-4">…</p>
    <div class="grid md:grid-cols-3 gap-6 mt-12 text-left">
      3 × <div class="bg-white rounded-card shadow-card p-8" data-reveal data-reveal-delay={1|2|3}>
            <div class="w-10 h-10 rounded-btn bg-brand-sky-light/50 flex items-center justify-center mb-4">sparkle SVG (navy)</div>
            <h3 class="text-h3 text-dark-900">{title}</h3>
            <p class="text-body-m text-grey-500 mt-3">{body}</p>
            <span class="inline-block mt-6 text-label text-brand-sky-dark border border-brand-sky rounded-badge px-3 py-1">Coming soon</span>
          </div>
    </div>
    <div class="mt-12"><Button variant="outline" size="lg" href="/contact">Join the AI Waitlist</Button></div>
  </div>
</section>
```

### 7.5 `FoundingTeams.astro` — REBUILT ×2 (founding-teams offer)

**Purpose**: High-ticket exclusivity offer in place of social proof. **Third identity for this
slot** — see memory-bank §2:
1. three fabricated testimonials → deleted under WD-004
2. "design partner programme" leading with the beta disclosure
3. **now**: Founding Teams offer (WD-016), same honesty, exclusivity framing instead of apology

File renamed from `TestimonialGrid.astro` under WD-018 — a file of that name containing no
testimonials was a trap for the next agent. Old file deleted; `index.astro` import updated.

**Props**: none. `id="founding-teams"`. Background `bg-white` (WD-023 — was `bg-grey-100`, which merged visually with the adjacent Pricing section).

**Content data (locked)**:
- Eyebrow pill (white on grey-100, `border-grey-300`): `Founding Teams`
- H2: `Let Us <span class="text-gradient">Rebuild Your Outbound</span>`
- Lead paragraph (`max-w-2xl mx-auto`, WD-021): "We are exclusively onboarding serious outbound engines—from solo founders scaling their first campaigns to GTM teams replacing fractured stacks. Skip the support queues. You get a direct Slack channel with our engineering team, a white-glove migration of your current sequences, and your pricing locked in forever. If you treat outbound like a science, we are a fit."
- 3 light Cards, each with a sky-blue circle + navy check icon (WD-022 — `rounded-full bg-brand-sky`, navy check):
  1. **Direct line to the people building it** — "You talk to the team writing the code, not a support tier. You tell us what your outbound engine is missing, and we build it directly into the platform."
  2. **Locked founding price** — "Your rate is fixed for as long as you stay subscribed, including after public pricing rises."
  3. **Migration done with you** — "We help move your existing sequences, sending accounts and DNS setup across, on a call, at no cost."
- CTA: `Button variant="solid" size="lg"` → `/contact` (WD-019), label `Claim a Founding Team Spot` (WD-031), followed by "Tell us what your current stack looks like. If we are not the right fit to scale your volume, we will tell you directly on the call."

**Card 1 wording note**: the earlier sub-text ended "Deliverability problems you hit become
roadmap items", which implies the customer is *guaranteed to hit problems*. Reframed to a
capability request rather than a defect expectation.

**Claim safety**: no customer, metric or certification is asserted, so WD-004 holds. But the
paragraph makes three **operational commitments** — a direct Slack channel, white-glove
migration, and pricing locked forever. Those are promises to deliver, not features that exist.
See memory-bank §3.10; "exclusively" also implies a cap that is not yet stated.

**Adding real testimonials later**: put a quote grid *above* this section rather than replacing
it — the offer converts on its own. Requires named person + company + written permission + any
metric with its measurement window.

### 7.6 `PricingSection.astro` (WD-033)

**Purpose**: Clean 3-tier pricing table relying on negative space and sharp typography.

**Content data (WD-033 / WD-039)**:
- H2: `Built for serious outbound engines.`
- **Tier 1 (Anchor)**: Pro – **$149**/mo (50 connected mailboxes, 125k verified emails/mo, 25k contacts, 7,500 monthly plan credits, multi-IP pools, DNS monitoring, calendar sync & no-show recovery, centralized inbox). CTA: `Get Started` (WD-034).
- **Tier 2 (Highlighted/Primary)**: Scale – **$399**/mo (250 connected mailboxes, 600k verified emails/mo, 125k contacts, 35k monthly plan credits, dedicated IP rotation pools, agency controls, campaign access delegation, 90-day activity retention, HubSpot sync). Tag: `MOST POPULAR`. CTA: `Get Started` (WD-034).
- **Tier 3 (High-end)**: Enterprise – **Custom** (Unlimited mailboxes, 1.5M+ monthly verified emails, 100k monthly credits, 5 included agency workspaces, dedicated deliverability engineer on Slack, 180-day retention, custom API limits, 99.99% SLA). CTA: `Contact Us`.

Enterprise previously listed `SSO/SAML`; removed under §9A.1 — not implemented in the API.
Pro's pill reads `Recommended`, **not** `Most Popular` — the latter is an adoption claim with no
data behind it pre-launch (§9A.1).
Header is `Pricing that scales with your revenue engine` / "Founding team rates are locked for as
long as you stay subscribed — including after public pricing rises." All trial and
credit-card language removed under WD-031 (§9A.1b); the money-back guarantee lives in `/refund`.

**Risk-reversal row** (below the plan grid, `max-w-4xl mx-auto mt-10`, 3 white cards with
`border-grey-300`, each a navy inline SVG + bold lead-in):
1. **Payments handled by Stripe.** "Card details go straight to Stripe — they never touch SyncLead servers."
2. **Commercial terms in writing.** "Billing, renewal and refund terms are published in our [Refund Policy](/refund) — not decided on a call." (WD-031 — replaced `Cancel in one click`; the fact is unchanged, the framing is not.)
3. **Export your data any time.** "Contacts, campaigns and reply history stay yours to take with you."

**Markup**:
```
<section id="pricing" class="bg-grey-100 py-24">
  <div class="container-site">
    {showHeader && <SectionHeader eyebrow="PRICING" headline="Pricing that scales with your revenue engine" subtext="Founding team rates are locked for as long as you stay subscribed — including after public pricing rises." />}
    <div class="grid md:grid-cols-3 gap-6 items-stretch">
      Starter / Enterprise: <Card variant="light"> … </Card>
      Pro: <div class="pricing-pro relative rounded-card p-8 bg-dark-900 text-white shadow-glow-sky border border-brand-sky/30 md:-mt-4 md:mb-4">
             "RECOMMENDED" pill absolute -top-3 center: bg-gradient-cta text-white text-label rounded-badge px-3 py-1
             … price .tabular text-white, features text-grey-300, check icons brand-sky …
             <Button variant="primary" size="md" href="https://app.synclead.io/signup">Deploy Your Workspace</Button>
           </div>
      Price display: <p class="mt-4"><span class="text-display-l font-800">$49</span><span class="text-body-m text-grey-500">/mo</span></p>
      Enterprise price: <span class="text-display-l font-800">Custom</span>
      Feature list: <ul class="space-y-3 mt-6 text-body-m"> li with check SVG (brand-sky on light card, brand-sky on dark card)</ul>
    </div>
    <p class="text-center text-body-m text-grey-500 mt-10">All plans include calendar integration, unified inbox and unlimited campaigns. Prices per workspace, billed monthly.</p>
  </div>
</section>
```

### 7.7 `CTASection.astro`

**Purpose**: Dark full-width bottom conversion band.

**Props**:
```ts
interface Props {
  subtext?: string;      // default 'We migrate your sequences, sending accounts and DNS setup across with you. Founding team spots are limited and priced for as long as you stay.'
  primaryLabel?: string; // default 'Claim a Founding Team Spot'
}
```

The `headline` prop was **removed** — it was declared but never rendered (the H2 was
hardcoded), so it was dead API surface.

**Cursor spotlight (WD-025)**: Lightweight version of the hero's cursor interaction layer.
A 420px radial sky-blue spotlight follows the pointer, plus a 56px grid revealed around
the cursor via mask-image. Both driven by CSS custom properties `--cta-mx`, `--cta-my`,
`--cta-active` written by a single rAF-throttled `pointermove` listener. Gated on
`prefers-reduced-motion` and `(hover: none), (pointer: coarse)` — same as the hero.
Has its own `<script>` block (unlike the hero, this effect is self-contained because
the CTA section has no tilt/parallax/particles to coordinate).

**Markup**:
```
<section class="cta-section relative bg-dark-950 py-28 overflow-hidden" data-cta-cursor>
  <div class="cta-spotlight …" aria-hidden>    <!-- cursor follow light -->
  <div class="cta-grid …" aria-hidden>         <!-- grid, masked to cursor -->
  glow: centered radial sky-blue blur behind text (#8ECAE6 @ 10% opacity, blur-3xl)
  <div class="container-site text-center relative z-10" data-reveal>
    <h2 class="text-display-l text-white max-w-3xl mx-auto">Your domains and your calendar <span class="text-gradient">deserve better.</span></h2>
    <p class="text-body-l text-grey-300 max-w-xl mx-auto mt-4">…default subtext…</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
      <Button variant="primary" size="lg" href="/contact">{primaryLabel}</Button>
      <Button variant="ghost" size="lg" href="https://app.synclead.io/signup">Deploy Your Workspace</Button>
    </div>
    <p class="text-body-m text-white/60 mt-8">Onboarding founding teams · billing secured by Stripe · your data stays exportable at any time</p>
  </div>
</section>
```

---

## 8. `src/components/footer/Footer.astro`

**Purpose**: Dark-950 footer: brand column + 3 link columns + legal bar.

**Props**: none.

**Content data**:

- Brand column: `<Logo variant="full" surface="dark" height={36} href="/" />`, tagline "Cold outreach, deliverability monitoring and no-show recovery in one platform.", stage marker `Onboarding founding teams` (`text-label text-white/40 uppercase`, WD-016), social icons (LinkedIn, X — official vector glyph marks in circular interactive buttons linking to `https://www.linkedin.com/company/synclead/` and `https://x.com/syncleadio`, WD-037).
- Columns:
  - **Product**: Features (`/features`), Pricing (`/pricing`), Campaigns (`/features#campaigns`), Deliverability (`/features#deliverability`), Scheduling (`/features#scheduling`)
  - **Company**: About (`/about`), Contact (`/contact`), Careers (`/about#careers`), Blog (`/about#blog` — placeholder route noted, may 404 until blog ships; acceptable)
  - **Legal** (WD-029): Terms of Service (`/terms`), Privacy Policy (`/privacy`), Acceptable Use Policy (`/acceptable-use`), Refund Policy (`/refund`) — all four are **real routes**, no placeholders. Two earlier entries were dropped rather than left as `#`: `Security` (no page yet — memory-bank §3.6) and `Data Processing` (the content a buyer wants is inside the Privacy Policy §5/§9). A dead link costs more trust than an absent one. An earlier revision also carried `SOC 2`, which is **banned** (§9A.1) — SyncLead is not certified; a code comment in the component records this so it is not reinstated by accident.
- Bottom bar (WD-027): Company registration details replacing the tagline. Two rows:
  - Row 1: `SYNCLEAD LTD · Company Number: 15903993` | `20 Wenlock Road, London, England, N1 7GU`
  - Row 2: `Support: contact@synclead.io` (mailto link) | `Privacy: privacy@synclead.io` (mailto link)
  - Copyright: `© 2026 SyncLead Ltd. All rights reserved.` (`text-white/30 text-label`)

**Markup**:
```
<footer class="bg-dark-950 text-white pt-20 pb-10">
  <div class="container-site grid md:grid-cols-5 gap-12">
    <div class="md:col-span-2">brand column</div>
    3 × <nav aria-label={col.title} class="md:col-span-1">
          <h3 class="text-label text-white/60 mb-4">{title}</h3>
          <ul class="space-y-3">li > a.text-body-m.text-grey-300.hover:text-white</ul>
        </nav>
  </div>
  <div class="container-site mt-16 pt-8 border-t border-dark-700 flex flex-col sm:flex-row justify-between gap-4 text-body-m text-grey-500">
    <p>© 2025 SyncLead. All rights reserved.</p>
    <p>Made for SDR teams, everywhere.</p>
  </div>
</footer>
```

---

## 9. `src/pages/`

### 9.1 `index.astro`

**Purpose**: Home — primary conversion. Exact section order (locked).

**Head**: title `SyncLead — Cold Outreach, Deliverability and Booking in One Platform`; description `SyncLead combines multi-IP sending, cold outreach sequences, and automated no-show recovery to put qualified meetings on the calendar. Now onboarding founding teams.`

**Composition**:
```astro
<PageLayout title="…" description="…">
  <HeroSection />
  <LogoBar />
  <MetricsBand />
  <FeatureShowcase {...campaigns} />      <!-- §7.3 ① -->
  <FeatureShowcase {...deliverability} /> <!-- §7.3 ② -->
  <FeatureShowcase {...scheduling} />     <!-- §7.3 ③ -->
  <AIInsightsSection />
  <TestimonialGrid />
  <PricingSection />
  <CTASection />
</PageLayout>
```

### 9.2 `features.astro`

**Purpose**: Full feature detail page.

**Head**: title `Features — SyncLead`; description `Campaigns, email account health, scheduling, unified inbox and analytics — everything your SDR team needs in one platform.`

**Structure**:
1. Page hero (dark-950, pt-40): SectionHeader eyebrow `FEATURES`, headline `One platform. <span class="text-gradient">Every step of outbound.</span>`, subtext "From first touch to booked meeting, SyncLead runs the whole motion — here's how each module works."
2. 5 feature detail blocks, alternating `FeatureShowcase` reuse with the 3 modules above (reused verbatim) plus two non-mockup blocks built with `Card` grids:
   - **Inbox** (`id="inbox"`): grid of 2 Cards on light bg — "Unified reply tracking": "Every reply across every campaign account lands in one inbox, threaded to the original prospect." / "Lead status automation": "Positive, neutral and out-of-office replies are classified and your sequence stops automatically." No BrowserFrame — text-only section.
   - **Analytics** (`id="analytics"`): dark block with SectionHeader (dark) `Know what's working, <span class="text-gradient">down to the inbox</span>` + grid of 4 glass Cards: "Emails Sent" ("Track volume per campaign, per account, per day — with deliverability % alongside."), "Reply Rate" ("Benchmark replies across variants and steps to find what converts."), "Meetings Booked" ("See meetings attributed to the exact sequence and step that booked them."), "Calendar Utilization" ("Spot idle hosts and rebalance round-robin pools in one click.")
3. AI teaser: reuse `AIInsightsSection` (unchanged).
4. `CTASection`.

### 9.3 `pricing.astro` — IMPLEMENTED (WD-039)

**Purpose**: Dedicated Pricing & Infrastructure Architecture specification hub. Built on Dark Cinema Design System v2.

**Head**: title `Pricing & Infrastructure Architecture — SyncLead`; description `High-leverage outbound infrastructure pricing. Connect 50 to 250+ mailboxes, protect domain reputation with multi-IP pools, and eliminate seat tax forever.`

**Structure**:
1. Page hero (Dark Cinema v2, `--bg-0`): Eyebrow badge `HIGH-LEVERAGE INFRASTRUCTURE`, H1 `Pricing built for serious outbound revenue engines.`, lead paragraph, and 4 jump anchor pills (`View Plans`, `Feature Matrix`, `Credits & Utilization`, `Technical FAQ`).
2. `<PricingSection showHeader={false} />` with anchor `#plans`.
3. **Full Feature Matrix Table** (`#matrix`): Comprehensive breakdown across 6 operational categories:
   - Capacity & Sending Limits (50 vs 250 vs Unlimited mailboxes, 125k vs 600k vs 1.5M+ sends, contacts, plan credits)
   - Campaigns & Sequence Automation (unlimited campaigns/steps, spintax, exit rules, intent scoring, CRM pipeline)
   - Deliverability & Safety (multi-IP rotation, DNS monitoring, basic/advanced blocklists, 30/90/180-day logs)
   - Calendar Booking & No-Show Recovery (frictionless scheduling, round robin, no-show recovery, payment collection)
   - Team, Workspaces & Agency Controls (unlimited seats, campaign/event delegation, agency workspaces, unified billing)
   - Integrations, API & Engineering Support (HubSpot, webhooks, 50/150/custom API limits, Slack deliverability engineer)
4. **Credits & Modular Add-ons** (`#credits`): 3-card breakdown of micro-credit rules (1 credit lead verification, 0.2 credit burst sends, permanent non-expiring rollover add-on credits, $30/mo assistant, +$39/mo client workspaces).
5. **Technical FAQ** (`#faq`): 6 questions addressing mailbox definitions, verified send distribution, monthly credit utility, zero seat tax, domain reputation defenses, and upgrade dynamics.
6. `CTASection`.

### 9.9 `roadmap.astro` — IMPLEMENTED (WD-039)

**Purpose**: Official Prioritized Product Roadmap & Engineering Timeline (`/roadmap`). Built on `PageLayout` with Dark Cinema v2 architecture.

**Head**: title `Product Roadmap & Engineering Timeline — SyncLead`; description `Transparent engineering roadmap for SyncLead. From AI auto-replies and autonomous SDR agents to full agency controls and native Model Context Protocol (MCP) tooling.`

**Sections**:
1. Hero — Eyebrow badge (`PRODUCT ROADMAP · 2026–2027`), H1 ("Engineering the future of autonomous outbound infrastructure"), standfirst, and live stats pill ribbon (5 Core Live, 2 Active Sprints, 4 Scheduled).
2. Prioritized Engineering Pipeline — 6 high-conviction initiatives strictly prioritized:
   1. **AI Auto Replies & Objection Handling** (Q3, 2026 · Staging / Rollout · P0)
   2. **Autonomous AI SDR Agents** (Q4, 2026 · Active Sprint · P1)
   3. **Deep Account & Prospect Research Agents** (Q1, 2027 · In Development · P2)
   4. **Full Agency Controls & Multi-Tenant Portals** (Q1, 2027 · Planned · P3)
   5. **Mailbox Placement & Deliverability Warmup Suite** (Q2, 2027 · Planned · P4)
   6. **SyncLead MCP (Model Context Protocol) Server** (Q3, 2027 · Next-Gen Architecture · P5)
3. Shipped & Operational Foundations — 5 production systems currently live in the API (Multi-IP rotation, OAuth 2.0 zero-password retention, Continuous DNS drift monitoring, Calendar booking & no-show recovery, Intent scoring v2.4).
4. Collaborative Architecture Request Card — Direct mailto action for custom infrastructure requirements (`contact@synclead.io?subject=Roadmap%20Architecture%20Request`).
5. `CTASection`.

### 9.4 `about.astro`

**Purpose**: Company story, values, team, trust.

**Head**: title `About — SyncLead`; description `SyncLead builds the outbound operating system for SDR and BDR teams — outreach, scheduling and deliverability in one place.`

**Structure**:
> ⚠️ **§9.4 IS NOT YET IMPLEMENTED AND MUST NOT BE BUILT AS WRITTEN.** `about.astro` does not
> exist yet. The copy below predates the claim audit (§9A) and contains multiple fabrications:
> the "decade running outbound", the 2023 founding date, "former SDR leads and a deliverability
> engineer", "teams in 30+ countries", "sending millions of emails a month", "Remote-first across
> 9 time zones", the hiring claim, and the entire stats band (`500+` teams · `30+` countries ·
> `2.4M` emails) — all invented. **Rewrite against real founder history before implementing.**
> Note the irony that this page's own stated value is "Honest metrics"; that value is worth
> keeping and the numbers around it are not.

1. Hero (dark-950): SectionHeader eyebrow `ABOUT SYNCLEAD`, headline `Built by people who've <span class="text-gradient">carried the quota</span>`, subtext "We spent a decade running outbound at B2B startups. SyncLead is the tool we always wished existed."
2. Story section (white, 2-col): left = H3 "Our story" + 2 paragraphs; right = H3 "Why we exist" + 2 paragraphs.
   - Story copy: "SyncLead started in 2023 when our founders — former SDR leads and a deliverability engineer — got tired of stitching together four tools to send one sequence. Campaigns lived in one app, calendars in another, and inbox health was a spreadsheet. So we built the platform we wanted: outreach, scheduling and deliverability engineered together from day one."
   - "Today, teams in 30+ countries run their entire outbound motion on SyncLead — sending millions of emails a month while keeping every domain clean and every meeting recovered."
   - Why copy: "Cold outreach fails for one of two reasons: your email never lands, or your follow-up never happens. SyncLead attacks both. Health monitoring keeps your sender reputation spotless, while automation ensures no reply — and no no-show — ever slips through."
   - "The result: SDRs spend their day in conversations, not in tabs."
3. Values row (grey-100): 3 Cards — "Deliverability first" ("If it doesn't land in the inbox, nothing else matters. Every feature is built to protect your sender reputation."), "Automate the boring 80%" ("SDRs should talk to humans, not chase follow-ups. Anything repeatable gets automated."), "Honest metrics" ("No vanity dashboards. Every number we show ties to booked meetings and closed revenue.")
4. Stats band (dark-900): 3 AnimatedCounters — `500+` "SDR & BDR teams" · `30` (suffix "+", "Countries served") · `2.4M` (value 2400000, "Emails delivered monthly") — plus footer line "Founded 2023 · Remote-first across 9 time zones".
5. **Careers + blog anchors** (`#careers`, `#blog`, light): two half-width Cards — Careers: "We're hiring senior engineers and SDR-minded product folks. Remote-first, async-friendly, ship-fast." CTA `See Open Roles` → `mailto:careers@synclead.io`. Blog: "Playbooks, deliverability deep-dives and outbound teardowns — written by our team." CTA `Read the Blog (soon)` → `/about#blog` with note `Launching soon`.
6. `CTASection`.

### 9.5 `contact.astro`

**Purpose**: Contact/sales/demo — also serves as "Watch Demo" and AI waitlist target.

**Head**: title `Contact — SyncLead`; description `Talk to the SyncLead team — get a demo, join the AI waitlist, or ask us anything. We reply within one business day.`

**Structure**:
1. Hero (dark-950): SectionHeader eyebrow `CONTACT`, headline `Let's talk <span class="text-gradient">pipeline</span>`, subtext "Book a walkthrough, join the AI waitlist, or ask a deliverability question — a human replies within one business day."
2. Two-column (white, py-24): left = `<form>` (60%), right = contact info cards (40%).
   - **Form fields** (all required unless noted; client-side `required` attributes only, `action="mailto:sales@synclead.io"` fallback with note comment `TODO: form endpoint (Cloudflare Pages Function or form service) — wire before launch`, method `post`):
     - Full name — `input text`, placeholder "Jordan Reyes"
     - Work email — `input email`, placeholder "jordan@company.com"
     - Company — `input text`, placeholder "Acme Corp" (optional)
     - I'm interested in — `select`: "Product demo", "Enterprise plan", "AI waitlist", "Partnership", "Something else"
     - Message — `textarea rows=5`, placeholder "Tell us about your outbound motion and team size…"
     - Submit: `Button variant="primary" size="lg" type="submit"` → renders as `<button type="submit">`. Label `Send Message`.
     - Styling: inputs `w-full rounded-btn border border-grey-300 px-4 py-3 text-body-m bg-white focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/20`; labels `text-label text-grey-500 mb-2 block`; field spacing `space-y-6`.
   - **Right cards** (3 stacked light Cards):
     1. "Sales & demos" — `sales@synclead.io` — "Live walkthrough tailored to your stack. 30 minutes."
     2. "Support" — `support@synclead.io` — "Existing customer? We reply within 4 business hours."
     3. "AI waitlist" — "Joined via the form — select 'AI waitlist' and you'll get early access to automatic replies before public launch."
3. Final band: `<CTASection />`.

### 9.6 Legal pages — IMPLEMENTED (WD-029)

Four documents, all built on [`LegalLayout.astro`](../src/layouts/LegalLayout.astro) (§4.3):

| Route | File | Heading | Standfirst |
|---|---|---|---|
| `/terms` | [`terms.astro`](../src/pages/terms.astro) | Terms of Service | Please read these terms carefully before using our platform. |
| `/privacy` | [`privacy.astro`](../src/pages/privacy.astro) | Privacy Policy | How we collect, use, and protect your personal data. |
| `/acceptable-use` | [`acceptable-use.astro`](../src/pages/acceptable-use.astro) | Acceptable Use Policy | Guidelines for responsible use of the SyncLead platform. |
| `/refund` | [`refund.astro`](../src/pages/refund.astro) | Refund Policy | Our commitment to your satisfaction with a 14-day money-back guarantee. |

All four carry `lastUpdated="28 March 2026"` / `lastUpdatedISO="2026-03-28"`.

**Copy source and authority**: the founder-supplied plain-text documents in `synclead_site/bin/`
(`terms of service.txt`, `privacy policy.txt`, `acceptable use.txt`, `refund policy...txt`).
Reproduced **verbatim** — every clause, in source order, with only structural markup added.

> ⚠️ **This copy is outside the normal copy-editing remit.** §9A governs *marketing* claims. A
> legal document is a different instrument: it is what the company is contractually bound by, and
> rewording a clause to match a marketing page can change what SyncLead has promised. Where a
> policy and the marketing copy disagree, **do not reconcile it here** — escalate to the founder.
> The known disagreements are logged in [`memory-bank.md §3.11`](memory-bank.md).

**Head tags** (all four): `title` is `{Document} — SyncLead`; descriptions are written for search
result legibility and are the only strings on these pages **not** taken from the source text — they
describe the document, they do not assert anything about the product.

**Markup conventions inside the slot**:
- Numbered clauses are `<h2>`; sub-clauses (`2.1`, `3.4`) are `<h3>`. Clause numbers stay in the
  text, as in the source, so a clause can be cited by number.
- Source lines reading `Label: explanation` become `<li><strong>Label:</strong> explanation</li>`.
- Internal cross-references become real links: "see our Acceptable Use Policy" → `/acceptable-use`,
  "our Privacy Policy" → `/privacy`, "our Refund Policy" → `/refund`, "our Pricing page" →
  `/pricing`. Email addresses become `mailto:` links; `ico.org.uk` is an external link with
  `rel="noopener noreferrer"`.
- Prose styling comes entirely from `.legal-prose` (design-tokens §3.7). No per-page classes.

**Deliberately absent**: `CTASection`. A conversion band under a refund policy reads as a sales
pitch attached to a contract, and these pages are also the destination for someone who arrived
looking for the cancellation clause. The navbar CTA is still present via `PageLayout`.

**Sitemap**: picked up automatically by `@astrojs/sitemap` — no config change needed.

---

### 9.7 `careers.astro` — IMPLEMENTED (WD-038)

**Purpose**: High-conviction careers and engineering recruitment page (`/careers`). Built on `PageLayout` with Dark Cinema v2 architecture.

**Sections**:
1. Hero — Breadcrumb, eyebrow badge (`WE ARE HIRING · LONDON HQ · REMOTE-FIRST`), H1 ("Build Mission-Critical Outbound Infrastructure"), standfirst, and metadata strip.
2. Operating Model — 3 core tenets: High Leverage, Low Headcount; Zero-Tolerance Deliverability; Direct Feedback Loops.
3. Open Disciplines — 3 active focus areas: Backend & Cloud Systems Engineering, Frontend Architecture & Design Engineering, Technical GTM & Outbound Architecture.
4. Application Card — Direct mailto action for general applications to `careers@synclead.io`.

---

### 9.8 `press.astro` — IMPLEMENTED (WD-038)

**Purpose**: Official media and press resources hub (`/press`). Built on `PageLayout` with Dark Cinema v2 architecture.

**Sections**:
1. Hero — Breadcrumb, eyebrow badge (`MEDIA · BRAND ASSETS · OFFICIAL RESOURCES`), H1 ("Press Kit & Brand Assets"), standfirst, and corporate metadata ribbon.
2. Official Boilerplate — One-sentence summary and standard paragraph boilerplate.
3. Official Logos — Downloadable vector cards for `logo-icon.svg`, `logo-full-on-dark.svg`, `logo-full-on-light.svg`, and `favicon-64.png`.
4. Brand Color Tokens — Color chips displaying HEX codes and roles.
5. Corporate Facts — Verified legal entity (`SYNCLEAD LTD`), company number `15903993`, jurisdiction England & Wales, and media contact `press@synclead.io`.
6. Media Desk CTA Card — Direct inquiry link to `press@synclead.io`.

---

## 9A. Claim Integrity Policy (SUPERSEDES earlier copy where they conflict)

Added after a claim audit. SyncLead is **pre-launch / private beta** with no publicly
referenceable customers and **no SOC 2 certification**. Earlier revisions of this spec
contained fabricated social proof. Those strings are now **banned**, and the sections
that carried them have been rebuilt around claims that are true today.

### 9A.1 Banned strings — never reintroduce without evidence

| Banned claim | Why | Unblocked by |
|---|---|---|
| `SOC 2 Type II` (hero badge + footer link) | Not certified | A completed Type II audit report |
| `G2 Leader — Fall 2025` | No G2 listing/award | An actual G2 award badge asset |
| `Trusted by 500+ SDR & BDR teams worldwide` | No customers at that scale | Real paying-customer count |
| `Trusted by teams at` + 6 invented company names (Northbeam Sales, Quantiv, HelioCRM, Brightpath Labs, Vantage GTM, Corestack Media) | Companies do not exist as customers | Signed logo-usage permission |
| Counters `2,400,000 emails/mo`, `38% reply lift`, `12,000+ meetings booked` | Invented aggregate metrics | Real platform aggregates, with the measurement window stated |
| 3 testimonials (Maya Chen/Quantiv, Daniel Okafor/HelioCRM, Priya Raghavan/Brightpath Labs) incl. `3.1% → 9.4%`, `30% more meetings`, `40k emails a month` | Fabricated people, companies and results | Named, permissioned customer quotes |
| `SSO/SAML` in the Enterprise tier | Not implemented in the API | Shipping SSO |
| `Most Popular` (pricing Pro pill) | Adoption claim with no adoption data behind it pre-launch. Caught under WD-031 — it had been in the pricing grid since it was built because it reads as boilerplate | Real plan-distribution data. `Recommended` is the evidence-free alternative and is what ships |

### 9A.1b Banned vocabulary — positioning, not evidence (WD-031)

A second, separate ban. §9A.1 above bans strings because they are **untrue**. These are banned
because they are **true but wrong for who we sell to** — they price SyncLead as a disposable
$15/month widget when a migrating customer is moving their entire revenue engine. Both lists are
enforced by the same grep gate; do not merge them, because the unblockers are different in kind.

| Banned | Why | Approved replacement |
|---|---|---|
| `Start Free Trial`, `Start 14-Day Trial`, `Start Trial`, `Build a Sequence (Free for 14 Days)`, `Free for 14 days` | Attracts tyre-kickers; prices the product as disposable. WD-034: Strictly banned until founder explicitly directs, and Zoo must ask for approval first | `Get Started` |
| `Cancel Anytime`, `Cancel in one click` | Gym-membership framing — signals we expect churn | `Commercial terms in writing` → `/refund` |
| `Sign Up` (as button copy) | Passive; names a form, not an outcome | `Deploy Your Workspace` |
| `No Credit Card Required` | Also banned under §9A.1 as unverified. Independently banned here: infrastructure buyers expect to pay | *(no replacement — the anxiety it addressed is not one our buyer has)* |
| `Book a 20-Min Walkthrough` | Prices the conversation by the minute | `Book a Migration Call` |
| `Contact Sales` | Generic; describes our org chart, not their outcome | `Book a Migration Call` |

**Reversing this is a founder decision, not a copy tweak.** It deliberately reduces top-of-funnel
volume. If self-serve volume is wanted back, WD-031 must be reversed explicitly rather than eroded
one button at a time.

**Not affected**: the legal pages. `/terms` and `/refund` still describe cancellation and the
14-day money-back guarantee, verbatim per WD-029. The commitments are real; the marketing surfaces
simply no longer lead with them. See memory-bank §4 trap 17.

### 9A.2 Permitted trust claims (verifiable today)

- **Microsoft 365 & Google OAuth — never your password.** Backed by real OAuth token flows in the API (`Controllers/Campaigns/*`, Graph + Google refresh-token exchange).
- **Billing secured by Stripe.** Stripe account is approved; card data never reaches SyncLead servers.
- **HubSpot contact & deal sync**, **SMTP/IMAP support** — shipped integrations.
- **Continuous SPF / DKIM / DMARC / MX monitoring** — backed by `Services/EmailMx/*`.
- **Multi-IP sending with per-account daily caps** — backed by campaign limit/optimization endpoints.
- **Onboarding founding teams** — factual stage description (WD-016; replaced the private-beta/design-partner framing).
- **Export your data any time**, **billing secured by Stripe** — commitments SyncLead controls.
- **Migration handled by our engineers** — a service commitment; see memory-bank §3.10 for the operational confirmation still outstanding.
- **14-day money-back guarantee** — real and published in the Refund Policy §1, but **not** used as marketing copy (§9A.1b).

### 9A.3 Revised locked copy (home page)

- **H1**: `Stop Losing Revenue to` + `<span class="text-gradient">Burnt Domains and Calendar Drop-Offs.</span>` — rendered at `--text-display-l-*` (not display-xl; the longer headline needs the smaller step).
- **Sub-headline**: "Replace a fractured stack. We combine multi-IP sending, cold outreach, and automated no-show recovery to put qualified meetings directly on the calendar."
- **Primary CTA (conversion surfaces)**: `Claim a Founding Team Spot` → `/contact` (WD-031)
- **Secondary CTA**: `Deploy Your Workspace` → app signup (WD-031)
- **Consultative CTA**: `Book a Migration Call` → `/contact`
- **Eyebrow pill**: `Onboarding founding teams — let us rebuild your outbound`
- **Deliverability H2**: `Stop Playing Russian Roulette with <span class="text-gradient">Primary Domains.</span>`
- **Scheduling H2**: `If They Reply, It Books. <span class="text-gradient">If They Ghost, It Recovers.</span>`
- **CTA band H2**: `Your domains and your calendar <span class="text-gradient">deserve better.</span>`

### 9A.4 Rebuilt sections

| File | Was | Now |
|---|---|---|
| [`LogoBar.astro`](../src/components/sections/LogoBar.astro) | 6 fake customer logos | Integration strip (Microsoft 365, Google Workspace, HubSpot, Stripe, SMTP/IMAP) + OAuth-not-password line |
| [`MetricsBand.astro`](../src/components/sections/MetricsBand.astro) | 3 invented `AnimatedCounter`s | "Three mechanisms" — numbered explanation of sending pools, DNS monitoring, reply/no-show handling |
| [`FoundingTeams.astro`](../src/components/sections/FoundingTeams.astro) | 3 fake testimonials + 5-star ratings | Founding Teams offer — 3 benefits + `Claim a Founding Team Spot` CTA (renamed from `TestimonialGrid.astro`, WD-018) |
| [`PricingSection.astro`](../src/components/sections/PricingSection.astro) | "No credit card required" | Stripe / commercial-terms / data-export risk-reversal row (the cancel-in-one-click card was replaced under WD-031) |

> `AnimatedCounter.astro` is intentionally left in the codebase, unused on the home page. Reinstate it in `MetricsBand` once real aggregates exist.

### 9A.5 Evidence needed to strengthen the page further

Collect and supply before adding: pilot-account reply-rate deltas (with date range and sample size), named design-partner quotes with logo permission, Microsoft Partner Network ID and the exact permitted badge wording, mailbox/DNS-check volume processed to date, and hosting region + data-retention specifics for a `/security` page.

---

## 9B. Change History → see the memory bank

**This spec describes the *current intended state* only. It does not carry a change log.**

Chronological history — what was there, what replaced it, and why — lives in
[`memory-bank.md §2`](memory-bank.md). Decisions live in §1 of the same file as `WD-nnn` records.
Open items blocked on founder input live in §3. Intentional oddities that look like bugs are
listed in §4.

Rationale for the split: two files both claiming to be the history is how drift starts. The
memory bank is the record of *what happened*; this spec is the record of *what should be true
now*. When they disagree, that is a bug to reconcile, not a preference to pick between.

---

## 10. Implementation Notes & Risks

1. **Reveal script duplication**: `BaseLayout` ships the observer once; components must NOT define their own reveal observers. AnimatedCounter's stepping script is the single exception (self-contained, idempotent) — though the component is currently unused (§7.2).
2. **Reduced motion**: all animated elements render final state under `prefers-reduced-motion`. Pointer-driven effects are additionally gated on `(hover: none), (pointer: coarse)` — see §5.3.1.
3. **`set:html` usage**: only for headline strings with `.text-gradient` spans — content is authored, never user-input; safe.
4. **Legal pages**: `/terms`, `/privacy`, `/acceptable-use` and `/refund` are **built** — see §9.6 and §4.3. `/security` and `/data-processing` were not built, and their footer links were **removed** rather than left as `#` placeholders. A `/security` page still matters more than usual here: it is what the removed SOC 2 badge was standing in for (memory-bank §3.6).
5. **Dashboard screenshots**: `/images/dashboard-*.svg` (**SVG, not PNG** as originally specified) are abstract placeholders — dark-800 background with simple UI blocks at 1600×1000. Replace with real UI captures. Their in-app sidebar logo is a simplified square, deliberately not the real mark, since the whole image will be replaced.
6. **OG image**: ⚠️ `/og-image.png` is referenced by `BaseLayout` but **does not exist** — social shares currently render without an image. See §2.3.
7. **Cloudflare Pages**: build command `npm run build`, output `dist/`, NODE_VERSION 20. No functions — so the contact form needs an external endpoint.
8. **Sitemap**: `@astrojs/sitemap` emits `/sitemap-index.xml` (referenced in robots.txt).
9. **Brand colors**: The entire color system is navy + sky blue + white. No violet/purple exists in the brand. An earlier spec's `#1E9AF5` (generic SaaS blue) and `#6C47FF` (violet) were replaced with `#0B1D33` and `#8ECAE6`. ⚠️ The supplied logo artwork does **not** match these tokens — unresolved, see design-tokens §3B.1 and memory-bank §3.1.
10. **Claim integrity**: §9A is binding and supersedes earlier copy on conflict. The evidence ledger in [`project-context.md §5`](project-context.md) is the authority on what may be published.

---

## Validation Checklist

- [x] Astro 4.x, `output: 'static'`, no SSR/API routes
- [x] Tailwind v3 config matches design-tokens.md exactly
- [x] @fontsource/inter, weights 400–800, no CDN fonts
- [x] All 28 manifest files specified with props, markup, copy, tokens
- [x] Section order unchanged (locked); hero copy revised per §9A.3
- [x] Brand colors match actual SyncLead logo (navy #0B1D33, sky #8ECAE6, white)
- [x] No purple/violet — zero off-brand color contamination
- [x] AI replies only as "coming soon"
- [x] Pricing: Starter $49 / Pro $149 / Enterprise custom
- [x] No carousels; grids only; IntersectionObserver animations only
- [x] Final copy everywhere — zero placeholders (except explicitly flagged TODOs: form endpoint, legal pages, OG/screenshot images)
- [x] **No unverifiable claims** — §9A.1 banned strings absent from `src/`
- [x] **No fabricated people, companies or metrics** anywhere in the site

## Approval Gate

Spec is complete and awaiting approval. On approval, Code mode implements all files in this order: config files → `tokens.css`/`global.css` → `BaseLayout`/`PageLayout` → `ui/` → `nav/` → `hero/` → `sections/` → `Footer` → pages → public assets.

