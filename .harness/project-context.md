# SyncLead Marketing Site — Project Context

**Scope**: `synclead_site/` only. Writable — keep current per the protocol in
[`memory-bank.md §5`](memory-bank.md).

This file answers *what the site is and where it stands*. For *why decisions were taken* and
*what changed*, read [`memory-bank.md`](memory-bank.md) first.

---

## 1. What This Is

The public marketing website for **SyncLead.io**, a B2B SaaS cold-outreach platform. It is a
separate sub-project inside the SyncLead API monorepo and shares nothing with the API at runtime
— no imports, no build coupling, no shared deployment.

| | |
|---|---|
| Type | Static marketing site (SSG) |
| Location | `synclead_site/` (repo root: `c:/Synclead/sync_api`) |
| Deploy target | Cloudflare Pages — build `npm run build`, output `dist/`, NODE_VERSION 20 |
| Production URL | `https://synclead.io` |
| App URL (CTA target) | `https://app.synclead.io/signup` |
| Relationship to API | Reference only. This project **never** modifies API code, SQL, or backend logic. |

**Business stage: pre-launch, onboarding founding teams.** No publicly referenceable customers,
no security certifications, no usage metrics to publish. This shapes most of the site's content
and is enforced by WD-004. Stripe is approved and live.

**How the stage is presented (WD-016)**: as *Founding Teams* — early access to something valuable
— never as "private beta" or "design partners", which signal *unfinished* and invite a discount
conversation. The facts are unchanged; only the frame is. Do not read the confident tone as
permission to claim more: WD-004 still binds every word.

**Audience**: SDR/BDR leads, heads of outbound, and founders running their own outbound at B2B
companies. Technically literate about email deliverability — they know what DKIM is and they have
been burned by a domain reputation problem.

**Positioning**: replace a fractured stack (separate sending tool + scheduler + spreadsheet for
inbox health) with one platform. Lead with the two failure modes prevented — burnt sending
domains and calendar drop-offs — rather than an aspirational outcome (WD-005). Tone is
high-ticket B2B infrastructure: confident, technical, no hedging.

---

## 2. Technology

Locked per WD-001. Any change needs an explicit decision recorded in the memory bank.

| Layer | Choice | Version |
|---|---|---|
| Framework | Astro, `output: 'static'` | `^4.16.0` |
| CSS | Tailwind CSS v3 (`applyBaseStyles: false`) | `^3.4.0` |
| Font | `@fontsource/instrument-sans`, `@fontsource/instrument-serif`, `@fontsource/jetbrains-mono`, self-hosted (WD-032) | `^5.0.0` |
| Sitemap | `@astrojs/sitemap` → `/sitemap-index.xml` | `^3.1.6` |
| TypeScript | strict, `@/*` → `src/*` | `^5.5.0` |
| JS | Vanilla only | — |

**Deliberately absent**: React/Vue/Svelte, any animation library, Google Fonts CDN, `sharp`,
SSR, API routes, Cloudflare Functions.

**Commands** (run from `synclead_site/`): `npm run dev` → localhost:4321 · `npm run build` ·
`npm run preview`.

---

## 3. Current State

### 3.1 Implemented and building

```
synclead_site/
├── .harness/            memory-bank.md · project-context.md · site-spec.md
│                        design-tokens.md · roles/role-code.md
├── bin/                 founder-supplied source text for the 4 legal documents
│                        (NOT build output — see memory-bank §4.16)
├── public/
│   ├── logo-icon.svg              icon mark
│   ├── logo-full-on-dark.svg      icon + white wordmark  → dark surfaces
│   ├── logo-full-on-light.svg     icon + black wordmark   → light surfaces
│   ├── favicon-64.png             64px raster, apple-touch-icon
│   ├── favicon.svg                SUPERSEDED placeholder, unreferenced
│   ├── robots.txt
│   └── images/dashboard-{overview,campaigns,health,scheduling}.svg
│                        abstract placeholders, 1600×1000 — not real UI
└── src/
    ├── styles/          tokens.css · global.css (incl. .legal-prose & .prose-cinema, WD-036)
    ├── layouts/         BaseLayout.astro · PageLayout.astro
    │                    LegalLayout.astro (policy-page & editorial chrome, WD-029 / WD-036)
    ├── components/
    │   ├── ui/          Button · Badge · Card · SectionHeader · Logo
    │   │                AnimatedCounter (present, UNUSED — WD-008)
    │   ├── nav/         Navbar · MobileMenu
    │   ├── hero/        HeroSection (with HeroCascadingUI)
    │   │                HeroCascadingUI (cascading deliverability + calendar UI)
    │   │                HeroMicroDemo · BrowserFrame
    │   ├── sections/    LogoBar · InfraSection
    │   │                CampaignsSchedulingSection · AIInsightsSection
    │   │                PricingSection · CTASection
    │   └── footer/      Footer
    └── pages/           index.astro
                         terms.astro · privacy.astro
                         acceptable-use.astro · refund.astro
                         careers.astro · press.astro
                         pricing.astro · roadmap.astro
```

### 3.2 Home page section order (locked — WD-033)

hero with cascading UI (dark) → integrations (light) → infrastructure & deliverability cluster (dark) →
campaigns & scheduling split-screen (dark) → AI & intent scoring (dark) →
3-tier pricing (dark) → footer CTA (dark) → footer with trajectory engine (dark-950)

The alternating light/dark rhythm is intentional; inserting a section means checking it does not
break the alternation.

### 3.2b Legal pages (WD-029, upgraded WD-036)

Four documents at `/terms`, `/privacy`, `/acceptable-use` and `/refund`, all built on
`LegalLayout.astro` in Dark Cinema v2 with sticky TOC scrollspy navigation, breadcrumbs,
and official corporate verification card. Copy is the founder's plain text from `bin/`,
reproduced **verbatim** — see site-spec §9.6.

⚠️ **The policies are outside the §5 evidence ledger's remit.** The ledger governs claims the site
*chooses* to make. A policy is the instrument the company is bound by, so a mismatch between a
policy and this file is resolved by the founder, not by editing either one. Three live mismatches
(Salesforce/Clay integrations, plan names, security controls) are logged at memory-bank §3.11.

### 3.3 Not yet built

| Item | Note |
|---|---|
| `features.astro` | Spec'd in site-spec §9.2 |
| `about.astro` | ⚠️ Spec §9.4 is **do-not-build** — fabricated copy, see memory-bank §3.8 |
| `contact.astro` | Spec'd in §9.5; form has no endpoint (WD-002) |
| `og-image.png` | **Referenced by `BaseLayout` but absent** — social shares render imageless |
| `blog/` (Blog engine & articles) | Planned for future release — layout architecture & `.prose-cinema` typography system pre-established in WD-036 |
| `/security` | Not built. Footer link **removed** rather than left as `#` (WD-030); still wanted — memory-bank §3.6 |
| `/data-processing` | Not built and not planned as a separate page — the content lives in Privacy Policy §5/§6/§9 |
| Real dashboard screenshots | Current SVGs are abstract |

---

## 4. Product Capabilities (for accurate copy)

Verified against the API codebase. This is the source for feature claims — if it is not here,
check the code before writing it.

**Campaigns** — multi-step sequences, unlimited follow-up stages, spintax + A/B variants
rotating per send, send-window scheduling with per-timezone delivery and quiet hours, reply
detection that stops the sequence, manual pause, duplication, lead import (CSV, Google Sheets,
manual).

**Deliverability** — multi-IP sending pools with rotation, per-account daily caps, continuous
SPF/DKIM/DMARC/MX monitoring with alerts, domain expiry checks, bounce and spam-trap
classification, provider resolution and health scoring.
*Code*: `Services/EmailMx/*`, `Controllers/Campaigns/EmailAccountHealthGet.cs`.

**Scheduling** — two-way Google Calendar and Microsoft 365 sync, round-robin and pooled
availability, reminders, reschedule and no-show recovery sequences, holiday and availability
overrides, meetings attributed back to the campaign step.

**Inbox** — unified reply tracking threaded to the prospect, reply classification driving lead
status, forwarding, read/unread.

**Integrations** — Microsoft 365 (Graph), Google Workspace (Gmail + Calendar), HubSpot (contacts,
deals, workflows, meeting logging), Stripe (billing), Zoom, iCloud/CalDAV, SMTP/IMAP.
All mailbox and calendar connections are **OAuth — no email passwords stored.**

**Analytics** — per-campaign/account/day volume with deliverability %, reply rates across
variants and steps, meetings booked with attribution, calendar utilisation.

**AI** — 🚧 **not shipped.** Site may only describe it as "coming soon". Never imply availability.

**Not implemented — do not claim**: SSO/SAML (was wrongly listed in pricing, removed), and
**Salesforce / Clay** CRM sync. ⚠️ The published Terms §2 and Privacy §2.4/§5 name Salesforce and
Clay anyway, because those documents are reproduced verbatim from the founder's text (WD-029).
That is a live contradiction awaiting a founder decision — memory-bank §3.11(a). It is **not**
licence to claim them in marketing copy.

---

## 5. Evidence Ledger

The operative half of WD-004. Before publishing any claim, it must appear in the left column here
with real evidence, or in the banned table in [`site-spec.md §9A.1`](site-spec.md).

### 5.1 Claims currently permitted

| Claim | Evidence |
|---|---|
| Microsoft 365 & Google OAuth — never your password | OAuth refresh-token flows in `Controllers/Campaigns/*` (Graph + Google token exchange) |
| Onboarding founding teams | Factual stage description (WD-016) |
| Direct Slack channel with the engineering team | ⚠️ **Commitment, not a capability** — needs operational confirmation, memory-bank §3.10 |
| Locked founding price, forever | ⚠️ **Commitment** — permanent discount liability, needs confirmation, §3.10 |
| White-glove migration of existing sequences | ⚠️ **Commitment** — a service you deliver manually, not a product feature |
| "We will draft an outreach sequence for your market" (hero capture) | 🔴 **Not yet true** — requires the app to handle `?domain=`, memory-bank §3.9 |
| Billing secured by Stripe; cards never touch our servers | Stripe account approved and live; Stripe-hosted checkout |
| HubSpot contact & deal sync | `Controllers/HubSpot/*` |
| SMTP / IMAP support | Provider type handling in `SaveReplyEmail.cs` and account connect flow |
| Continuous SPF / DKIM / DMARC / MX monitoring | `Services/EmailMx/*` |
| Multi-IP sending with per-account daily caps | Campaign limit + optimization endpoints |
| Onboarding founding teams | Factual stage description (WD-016) |
| Export your data any time · billing secured by Stripe | Commitments SyncLead controls |
| Migration handled by our engineers | Service commitment (WD-031); operational backing tracked at memory-bank §3.10 |
| Pricing: Starter $49 / Pro $149 / Enterprise custom | Set by founder |
| 14-day money-back guarantee | Published in the Refund Policy §1 (WD-029) — a commitment SyncLead controls. Does **not** unblock "no credit card required": the policy is silent on whether a card is taken at signup |
| UK company registration: SYNCLEAD LTD, no. 15903993, 20 Wenlock Road, London N1 7GU | Companies House registration; repeated in all four policies and the footer |

### 5.2 Claims blocked, and their unblocker

| Blocked claim | Unblocked by |
|---|---|
| SOC 2 (any form) | A completed Type II audit report |
| G2 award or rating | An actual G2 listing with award asset |
| Customer count / "trusted by N teams" | Real paying-customer count |
| Named customers or logos | Written logo-usage permission |
| Any aggregate metric (volume, reply lift, meetings) | Real platform data **with measurement window and sample size** |
| Testimonials | Named person + company + permission |
| Microsoft Partner badge | Programme name, Partner ID, permitted wording — see memory-bank §3.2 |
| "No credit card required" | Confirmation of the live signup flow |
| `Start Free Trial`, `Start 14-Day Trial`, `Start Trial`, `Free for 14 Days`, `Cancel in one click`, `Sign Up`, `Book a 20-Min Walkthrough`, `Contact Sales`, `Most Popular` | Strictly **banned site-wide** (WD-034 / WD-031 / §9A.1). Unified conversion CTA is `Get Started`. Reversal is locked: prohibited until founder explicitly directs, and Zoo must ask for approval first |
| SSO/SAML | Shipping it |
| AI features as available | Shipping them |

---

## 6. Brand Summary (v2 — WD-032 & WD-036)

Full detail in [`design-tokens.md`](design-tokens.md).

Dark Cinema palette: deep background scale `--bg-0` (`#05080F`) through `--bg-3` (`#141D33`), Sky Blue `--color-sky` (`#41C8FF` / `#0E86C8`), Violet accent `--color-violet` (`#9D8BFF` / `#6C58E8`), plus semantic states.
Typography: Instrument Sans (UI), Instrument Serif (italic emphasis), JetBrains Mono (labels/code/chips), self-hosted via `@fontsource/*`.
Editorial / Legal / Blog prose: `.legal-prose` and `.prose-cinema` in `global.css` with 10.5:1 WCAG AAA text contrast (`#CAD5E8`), sky indicators, and structured entity cards.

Voice: direct, technical, no hype. Name the problem before the solution. Short declaratives.
Confident, not apologetic — but never overselling. The audience is sceptical by profession, so an
unsupported superlative costs more than it earns. Confidence comes from specificity (WD-016).

⚠️ The supplied logo artwork does not match these tokens (`#1093ef` vs `#8ECAE6`). Unresolved —
memory-bank §3.1. Render artwork as supplied; do not edit either side unilaterally.

---

## 7. Conventions

- One `.astro` file per component, typed `Props` interface, `Astro.props` destructuring with defaults.
- Imports use the `@/` alias.
- Tailwind utilities in markup; `.text-gradient`, `.glass-dark`, `.container-site` defined once in `global.css`.
- No raw hex in templates (WD-014).
- `set:html` only for authored headline strings containing `<span class="text-gradient">`.
- One shared reveal observer in `BaseLayout` (WD-011).
- All logos via `Logo.astro` (WD-012).
- Every image carries `alt`, `width`, `height`, `loading`.
- `prefers-reduced-motion` respected everywhere; pointer effects additionally gated on coarse pointers (WD-010).
- `aria-label` on icon-only controls; `role="dialog"` + `aria-modal` on the mobile overlay.
- Verify with `npm run build` (must exit 0) plus a grep of `src/` and `dist/` for banned strings.

