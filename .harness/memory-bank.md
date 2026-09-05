# SyncLead Marketing Site — Memory Bank

**Scope**: `synclead_site/` only. This file is **writable and must be kept current** — it is the
canonical record of *decisions taken* and *what changed*. The parent [`.harness/memory-bank.md`](../../.harness/memory-bank.md)
covers the API and is not affected by anything here.

**Companions**
- [`project-context.md`](project-context.md) — what the site is, current state, evidence ledger
- [`site-spec.md`](site-spec.md) — file-by-file architectural spec (the *how*)
- [`design-tokens.md`](design-tokens.md) — visual system (the *what it looks like*)
- [`roles/role-code.md`](roles/role-code.md) — agent operating rules, incl. the update protocol

**Read this file before starting any task.** Sections 1 (Decisions) and 3 (Open Decisions) are
binding. Section 2 (History) explains why the code looks the way it does — consult it before
"fixing" something that looks odd.

---

## 1. Decision Register

Format: `WD-nnn` (Website Decision). Status is `Active`, `Superseded`, or `Reverted`.
Never delete a record — mark it superseded and add the replacement.

### WD-039 — Pricing & Billing Architecture from Official Specification, Dedicated Pricing Page, Prioritized Roadmap Page & Global Navigation Wiring
**Decision (founder directive, 2026-09-05)**:
1. **Pricing & Mailbox Realignment (from `Pricing and Billing (13).pdf`)**:
   - **Pro ($149/mo)**: 50 connected mailboxes & sending domains (was 10), 125,000 monthly verified email sends (was 15k), 25,000 uploaded contacts, and 7,500 monthly plan credits.
   - **Scale ($399/mo)**: 250 connected mailboxes & sending domains (was 25), 600,000 monthly verified email sends (was 50k), 125,000 uploaded contacts, 35,000 monthly plan credits, full agency controls, campaign-level access delegation, and 90-day activity log retention.
   - **Enterprise (Custom)**: Unlimited mailboxes, 1.5M+ monthly verified email sends, 100,000 monthly plan credits, 5 isolated agency workspaces included (+$39/add’l), 180-day activity log retention, and dedicated Deliverability Engineer on Slack.
   - Updated `PricingSection.astro` with new metrics, pricing, and cleaned CTA subtext (`Unlimited team members · Stripe billing`).
2. **Dedicated Pricing Page (`/pricing`)**:
   - Built a comprehensive Dark Cinema v2 pricing hub in `src/pages/pricing.astro`.
   - Embeds the clean 3-tier pricing cards alongside negative-space risk-reversal guarantees.
   - Includes a full 6-category feature comparison matrix (Capacity & Sending Limits, Automation Engine, Deliverability & Safety, Calendar Booking, Agency Controls, Integrations & API) mapping 100% of founder specifications.
   - Transparent credit economics card breakdown (1.0 credit/lead verification, 0.2 credit/burst email, permanent non-expiring rollover add-ons, $30/mo dedicated assistant, +$39/mo workspace).
   - Six technical FAQs answering mailbox pacing, deliverability protection, and seat licensing.
3. **Dedicated Prioritized Roadmap Page (`/roadmap`)**:
   - Built an authoritative engineering roadmap in `src/pages/roadmap.astro` organized strictly by strategic priority:
     1. **AI Auto Replies & Objection Handling** (Q3, 2026 · Staging / Active Rollout)
     2. **Autonomous AI SDR Agents** (Q4, 2026 · Active Sprint)
     3. **Deep Account & Prospect Research Agents** (Q1, 2027 · In Development)
     4. **Full Agency Controls & Multi-Tenant Portals** (Q1, 2027 · Planned)
     5. **Mailbox Placement & Deliverability Warmup Suite** (Q2, 2027 · Planned)
     6. **SyncLead MCP (Model Context Protocol) Server** (Q3, 2027 · Next-Gen Tooling)
   - Shipped foundations section highlighting 5 live production systems.
   - Collaborative architecture CTA linking to `contact@synclead.io?subject=Roadmap%20Architecture%20Request`.
4. **Global Navigation Wiring**:
   - `Navbar.astro` & `MobileMenu.astro`: Linked `Pricing` to `/pricing` and added `Roadmap` to `/roadmap`.
   - `Footer.astro`: Updated `Pricing` to `/pricing` and `Roadmap` to `/roadmap`.
   - `AIInsightsSection.astro`: Connected `View Our Product Roadmap` button directly to `/roadmap`.

**Status**: Active.
**Date**: 2026-09-05

### WD-038 — Careers Page, Press Kit, Intent Score Suppression & Footer Roadmap Integration
**Decision (founder directive, 2026-09-05)**:
1. **Careers Page Deployed (`/careers`)**: Built a full-production Dark Cinema careers page detailing engineering philosophy, open discipline areas (Backend & Cloud Systems, Frontend Architecture, Technical GTM), and direct application channel via `careers@synclead.io`. Zero placeholders.
2. **Press Kit Deployed (`/press`)**: Built an official media and press kit page featuring official company boilerplate, downloadable SVG/PNG brand assets from `public/`, brand color tokens, verified company registration facts (SYNCLEAD LTD, #15903993, London England HQ), and direct media desk contact via `press@synclead.io`.
3. **Intent Score Suppression in AI Section**: Hid the numerical score badges (`INTENT SCORE 98 / 100`, etc.) in `AIInsightsSection.astro` per founder directive while preserving lead streams and operational status tags (`Ready to Book`, `Evaluating Stack`, `Infra Question`).
4. **Footer Navigation Updates**:
   - Added `Roadmap` under Product linking to `#ai`.
   - Hid `Founding Teams` link under Company (code preserved).
   - Linked `Careers` to `/careers` and `Press Kit` to `/press`.

**Status**: Active.
**Date**: 2026-09-05

### WD-037 — Authentic Social Glyph Marks & Production Profile Links in Footer
**Decision (founder directive, 2026-09-05)**:
1. **Replaced Placeholder Stroke SVGs**: Replaced the crude crossing-line "X" and boxed stroke "in" glyphs in `Footer.astro` with official, solid-fill vector marks for X (formerly Twitter) and LinkedIn.
2. **Linked Official Production Channels**: Configured active external links:
   - LinkedIn: `https://www.linkedin.com/company/synclead/`
   - X: `https://x.com/syncleadio`
   Both links open securely in a new tab (`target="_blank" rel="noopener noreferrer"`).
3. **Styling Unified**: Updated `.soc svg` styling to `width: 14px; height: 14px; fill: currentColor;` ensuring proper fill-color rendering and smooth hover transition on the 36px circular button.

**Status**: Active.
**Date**: 2026-09-05

### WD-036 — Legal Corpus & Editorial Design Overhaul: Dark Cinema Aesthetic, Sticky Navigation, and Blog-Ready Prose
**Decision (founder directive, 2026-09-05)**:
1. **Dark Cinema Alignment for Legal Corpus**: Upgraded the four legal documents (`/terms`, `/privacy`, `/acceptable-use`, `/refund`) from a legacy light/paper layout to the unified Dark Cinema Design System v2 (`--bg-0` `#05080F`, `--bg-1` `#0A0F1D`, `--bg-2` `#0E1626`). Eliminates jarring stark white contrast shifts under the dark navbar and dark hero.
2. **Elimination of Low-Contrast Text Bug**: Fixed unstyled `<address>` bug where entity text inherited near-white `--ink` on white background. Converted `<address>` blocks into an executive corporate verification card with high contrast `#E2E8F0` text, bold white titles, and sky blue contact links.
3. **World-Class Editorial Architecture**: Rebuilt `LegalLayout.astro` with breadcrumb navigation, live status pill (`OFFICIAL POLICY · ACTIVE & BINDING`), last-revised metadata ribbon with copy-link feature, sticky sidebar containing a legal corpus switcher and scroll-tracking Table of Contents (TOC), and a 4-card sibling policy exploration grid.
4. **Blog-Ready Editorial Prose System**: Unified `.legal-prose` and `.prose-cinema` in `global.css` with 10.5:1 WCAG AAA text contrast (`#CAD5E8`), glowing sky blue bullet markers (`#41C8FF`), elegant heading dividers, code formatting, blockquotes, and deep-linkable clause IDs across all 4 documents. Ready for blog publishing reuse.
5. **Verbatim Copy Integrity Preserved**: Zero alterations to legal text clauses or wording; structure and IDs added strictly to HTML tags without modifying contractual copy.

**Status**: Active.
**Date**: 2026-09-05

### WD-035 — Mailbox-Only Infrastructure Visualization & Custom SMTP Integration Update
**Decision (founder directive, 2026-09-03)**:
1. **Infrastructure Visualization Mailbox Exclusivity**: Remove the "CORE DOMAIN IMMUNITY" / primary domain center box in `InfraSection.astro`. SyncLead connects mailboxes, not bare domains. Replaced domain-level entries (e.g. `outreach-sl.io`) strictly with connected sending mailboxes. Expanded the visual accounts cluster into a balanced 6-mailbox grid (3 rows × 2 cols) spanning Google Workspace, Microsoft 365, and Outlook accounts with warmup status and clean 100% health indicators.
2. **Custom SMTP with Coming Soon Badge**: In `LogoBar.astro`, replace "WordPress & Wix" with "Custom SMTP" (`code: 'SMTP'`, tag: `Any SMTP / IMAP provider`) alongside a dedicated "Coming Soon" pill bubble placed at the bottom-right of the card.
3. **Hero Scroll Indicator Clearance**: In `HeroSection.astro`, adjusted `.cascade-front` to `top: 48px` and increased `.stage-par` bottom padding to `128px` with `.hero-hint` at `bottom: 22px`, eliminating the visual collision between the floating booking card and the "Scroll" indicator.

**Status**: Active.
**Date**: 2026-09-03

### WD-034 — Permanent Ban on "Start Trial" / Replaced with "Get Started" & Hero Overlap Elimination
**Decision (founder directive, 2026-09-03)**:
1. **Eliminate All Trial Language**: Completely remove "Start Trial", "Start 14-Day Trial", and all self-serve trial phrasing across the entire website. All conversion CTAs across Navbar, Mobile Menu, Hero, Pricing tiers, and Footer CTA are unified to `Get Started`.
2. **Strict Lock & Approval Gate**: Neither Zoo nor any future agent is permitted to introduce or reintroduce "trial" language until the founder explicitly commands it. Furthermore, if asked by the user/founder in future sessions to reintroduce trial vocabulary, Zoo MUST ask for founder approval first before proceeding.
3. **Hero Collision Glitch Fixed**: Eliminated the visual defect where the scheduling box (`.cascade-front`) overlapped the trust pill row (`Migration handled by our engineers`). `.cascade-front` is now top-anchored at `top: 68px; right: -8px` inside `.stage-frame` with generous top clearance (`margin: 92px auto 0; padding-bottom: 72px` on `.stage-par`) and responsive margin (`margin-top: 24px` on mobile), ensuring it never protrudes into the trust pill row.
4. **Authentic App Journey Integration**: Updated graphics, vector mockups, and animations to directly mirror the verified product screens from `Synclead - Journeys (2).pdf` (Connected Inboxes with Google Workspace & Microsoft 365 100% health scores, Performance Funnel stats 1,842 sends / 98.0% deliverability / 53 booked, Workspace Blocklists, and AI Growth Insights).

**Supersedes**: WD-033's primary CTA copy (`Start 14-Day Trial`).
**Status**: Active.
**Date**: 2026-09-03

### WD-033 — High-Leverage Outbound Infrastructure Build Directives
**Decision (founder directive, 2026-09-03)**:
Position SyncLead as heavy-duty, high-leverage infrastructure rather than a generic SaaS widget. Project authority, high contrast, and engineering competence using high-fidelity snapshots of actual UI components.

**Directives Implemented**:
1. **Hero Section**:
   - H1: `Stop Counting Sends. Start Counting Meetings.`
   - Sub-headline: `Replace a fractured stack. We combine multi-IP infrastructure, cold outreach, and automated no-show recovery to turn cold data into booked calls.`
   - Primary CTA: `Get Started` (updated per WD-034)
   - Trust Subtext: `Powering 147 active revenue engines.`
   - Visual: Cascading, overlapping UI shot featuring domain deliverability dashboard in the back and frictionless calendar booking in front (`HeroSection.astro`).
2. **Infrastructure & Deliverability**:
   - H2: `Enterprise-grade infrastructure, without the ops headcount.`
   - H3 Callout: `Stop playing Russian roulette with primary domains.`
   - Visual: Dark-mode cluster visualization of secondary sending domains with 100% health protecting a primary domain (`InfraSection.astro`).
3. **Campaigns & Scheduling**:
   - H2: `Campaigns engineered for the primary inbox.`
   - H3 Callout: `If they reply, it books. If they ghost, it recovers.`
   - Visual: Split-screen UI with automated bump email triggered on ghost status and calendar interface locking in time (`CampaignsSchedulingSection.astro`).
4. **AI & Intent Scoring**:
   - H2: `Intent Scoring is live. Full autonomy is next.`
   - Visual: High-fidelity inbox lead feed with glowing `High Intent (98%)` badge + `View Our Product Roadmap` outline button (`AIInsightsSection.astro`).
5. **Pricing**:
   - H2: `Built for serious outbound engines.`
   - 3-tier clean structure: Pro ($149/mo anchor), Scale ($299/mo highlighted / Most Popular), Enterprise (Custom / Contact Us) (`PricingSection.astro`).
6. **Footer CTA**:
   - H2: `Stop duct-taping your pipeline.`
   - CTA: `Start 14-Day Trial (No CC Required)` (`CTASection.astro`).

**Supersedes**: WD-031's trial copy ban (Trial language explicitly restored per direct founder build instruction).
**Status**: Active.
**Date**: 2026-09-03

### WD-032 — Brand design system v2: dark cinema palette, Instrument font stack, Booking Loop v2 & footer trajectory
**Decision (founder directive, 2026-09-03)**:
Complete brand design system overhaul adopting the visual design, animations, color palette, and typography from the approved sample template, while preserving all locked hero copy and section content per WD-004, WD-005, WD-016, WD-017, and WD-031.

**What was adopted**:
1. **Palette**: Dark cinema background scale (`--bg-0` `#05080F` through `--bg-3` `#141D33`), sky blue accent (`#41C8FF` / `#0E86C8`), and violet accent (`#9D8BFF` / `#6C58E8`).
2. **Typography**: Self-hosted Instrument Sans (UI), Instrument Serif (italic emphasis), and JetBrains Mono (machine/labels).
3. **Animations**:
   - The Booking Loop v2: linear 3-station route with flying envelope-to-calendar morphing token in `HeroMicroDemo.astro`.
   - Footer Trajectory Engine: animated arc in `Footer.astro`.
   - Interactive feature showcase mock panels in `FeatureShowcase.astro`.
4. **Technology constraint maintained**: Astro 4.x SSG, Tailwind CSS v3 + CSS custom properties, self-hosted `@fontsource/*`, vanilla JS only, zero animation libraries.

**Supersedes**: WD-003 (the strict "no purple/violet" rule is superseded by the new dual-accent sky/violet palette); WD-007b (microdemo layout updated to linear 3-station route).
**Status**: Active.
**Date**: 2026-09-03

### WD-031 — Enterprise lexicon: B2C self-serve vocabulary is banned site-wide
**Decision (founder directive, 2026-09-02)**: SyncLead sells mission-critical outbound
infrastructure, not a low-ticket productivity tool. A migrating customer is moving their entire
revenue engine. Every button, input and micro-copy must therefore read as an exclusive, high-ticket
partnership. The site actively **disqualifies** tyre-kickers rather than maximising sign-up volume.

**Kill list — forbidden strings** (now enforced in [`site-spec.md §9A.1`](site-spec.md)):

| Forbidden | Why it costs us |
|---|---|
| `Start Free Trial` / `Free for 14 Days` / `Start 14-Day Trial` | Attracts tyre-kickers and prices the product as disposable |
| `Cancel Anytime` / `Cancel in one click` | Gym-membership framing — signals we expect churn and are anxious about it |
| `Sign Up` | Passive, generic, and describes a form rather than an outcome |
| `No Credit Card Required` | Infrastructure buyers expect to pay; the line advertises that we do not expect to be paid |

**Approved lexicon**:

| Use | Signals |
|---|---|
| `Audit Our Stack` | Expert consultation; authority |
| `Deploy Your Workspace` | Heavy-duty infrastructure, not a web-app login |
| `Claim a Founding Team Spot` | Exclusivity and scarcity |
| `Book a Migration Call` | We do the heavy lifting for high-value clients |

**Why this is a reframe and not a new claim**: identical facts, inverted framing — the same logic
as WD-016. The 14-day money-back guarantee still exists and is still published in the Refund
Policy; cancellation is still self-serve. What changed is that the site no longer *leads* with
those reassurances. Risk reversal that shouts becomes a signal that risk is expected. A buyer who
wants the commercial terms finds them in the policy, which is the more credible place for them to
live anyway. **WD-004 is unaffected** — nothing here adds a claim.

**Deliberate consequence, stated plainly**: this will reduce top-of-funnel volume. That is the
intent, not a side effect. If the founder later wants self-serve volume back, this decision has to
be reversed explicitly rather than eroded one button at a time.

**Also fixed under this decision**: the Pro tier pill read `Most Popular`. Pre-launch, that is an
adoption claim with no data behind it — a §9A.1 breach that had been sitting in plain sight since
the pricing section was built. It is now `Recommended`, which is a vendor opinion and needs no
evidence.

**Supersedes**: WD-006 (site-wide CTA pair) entirely; WD-020 (navbar `Audit Your Stack`);
WD-009's *placement* — the cancel-in-one-click card in pricing is replaced by a
commercial-terms card pointing at the Refund Policy.
**Status**: Active.
**Date**: 2026-09-02

### WD-001 — Technology stack is locked
**Decision**: Astro 4.x (`output: 'static'`), Tailwind CSS v3, `@fontsource/inter` self-hosted, vanilla JS only.
**Excluded, deliberately**: React/Vue/Svelte, GSAP/Framer Motion/anime.js, Google Fonts CDN, SSR, API routes, Cloudflare Functions, `sharp`.
**Rationale**: A marketing site's job is to load fast and be trivially cacheable at the edge. A framework runtime buys nothing here and costs LCP. Self-hosted fonts remove a third-party round trip and a GDPR question.
**Status**: Active. Any request that implies a library needs an explicit stack-change decision.

### WD-002 — Static output to Cloudflare Pages
**Decision**: Build command `npm run build`, output `dist/`, NODE_VERSION 20, no functions.
**Consequence**: Anything needing a server (form POST handling, dynamic pricing) must go to an external service or the main API — it cannot be added to this project.
**Status**: Active. Contact form currently has no endpoint (see §3.6).

### WD-003 — Brand palette: navy + sky blue + white
**Decision**: `#0B1D33` navy, `#8ECAE6` sky, `#FFFFFF` white, plus greys and semantic states. **No purple/violet, zero exceptions.**
**Rationale**: Derived from the SyncLead logo. An earlier revision used generic SaaS blue `#1E9AF5` and violet `#6C47FF`; both were off-brand and removed.
**Status**: Active, but see WD-013 — the real logo artwork does not match these values.

### WD-004 — Claim integrity (the governing content rule)
**Decision**: The site may only state claims that are verifiable today. SyncLead is pre-launch/private beta: **no SOC 2, no G2 award, no referenceable customers, no usage metrics.** Fabricated social proof is banned outright, not softened.
**Rationale**: Three converging reasons — (1) a false SOC 2 claim is a deal-killer in procurement and carries real legal exposure; (2) buyers in cold-outreach tooling have high exposure to fake testimonials and discount them to zero or worse; (3) an explicit "we have no published results yet" admission buys credibility for every other claim on the page.
**Enforcement**: banned-string table in [`site-spec.md §9A.1`](site-spec.md); permitted claims with their evidence in [`project-context.md §5`](project-context.md); grep gate in the role validation checklist.
**Status**: Active. **This decision outranks visual completeness** — leave a section reshaped or absent rather than filling it with invention.
**Date**: 2026-09-01

### WD-029 — Legal pages are verbatim founder text on a dedicated layout
**Decision**: Build `/terms`, `/privacy`, `/acceptable-use` and `/refund` from the four
plain-text documents supplied in `synclead_site/bin/`, reproduced **verbatim**, on a shared
[`LegalLayout.astro`](../src/layouts/LegalLayout.astro). Prose styling is a single `.legal-prose`
block in `global.css` §4c.

**Why verbatim, and why that is different from every other copy rule here**: WD-004 and §9A govern
*marketing* claims — copy the site chooses to make. A legal document is not copy, it is the
instrument the company is bound by. Editing a clause so it matches a pricing page changes what
SyncLead has contractually promised. So the normal instinct of this role — reconcile the wording
with the evidence ledger — is **wrong here**. Where a policy and the site disagree, the resolution
is escalation, not an edit. Disagreements found are logged in §3.11.

**Why a layout rather than four standalone pages**: all four share the same shape (hero, revision
stamp, prose, company block, cross-links). Four copies of that shape drift — one gains a stamp,
another loses the company block, and the set stops reading as one legal corpus. The document list
lives in the layout, so a fifth policy updates the cross-link row on all of them.

**Why `.legal-prose` and not utility classes**: Tailwind's typography plugin is deliberately absent
(WD-001, design-tokens §3.4) and per-element utilities cannot express a reading rhythm across a
2,000-word document. Spec'd in design-tokens §3.7. No raw hex (WD-014).

**Deliberate omissions**:
- **No `CTASection`** on these pages. A conversion band under a refund policy reads as a sales
  pitch stapled to a contract, and these are the pages someone lands on when they are looking for
  the cancellation clause. The navbar CTA is still there via `PageLayout`.
- **No `data-reveal`**. Legal text must be readable the instant it loads, including for someone
  arriving mid-document from a deep link. A fade-in on a policy page is decoration in the wrong
  place.
- **No `/security` or `/data-processing` page** — see WD-030.

**Status**: Active.
**Date**: 2026-09-01

### WD-030 — Dead footer links removed, not left as `#`
**Decision**: The footer Legal column now lists exactly the four documents that exist. The former
`Security` and `Data Processing` entries — both `href="#"` with `TODO` comments — were **deleted**.
**Rationale**: a placeholder link is worse than a missing one. It looks like a page a buyer can
check, and the click that goes nowhere is the moment the whole footer stops being believable —
which matters most in the exact column where the company is asserting its legitimacy. The
data-processing content an enterprise buyer actually wants (sub-processors, retention,
international transfers) is already in the Privacy Policy §5, §6 and §9.
**Not a cancellation of the `/security` page**: it is still wanted and still the thing the removed
SOC 2 badge was standing in for. It stays open at §3.6, now without a broken link advertising it.
**Status**: Active.
**Date**: 2026-09-01

### WD-016 — Positioning: exclusive infrastructure, not unfinished beta
**Decision**: Drop "private beta / design partners" language site-wide in favour of **Founding Teams**. Stage markers become `Onboarding founding teams`, not `Private beta`.
**Rationale (founder brief, 2026-09-01)**: "beta" and "design partner" both signal *unfinished* and invite a discount conversation. "Founding team" signals *early access to something valuable* and supports a high-ticket B2B infrastructure position. Same facts, inverted frame.
**Supersedes**: the design-partner framing introduced alongside WD-004.
**Important**: this is a **framing** change, not a licence to claim more. WD-004 still binds — nothing added here asserts a customer, metric or certification. What was removed was the *apology*, not the honesty. The explicit "we have no published case studies" sentence is gone because leading with a limitation undercuts a premium offer, not because it stopped being true.
**Status**: Active.
**Date**: 2026-09-01

### WD-017 — Hero CTA is a zero-friction domain capture
**Decision**: Replace the hero button pair with an inline form — `yourcompany.com` → `Generate My Sequence` — submitting as `GET ?domain=` to the app signup. The walkthrough CTA drops to a quiet text link beneath.
**Rationale**: asking for a domain converts better than asking for a signup, and it starts a conversation the product can act on.
**Implementation**: real `<form action method="get">`, so it works without JS. A small script normalises free text to a bare hostname before submit — strips scheme, `www.`, credentials, port, path/query/fragment, and takes the domain half of a pasted email. Rejects anything not matching `host.tld` with an inline validation message rather than sending junk onward.
**⚠️ Dependency**: the app must read `?domain=` and actually generate a sequence. Until it does, the hero promises something the product does not deliver — which would breach WD-004. See §3.9.
**Status**: Active, **contingent on the app side landing**.
**Date**: 2026-09-01

### WD-019 — `solid` button variant for light-surface CTAs
**Decision**: Add a fourth `Button` variant `solid` — `bg-dark-900 text-white hover:bg-dark-800 hover:shadow-glow-sky`. Use it for CTAs on **light surfaces only** (grey-100, white) where the gradient `primary` washes out.
**Rationale**: The `primary` variant's `bg-gradient-cta` (navy→sky) fails contrast on light surfaces — the sky-blue end merges with the background. A solid dark fill commands the page and passes WCAG AA contrast. `primary` is retained for dark-section CTAs (CTASection, hero, navbar) where the gradient reads well — the sky-blue end provides needed contrast against the dark background.
**Applied to**: FoundingTeams CTA. **Not** Navbar/MobileMenu — those use `primary` because `solid` (bg-dark-900) disappears into the dark navbar/mobile menu backgrounds.
**Status**: Active.
**Date**: 2026-09-01

### WD-025 — CTASection cursor spotlight
**Decision**: Add a lightweight pointer-reactive spotlight and grid to `CTASection`, matching the hero's interaction idiom. A 420px sky-blue radial spotlight follows the cursor, plus a 56px grid revealed around the cursor via mask-image. Both driven by CSS custom properties (`--cta-mx`, `--cta-my`, `--cta-active`) written by a single rAF-throttled `pointermove` listener.
**Pattern**: Same as the hero's cursor layer (WD-010) but simpler — no tilt, no parallax, no particles. Self-contained `<script>` block (the hero's listener is in HeroSection; this one is in CTASection — they don't share state).
**Gating**: Disabled for `prefers-reduced-motion` and `(hover: none), (pointer: coarse)`, enforced in both CSS (`display: none`) and JS (early return).
**Status**: Active.
**Date**: 2026-09-01

### WD-028 — Premium polish layer: elevation ladder + micro-interactions
**Decision**: Introduce a shared polish layer in `global.css` §4b plus two new shadow tokens, and adopt them across the light-surface components. Nothing here changes copy, layout or claims — it is entirely surface treatment.

**What was added**:
- **Two-layer shadow tokens** `--shadow-card-hover` and `--shadow-elevated` (design-tokens §1.7). Each pairs a tight contact shadow with a wide ambient one. A single flat blur is what makes a card look templated; the two-layer pair is what reads as considered.
- **`.card-lift`** — light cards rise 4px, take `--shadow-card-hover`, and pick up a sky-tinted border on hover. Adopted by `Card.astro` via a new `lift` prop (default `true`), plus the Pricing risk-reversal row and the AI cards.
- **`.card-lift-glass`** — glass cards on dark surfaces *brighten* instead of lifting a shadow, because a shadow over dark navy renders as nothing.
- **`.btn-base`** — 1px rise on hover, press-down on `:active`, applied to every `Button` variant. Replaces the blanket `transition-all`, which animated properties it had no business animating.
- **`.nav-link`** — sky underline scaling from the left via a pseudo-element, so it never affects layout. Adopted by the navbar links and all three footer link columns.
- **`.section-seam`** — a 1px sky-tinted gradient hairline on the top edge of dark sections (`MetricsBand`, `CTASection`, `Footer`). Reads as a deliberate seam rather than an abrupt colour change.
- **`.tabular`** — tabular numerals for prices and the numbered pillars, so digits align in columns.
- **Icon containers standardised** to 44px `rounded-full` (from 40px `rounded-btn`) across FoundingTeams, AIInsights and MetricsBand, extending WD-022's reasoning to every icon on the page rather than one section.
- **Pro pricing tier** offset `md:-mt-4 md:mb-4` so the highlighted plan physically breaks the grid line.
- **`.browser-frame`** promoted from `--shadow-card` to `--shadow-elevated`.

**Rationale**: The page was correct but flat — every surface sat at the same depth and nothing responded to the pointer. Perceived production value in B2B SaaS comes mostly from consistent elevation, restrained motion on hover, and typographic detail like tabular numerals, none of which require new content or layout risk.

**Constraint honoured**: CSS-only, no library (WD-001), no raw hex (WD-014 — all new values use channel tokens or `var()`), and every transform/transition collapses under `prefers-reduced-motion`.

**Status**: Active. New surface treatments should reuse these utilities rather than declaring one-off hovers.
**Date**: 2026-09-01

### WD-026 — Hero trust badge: "Microsoft Partner" replaces OAuth line
**Decision**: Replace the hero trust row's first pill from `Microsoft 365 & Google OAuth — never your password` with `Microsoft Partner`, using the four-colour Microsoft logo SVG.
**Evidence**: Founder confirmed Microsoft Solutions Partner status. Badge asset to be supplied.
**Claim safety**: "Microsoft Partner" is factually correct per the founder's confirmation. The four-colour logo is the standard Microsoft brand mark. This is a stronger trust signal than the OAuth line it replaces. The OAuth fact is still true but is now a technical detail rather than a trust badge.
**Supersedes**: §3.2 (open decision) — now resolved.
**Status**: Active.
**Date**: 2026-09-01

### WD-027 — Footer bottom bar: company registration details
**Decision**: Replace the footer tagline ("For revenue teams that measure success in meetings, not sent counts.") with SyncLead Ltd company registration details: company number, registered address, support and privacy email addresses.
**Content**: `SYNCLEAD LTD · Company Number: 15903993` | `20 Wenlock Road, London, England, N1 7GU` | `Support: contact@synclead.io` | `Privacy: privacy@synclead.io` | `© 2026 SyncLead Ltd. All rights reserved.`
**Rationale**: Company registration details are a legal requirement in the UK (Companies Act 2006) and signal legitimacy to enterprise buyers. The tagline was nice copy but added no trust value in the footer — the registration info does.
**Status**: Active.
**Date**: 2026-09-01

### WD-020 — Navbar CTA text: "Audit Your Stack"
**Decision**: Change the navbar CTA from `Start Free Trial` to `Audit Your Stack` in both desktop and mobile menu.
**Rationale**: The entire page has been repositioned around the Founding Teams exclusivity offer (WD-016). "Start Free Trial" is generic SaaS self-serve language that creates cognitive dissonance with the premium "let us rebuild your outbound" positioning. "Audit Your Stack" aligns the navbar with the FoundingTeams CTA and signals a consultative, high-value action.
**Supersedes**: WD-006 site-wide CTA pair (partially) — the navbar no longer uses the primary CTA pair. `CTASection` and hero retain their own CTAs.
**Status**: ⛔ **Superseded by WD-031.** The direction was right; the destination was wrong. The
navbar points at app signup, so a consultative label there sent an audit-seeker into a
self-provisioning flow. The navbar is now `Deploy Your Workspace`; `Audit Our Stack` belongs on
`/contact` targets only.
**Date**: 2026-09-01

### WD-021 — FoundingTeams lead paragraph constrained to max-w-2xl
**Decision**: The lead paragraph ("We are exclusively onboarding…") gets `max-w-2xl mx-auto` (672px) instead of inheriting the parent `max-w-3xl` (768px).
**Rationale**: At 768px the paragraph creates ~95-character lines — above the readable 65–75 range. Constraining to 672px brings line length to ~75 chars, improving scan-and-read without changing the visual hierarchy (the H2 keeps `max-w-3xl`).
**Status**: Active.
**Date**: 2026-09-01

### WD-022 — FoundingTeams card icons: solid sky circle with navy check
**Decision**: Change the card icon containers from `rounded-btn bg-brand-sky-light/50` (faint tint, square-ish) to `rounded-full bg-brand-sky` (solid sky-blue circle). Check SVG fill stays `var(--color-navy)`.
**Rationale**: The original 40px container with a 20px check on a near-transparent background looked like a floating bullet point — too light, no visual mass. A solid sky-blue circle gives the icon structural weight and creates a consistent visual anchor across all three cards. Navy-on-sky passes contrast checks.
**Status**: Active.
**Date**: 2026-09-01

### WD-023 — FoundingTeams background: white, not grey-100
**Decision**: Change `FoundingTeams.astro` from `bg-grey-100` to `bg-white`.
**Rationale**: FoundingTeams and PricingSection both used `bg-grey-100`, creating a visual merge — the two sections blended into one undifferentiated block with no boundary. Changing FoundingTeams to `bg-white` restores the alternating rhythm: AI section (sky gradient) → FoundingTeams (white) → Pricing (grey-100). The white cards inside FoundingTeams still read cleanly via `shadow-card` and `border border-grey-300`.
**Status**: Active.
**Date**: 2026-09-01

### WD-024 — Badge `sky` variant border opacity: 30% → 50%
**Decision**: Increase the `sky` badge border from `border-brand-sky/30` to `border-brand-sky/50`.
**Rationale**: At 30% opacity the sky-blue border on a grey-100 background was nearly invisible — it looked like a rendering artifact rather than an intentional design element. 50% is still subtle but clearly reads as a deliberate outline. The PRICING eyebrow badge in particular looked broken at 30%.
**Status**: Active.
**Date**: 2026-09-01

### WD-018 — `TestimonialGrid.astro` → `FoundingTeams.astro`
**Decision**: Rename the component to match what it now is. Third identity for this slot: fabricated testimonials → design-partner programme → founding-teams offer.
**Rationale**: the previous note said to keep the filename for section-order stability, but a file called `TestimonialGrid` containing no testimonials is a trap for the next agent — exactly the kind of thing §4 exists to prevent. Cheaper to rename now than to explain forever.
**Status**: Active. Old file deleted; `index.astro` import updated.
**Date**: 2026-09-01

### WD-005 — Positioning: problem-first, not aspiration-first
**Decision**: Lead with the two failure modes the product prevents (burnt sending domains, calendar drop-offs) rather than an aspirational outcome. Locked copy in [`site-spec.md §9A.3`](site-spec.md).
**Supersedes**: the original `Pipeline That Books Itself.` hero, which was aspirational and did not name a problem.
**Consequence**: H1 renders at `--text-display-l-*` (56px desktop), not display-XL (72px) — the longer string overflowed at 72px. `--text-display-l-*` gained responsive steps as a result.
**Status**: Active.
**Date**: 2026-09-01

### WD-006 — Site-wide CTA pair
**Decision**: Primary `Build a Sequence (Free for 14 Days)`. Secondary `Book a 20-Min Walkthrough`.
**Rationale**: The primary names the first action and the risk boundary in one line. The secondary replaced `Watch Demo`, which pointed at a video that does not exist — a dead-end CTA is worse than none.
**Status**: ⛔ **Superseded by WD-031.** Both labels are now banned strings: the primary named a
free trial, and "20-Min Walkthrough" priced the conversation by the minute, which is the opposite
of a migration engagement. The CTA band now runs `Claim a Founding Team Spot` +
`Deploy Your Workspace`. Previously marked partially superseded by WD-017 (hero only).
**Date**: 2026-09-01

### WD-007b — Hero shows a looping micro-demo, not a screenshot
**Decision**: The hero frame contains a CSS-only 9-second looping demo of the core loop — step sends → prospect replies and the sequence stops → calendar slot fills and the meeting confirms. Replaces the static `dashboard-overview.svg`.
**Rationale (founder brief)**: prove "pipeline that books itself" visually rather than showing a flat UI. A screenshot shows *a product*; the loop shows *the mechanism*.
**Implementation**: [`HeroMicroDemo.astro`](../src/components/hero/HeroMicroDemo.astro). Every element animates on the same 9s timeline with staggered percentage stops, so phases stay in lockstep without a JS scheduler — no library (WD-001), no `setInterval` drift. Under `prefers-reduced-motion` all animation is dropped and **phase 3 renders as a static end state**, so a reduced-motion user still sees the outcome rather than an ambiguous frame.
**Note**: it depicts real product behaviour and asserts no numbers, so it stays inside WD-004.
**Status**: Active. Superseded WD-007's numbering only by adjacency — WD-007 (integration trust band) is unaffected and still Active.
**Date**: 2026-09-01

### WD-007 — Trust is borrowed from integrations, not from customers
**Decision**: The post-hero band lists real integrations (Microsoft 365, Google Workspace, HubSpot, Stripe, SMTP/IMAP) with the OAuth-not-password line, replacing the fake customer logo strip.
**Rationale**: These are verifiable in the API today and the OAuth point is a genuine differentiator over tools that ask for app passwords.
**Status**: Active. When real logos are permitted, add a customer strip *in addition* — do not delete the integration band.
**Date**: 2026-09-01

### WD-008 — Explain mechanisms, don't assert outcomes
**Decision**: Where metrics are unavailable, describe how the product works (sending pools, DNS monitoring, reply/no-show handling) instead of what it achieves.
**Consequence**: [`AnimatedCounter.astro`](../src/components/ui/AnimatedCounter.astro) is retained but **unused**. It is not dead code to be deleted — it is waiting for real aggregates.
**Status**: Active.
**Date**: 2026-09-01

### WD-009 — Risk reversal replaces "no credit card required"
**Decision**: Pricing carries three commitments SyncLead controls: Stripe handles payments (cards never touch SyncLead servers), cancel in one click, export your data any time.
**Rationale**: "No credit card required" was unverified against the actual trial flow. The replacements are all true and address the same anxiety.
**Status**: 🟡 Partially superseded by **WD-031**. The Stripe and data-export cards stand. The
`Cancel in one click` card is replaced by `Commercial terms in writing`, linking to the Refund
Policy. The fact did not change — cancellation is still self-serve — but a cancellation promise
sitting in the pricing grid frames the purchase as one the buyer will want to undo. The Refund
Policy carries the same commitment with more authority. §3.4 remains open regardless.
**Date**: 2026-09-01

### WD-010 — Cursor interaction: CSS variables driven by one rAF listener
**Decision**: Pointer effects are implemented as CSS custom properties written by a single rAF-throttled `pointermove` handler; all animation is CSS. Full contract in [`site-spec.md §5.3.1`](site-spec.md).
**Rationale**: Satisfies WD-001 (no animation library) while keeping JS off the animation path. A cached `getBoundingClientRect()` refreshed on resize/scroll avoids layout reads inside the frame callback.
**Constraints deliberately chosen**: frame tilt capped at ±5° (more makes the dashboard unreadable); gating enforced **twice** — CSS `display:none`/`transform:none` *and* an early `return` in JS — so coarse-pointer devices never pay the handler cost.
**Status**: Active. Any new pointer effect must follow the same variable contract and gating.
**Date**: 2026-09-01

### WD-011 — One shared reveal observer
**Decision**: The `[data-reveal]` IntersectionObserver lives once in [`BaseLayout.astro`](../src/layouts/BaseLayout.astro). Components must not create their own.
**Exception**: `AnimatedCounter`'s stepping script (self-contained, idempotent).
**Status**: Active.

### WD-012 — All logo output goes through `Logo.astro`
**Decision**: No component may reference a logo file path. [`Logo.astro`](../src/components/ui/Logo.astro) takes `variant` + `surface` and resolves the asset.
**Rationale**: Three call sites already needed the same choice, and the light-surface variant will be needed for future pages. Centralising also means the WD-013 colour decision is a one-file change.
**Also**: uploaded filenames containing spaces and parentheses were normalised — they break in URLs and CI paths.
**Status**: Active.
**Date**: 2026-09-01

### WD-013 — Logo artwork colours conflict with the token palette (UNRESOLVED)
**Observation**: supplied artwork uses `#1093ef` for the icon and `#000000` for the light-surface wordmark. Tokens specify `#8ECAE6` and `#0B1D33`. The logo therefore reads brighter and more saturated than every accent on the site.
**Cause**: the palette was reverse-engineered from a logo raster before vector files existed.
**Decision so far**: render the artwork **as supplied, unmodified**, and escalate rather than silently changing either side.
**Status**: 🔴 Open — see §3.1. Do not unilaterally edit tokens or artwork.
**Date**: 2026-09-01

### WD-014 — No raw hex in templates
**Decision**: Hex values live only in `tokens.css` and `tailwind.config.mjs`. Templates use token classes or `var()`. Alpha composition uses the channel tokens `--color-sky-rgb` / `--color-navy-rgb` / `--color-white-rgb` (design-tokens §1.3b), added for the cursor layer.
**Status**: Active.

### WD-015 — The harness maintains itself
**Decision**: Every task that changes behaviour, copy, or a decision must update this memory bank and any affected spec section **in the same task**, before reporting completion. Protocol in [`roles/role-code.md`](roles/role-code.md).
**Rationale**: The spec had silently drifted from the code across ten sections in a single working session — including a missing `og-image.png` that nobody noticed, and fabricated copy sitting in an unbuilt page spec ready to be reintroduced. Documentation that lags is worse than none, because it gets trusted.
**Status**: Active.
**Date**: 2026-09-01

---

## 2. Change History

Newest first. Record **what was there, what replaced it, and why** — the "why" is the part that
stops the change being undone by a later agent.

### 2026-09-05 (latest) — Pricing & Billing Architecture, Dedicated Pricing Page, Roadmap Page & Global Navigation (WD-039)

Founder directive:
1. **Pricing & Mailbox Realignment (from `Pricing and Billing (13).pdf`)**:
   - Realigned `PricingSection.astro` to official founder billing specification:
     - Pro ($149/mo): 50 connected mailboxes & sending domains (was 10), 125,000 monthly verified email sends (was 15k), 25k contacts, 7,500 monthly plan credits.
     - Scale ($399/mo): 250 connected mailboxes & sending domains (was 25), 600,000 monthly verified email sends (was 50k), 125k contacts, 35k monthly plan credits, full agency controls, 90-day activity log retention.
     - Enterprise (Custom): Unlimited mailboxes, 1.5M+ monthly verified email sends, 100k monthly plan credits, 5 included isolated agency workspaces, 180-day activity log retention.
   - Removed legacy trial subtext in pricing cards (`14-day full access · No CC required`) and replaced with `Unlimited team members · Stripe billing`.
2. **Created Dedicated `/pricing` Page (`src/pages/pricing.astro`)**:
   - Built full Dark Cinema v2 pricing architecture featuring hero, anchor navigation, 3-tier high-leverage cards, comprehensive 6-category feature comparison matrix mapping 100% of founder specifications from the PDF, modular credit economics card breakdown, and 6 technical FAQs.
3. **Created Dedicated `/roadmap` Page (`src/pages/roadmap.astro`)**:
   - Built authoritative engineering roadmap prioritized strictly by strategic importance:
     1. AI Auto Replies & Objection Handling (Q3, 2026 · Staging / Active Rollout)
     2. Autonomous AI SDR Agents (Q4, 2026 · Active Sprint)
     3. Deep Account & Prospect Research Agents (Q1, 2027 · In Development)
     4. Full Agency Controls & Multi-Tenant Portals (Q1, 2027 · Planned)
     5. Mailbox Placement & Deliverability Warmup Suite (Q2, 2027 · Planned)
     6. SyncLead MCP (Model Context Protocol) Server (Q3, 2027 · Next-Gen Tooling)
   - Shipped infrastructure foundations card grid highlighting 5 operational production capabilities.
   - Engineering collaboration architecture request card with direct mailto link.
4. **Global Navigation Wiring**:
   - Connected `Navbar.astro` and `MobileMenu.astro` with live `/pricing` and `/roadmap` links.
   - Updated `Footer.astro` to point `Pricing` to `/pricing` and `Roadmap` to `/roadmap`.
   - Connected `AIInsightsSection.astro` "View Our Product Roadmap" secondary CTA directly to `/roadmap`.

| Was | Now | Where |
|---|---|---|
| Pro: 10 mailboxes / 15k sends; Scale: 25 mailboxes / 50k sends ($299) | Pro: 50 mailboxes / 125k sends; Scale: 250 mailboxes / 600k sends ($399) | `PricingSection.astro` |
| Banned trial subtext in pricing cards | `Unlimited team members · Stripe billing` | `PricingSection.astro` |
| No dedicated `/pricing` page (only home anchor `/#pricing`) | Full `/pricing` page with feature comparison matrix & credit economics | `src/pages/pricing.astro` |
| No dedicated `/roadmap` page (`/#ai` fallback) | Full prioritized `/roadmap` page (Q3 2026 – Q3 2027) | `src/pages/roadmap.astro` |
| Header and footer links to `/#pricing` and `/#ai` | Clean links to `/pricing` and `/roadmap` | `Navbar.astro`, `MobileMenu.astro`, `Footer.astro`, `AIInsightsSection.astro` |

### 2026-09-05 (earlier) — Careers Page, Press Kit, Intent Score Suppression & Roadmap (WD-038)

Founder directive:
1. **Created `/careers`**: Full-fidelity Dark Cinema careers page accepting applications for Backend & Cloud, Frontend Architecture, and Technical GTM via `careers@synclead.io`.
2. **Created `/press`**: Downloadable vector logos (`logo-icon.svg`, `logo-full-on-dark.svg`, `logo-full-on-light.svg`, `favicon-64.png`), company boilerplate, color tokens, and `press@synclead.io`.
3. **Hidden Intent Scores in AI Section**: Removed `intent-score-badge` from lead list items in `AIInsightsSection.astro`.
4. **Footer navigation updated**: Added `Roadmap` link, hidden `Founding Teams`, linked `/careers` and `/press`.

| Was | Now | Where |
|---|---|---|
| Unbuilt placeholder links `#` for Careers & Press Kit | Live pages `/careers` and `/press` | `src/pages/`, `Footer.astro` |
| `Founding Teams` link in footer | Hidden per founder instruction | `Footer.astro` |
| Numerical intent scores (98/100, etc.) in AI section | Scores hidden; status tags retained | `AIInsightsSection.astro` |
| No Roadmap link in footer | `Roadmap` linked under Product | `Footer.astro` |

### 2026-09-05 (earlier) — Official Social Icons & Channels in Footer (WD-037)

Founder directive:
1. **Replaced emoji-like placeholder icons**: Replaced crude line-stroke X and LinkedIn icons with authentic official vector marks in `Footer.astro`.
2. **Production social profile links**: Updated hrefs from `#` to `https://x.com/syncleadio` and `https://www.linkedin.com/company/synclead/` with secure target and rel attributes.

| Was | Now | Where |
|---|---|---|
| Crude diagonal line "X" and box "in" with `href="#"` | Official X and LinkedIn filled vector glyphs with live profile URLs | `Footer.astro` |

### 2026-09-05 (earlier) — Legal Corpus & Editorial Design Overhaul (WD-036)

Founder directive:
1. **Legal Layout upgraded to Dark Cinema**: Replaced the stark white 90s-style document container (`sec-white` / `sec-paper`) with Dark Cinema v2 architecture. The entire reading canvas now flows seamlessly with `#05080F` page base, `#0A0F1D` elevated container with glass borders, and subtle top ambient cyan glow.
2. **Invisible text contrast bug resolved**: Fixed the unstyled `<address>` block which previously inherited near-white `#E8EDF7` body color onto light backgrounds. Styled it as an executive verification card with glowing live status pill, `#E2E8F0` body text, and sky blue mailto links.
3. **Enterprise sticky sidebar & TOC navigation**: Added a dual-column layout featuring a sticky sidebar with a Legal Suite switcher, scroll-tracking Table of Contents with clause numbers and active section highlighting via `IntersectionObserver`, and a compliance desk card. On mobile screens (<1024px), added a collapsible quick-jump drawer.
4. **Editorial prose styling (`.prose-cinema` & `.legal-prose`) in `global.css`**: Configured high-contrast `#CAD5E8` text, glowing sky-blue bullet markers, smooth scroll margins (`scroll-margin-top: 120px`), blockquotes, and code styling, providing a ready-to-use typography foundation for the upcoming blog.
5. **Verbatim text preservation**: Standardized all 4 legal pages (`privacy.astro`, `terms.astro`, `acceptable-use.astro`, `refund.astro`) with semantic heading IDs and structured TOC data, keeping 100% of founder legal text verbatim.

| Was | Now | Where |
|---|---|---|
| Stark white box (`sec-white`) + unstyled narrow column | Dark Cinema v2 canvas (`bg-bg-0` / `bg-bg-1`) with glass borders & ambient glow | `LegalLayout.astro` |
| Low contrast / invisible `<address>` text | Executive corporate verification card with high contrast `#E2E8F0` & sky links | `LegalLayout.astro`, `global.css` |
| Plain text dump with no in-page navigation | Sticky sidebar with Legal Suite switcher & scroll-tracking Table of Contents | `LegalLayout.astro`, all 4 legal pages |
| 90s blog styling in `.legal-prose` | Luxury editorial typography system (`.legal-prose`, `.prose-cinema`) | `global.css` |

### 2026-09-03 (earlier) — Mailbox Exclusivity in Infrastructure & Custom SMTP with Coming Soon (WD-035)

Founder directive:
1. **InfraSection Core Domain Immunity box removed**: The center "CORE DOMAIN IMMUNITY / yourcompany.com" card was removed. Replaced domain references (`outreach-sl.io`) with strictly connected sending mailboxes, aligning with SyncLead's mailbox-only connection architecture. Added a 3rd row of mailboxes to fill the remaining visual space (now 6 mailboxes in a balanced 3×2 grid) and cleaned up health scores to remove flame emojis.
2. **LogoBar WordPress & Wix replaced with Custom SMTP**: Replaced `WordPress & Wix` with `Custom SMTP` (`code: 'SMTP'`, tag: `Any SMTP / IMAP provider`) and added a prominent "Coming Soon" pill bubble positioned at the bottom right in `LogoBar.astro`.
3. **Hero Scroll clearance**: Eliminated overlap between the booking confirmation card and the "Scroll" indicator by setting `.cascade-front` top to `48px` and increasing `.stage-par` bottom padding to `128px`.

| Was | Now | Where |
|---|---|---|
| Core Domain Immunity card + 4 entries (incl. domain `outreach-sl.io`) | 6 connected mailboxes (Google, Microsoft 365, Outlook) in 3×2 grid with clean 100% scores | `InfraSection.astro` |
| `WordPress & Wix` integration card | `Custom SMTP` card with bottom-right `Coming Soon` badge | `LogoBar.astro` |
| `Scroll` text touching bottom edge of hero floating card | Floating card lifted 20px, `.stage-par` bottom padding 128px | `HeroSection.astro` |

### 2026-09-03 (earlier) — "Start Trial" Purged & Locked, Hero Collision Fixed, Real App Journeys Integrated (WD-034)

Founder directive:
1. **"Start Trial" banned and replaced with "Get Started"**: Stripped all "Start Trial" / "Start 14-Day Trial" strings site-wide. Placed under permanent lock in WD-034. Zoo and future agents are strictly forbidden from reintroducing trial phrasing unless explicitly instructed by the founder AND approval is requested/granted first.
2. **Hero visual collision glitch resolved**: The scheduling box (`.cascade-front`) had collided with the trust pills row (`Migration handled by our engineers`). Fixed by anchoring `.cascade-front` using `top: 68px; right: -8px`, setting `.stage-frame` min-height to 440px, and increasing `.stage-par` top margin to 92px with 72px bottom padding.
3. **Integrated verified application journeys from PDF (`Synclead - Journeys (2).pdf`)**:
   - Deliverability & Inboxes: Connected accounts table showcasing Google Workspace, Microsoft 365, and Outlook accounts with 100% 🔥 Health Score, daily caps, and Workspace Blocklist protection (`HeroSection.astro`, `InfraSection.astro`).
   - Performance Dashboard: Exact verified telemetry (1,842 sends, 98% deliverability, 53 booked, performance funnel, and AI Growth Insights) implemented in `public/images/dashboard-overview.svg`.
   - AI Intent & Growth Insights: Real-time AI Growth Insights card ("Q4 Enterprise reply rates 40% higher on Tuesdays... Triggering follow-up sequence B") with `[Apply Optimization +]` added to `AIInsightsSection.astro`.
   - Integrations: Updated `LogoBar.astro` with Microsoft 365 & Teams, Google Meet, Zoom, HubSpot CRM, and WordPress & Wix from Page 3 of the PDF.

| Was | Now | Where |
|---|---|---|
| `Start 14-Day Trial` ×5 | `Get Started` ×5 | `Navbar.astro`, `MobileMenu.astro`, `HeroSection.astro`, `PricingSection.astro` (Starter + Pro), `CTASection.astro` |
| `14-day full platform access` | `Instant platform access` | `CTASection.astro` |
| Hero front scheduling card protruding upward & colliding with trust badges | Top-anchored cascade with 92px top margin clearance | `HeroSection.astro` |
| Generic secondary domains list | Real Connected Inboxes (Google, Microsoft 365, Outlook) with warmup & 100% 🔥 health scores | `HeroSection.astro`, `InfraSection.astro` |
| Generic SVG dashboard rects | High-fidelity vector replica of verified SyncLead Performance Funnel & AI Growth Insights (Page 11) | `public/images/dashboard-overview.svg` |
| Generic AI stream only | Integrated AI Growth Insights card with real optimization triggers and actions (Page 11) | `AIInsightsSection.astro` |

### 2026-09-03 (earlier) — High-Leverage Outbound Infrastructure Build (WD-033)

Founder build directives applied across all primary landing page sections:
- **Hero**: `Stop Counting Sends. Start Counting Meetings.` with sub-headline, `Start 14-Day Trial (No CC Required)`, trust subtext `Powering 37 active revenue engines.`, and cascading overlapping UI (`HeroSection.astro`).
- **Infrastructure & Deliverability**: `Enterprise-grade infrastructure, without the ops headcount.` with callout `Stop playing Russian roulette with primary domains.` and domain rotation & health cluster visual (`InfraSection.astro`).
- **Campaigns & Scheduling**: `Campaigns engineered for the primary inbox.` with callout `If they reply, it books. If they ghost, it recovers.` and split-screen ghosted bump + scheduling interface (`CampaignsSchedulingSection.astro`).
- **AI & Intent Scoring**: `Intent Scoring is live. Full autonomy is next.` with glowing High Intent UI lead feed and `View Our Product Roadmap` outline button (`AIInsightsSection.astro`).
- **Pricing**: `Built for serious outbound engines.` clean 3-tier structure (Pro $149/mo anchor, Scale $299/mo highlighted/Most Popular, Enterprise Custom) (`PricingSection.astro`).
- **Footer CTA**: `Stop duct-taping your pipeline.` with `Start 14-Day Trial (No CC Required)` (`CTASection.astro`).

| Was | Now | Where |
|---|---|---|
| Aspirational / generic hero mockup | Cascading overlapping UI with Deliverability Dashboard in back & Calendar Booking in front | `HeroSection.astro` |
| Generic feature showcase for deliverability | Dedicated dark-mode secondary domain cluster shielding primary domain | `InfraSection.astro` |
| Separated sequence and calendar features | Integrated split-screen showing ghosted auto-bump and calendar lock-in | `CampaignsSchedulingSection.astro` |
| Basic AI cards | High-fidelity inbox lead stream with glowing High Intent (98%) badges + Roadmap CTA | `AIInsightsSection.astro` |
| Starter $49 / Pro $149 / Enterprise | Pro $149 (Anchor) / Scale $299 (Highlighted) / Enterprise Custom | `PricingSection.astro` |
| Generic footer CTA | `Stop duct-taping your pipeline.` + `Start 14-Day Trial (No CC Required)` | `CTASection.astro` |

### 2026-09-03 (earlier) — Brand design system overhaul (v2): palette, typography & rich animations

Founder directive: adopt the complete visual design language, color palette, self-hosted fonts, and animations from the approved sample prototype while keeping all locked hero copy and section content per WD-004, WD-005, WD-016, WD-017, and WD-031. Decision WD-032.

| Was | Now | Where |
|---|---|---|
| Inter font family | Instrument Sans, Instrument Serif (italic emphasis), JetBrains Mono | Global font configuration (`@fontsource/*`, BaseLayout, tailwind, tokens) |
| Navy `#0B1D33` + Sky `#8ECAE6` only (strict purple ban) | Dark Cinema background scale (`#05080F`–`#141D33`) + Sky `#41C8FF` + Violet `#9D8BFF` | `tokens.css`, `design-tokens.md`, `tailwind.config.mjs` |
| 2-column micro-demo | Linear 3-station Booking Loop v2 with animated flight line and morphing envelope-to-calendar token | `HeroMicroDemo.astro` |
| Static SVG screenshots in FeatureShowcase | Interactive CSS-animated UI mock panels (spintax rotation, live DNS health scan, weekly calendar availability) | `FeatureShowcase.astro` |
| Basic footer links | Footer Trajectory Engine with SVG arc flight, particle trail, morphing icon, and replay controls | `Footer.astro` |
| Standard section spacing | Polished section seams (`.seam`), button elevation ladder, skip links, and interactive cursor spotlight layers | `global.css`, `HeroSection.astro`, `CTASection.astro` |

**Spec sections updated**: §1, §3, §4, §5, §6, §7, §8, §9.
**Build**: `npm run build` exits 0 cleanly. Banned-string grep: 0 hits.

### 2026-09-02 — Enterprise lexicon: B2C self-serve vocabulary stripped site-wide

Founder directive: SyncLead is mission-critical outbound infrastructure, not a $15/month
productivity widget. Trial and cancellation language was telling buyers the product is cheap and
disposable. Decision WD-031; WD-006 and WD-020 superseded, WD-009 partially superseded.

| Was | Now | Where |
|---|---|---|
| `Audit Your Stack` → app signup | `Deploy Your Workspace` | `Navbar.astro`, `MobileMenu.astro` |
| `14-day trial · cancel in one click` (pill 3) | `Migration handled by our engineers` | Hero trust row |
| `…draft an outreach sequence for your market. Free for 14 days.` | `Enter your domain and we will draft an outreach sequence for your market.` | Hero capture hint |
| `Or book a 20-minute walkthrough` | `Or book a migration call` | Hero secondary link |
| `Start 14-Day Trial` ×2 | `Deploy Your Workspace` ×2 | Pricing Starter + Pro CTAs |
| `Contact Sales` | `Book a Migration Call` | Pricing Enterprise CTA |
| `Most Popular` | `Recommended` | Pricing Pro pill |
| `Simple pricing that scales with your pipeline` / `Free for 14 days. Upgrade when the meetings start landing.` | `Pricing that scales with your revenue engine` / founding-rate lock line | Pricing header |
| `For solo SDRs getting started` / `For growing GTM teams` | `For solo operators running their own outbound` / `For GTM teams replacing a fractured stack` | Pricing tier subtitles |
| `Cancel in one click.` card | `Commercial terms in writing.` → links to `/refund` | Pricing risk-reversal row |
| `Audit Our Outbound Stack` → `/contact` | `Claim a Founding Team Spot` | FoundingTeams CTA |
| `Build a Sequence (Free for 14 Days)` + `Book a 20-Min Walkthrough` | `Claim a Founding Team Spot` (→ `/contact`) + `Deploy Your Workspace` (→ app signup) | `CTASection` |
| `…put qualified meetings on the calendar. Free for 14 days.` | `…put qualified meetings on the calendar. Now onboarding founding teams.` | `index.astro` meta description |

**Why the facts did not change but the framing did**: the 14-day money-back guarantee is still
real and still published in the Refund Policy; cancellation is still self-serve from billing
settings. What was removed is the *advertising* of those reassurances on the conversion surfaces.
Risk reversal that shouts tells the buyer risk is expected. Nothing was added, so WD-004 is
untouched.

**Why the CTA band swapped its button order semantics**: the primary now points at `/contact`
rather than app signup. A founding-team spot is granted on a call, not self-provisioned — sending
`Claim a Founding Team Spot` into a signup form would have been a promise the flow does not keep,
the WD-004 failure mode pointed forward in time. Self-serve is still available as the secondary.

**One genuine claim breach caught in passing**: the Pro tier pill said `Most Popular`. Pre-launch
there is no adoption data, so that was a §9A.1-class fabrication that had been sitting in the
pricing grid since it was built and was missed by every prior audit because it reads as boilerplate.
Now `Recommended` — a vendor opinion, which needs no evidence.

**Known tension, deliberately left**: the hero's `Generate My Sequence` button still points at app
signup and §3.9 is still open. WD-031 makes §3.9's stated interim fallback (`Start Free Trial`)
a banned string — that fallback has been rewritten to `Deploy Your Workspace`.

**Files changed**: `HeroSection.astro`, `Navbar.astro`, `MobileMenu.astro`, `PricingSection.astro`,
`FoundingTeams.astro`, `CTASection.astro`, `index.astro`.
**Spec sections updated**: §5.1, §5.2, §5.3, §7.5, §7.6, §7.7, §9.1, §9A.1, §9A.2, §9A.3.
**Project-context updated**: §5.1 evidence ledger, §5.2 blocked claims.
**Build**: `npm run build` exits 0. Banned-string grep of `src/` and `dist/`: zero hits.

### 2026-09-01 (latest−1) — Legal pages built, footer Legal column rewired

Founder supplied four policy documents as plain text in `synclead_site/bin/`. All four are now
live routes. Decisions WD-029, WD-030. New open item §3.11.

| Was | Now | Where |
|---|---|---|
| No legal pages; `/privacy`, `/terms` referenced but nonexistent | `/terms`, `/privacy`, `/acceptable-use`, `/refund` — verbatim founder text | `src/pages/*.astro` (4 new files) |
| — | [`LegalLayout.astro`](../src/layouts/LegalLayout.astro) — hero, revision stamp, prose slot, company block, cross-link row | `src/layouts/` |
| — | `.legal-prose` reading rhythm (h2 rules, sky bullet dots, link colours) | `global.css` §4c |
| Legal column: `Privacy Policy #`, `Terms #`, `Security #`, `Data Processing #` | `Terms of Service`, `Privacy Policy`, `Acceptable Use Policy`, `Refund Policy` — all real paths | `Footer.astro` |

**Why the copy was not touched**: the four documents are reproduced clause-for-clause. §9A governs
marketing claims; a policy is the instrument the company is bound by, so the usual "reconcile the
wording with the evidence ledger" instinct is the wrong move — see WD-029. The only strings on
these pages not from the source text are the meta descriptions, which describe each document and
assert nothing about the product.

**Why two footer links were deleted rather than kept as `#`**: WD-030. A placeholder link in the
column where the company asserts its legitimacy is where a footer stops being believable.

**Three conflicts found between the policies and the site — escalated, not fixed** (§3.11): the
policies name Salesforce and Clay integrations the API does not implement; the Refund Policy names
plans "Starter / Professional / Scale" against the site's "Starter / Pro / Enterprise"; and the
Privacy Policy asserts specific security controls (TLS 1.3, encryption at rest, regular audits,
bcrypt) that this role did not verify. Each is a founder call.

**Also resolved incidentally**: the Refund Policy's 14-day money-back guarantee is a stronger and
now-published version of the trial-mechanics question at §3.4 — though it still does not answer
whether a card is required at signup.

**Files created**: `LegalLayout.astro`, `terms.astro`, `privacy.astro`, `acceptable-use.astro`,
`refund.astro`. **Files changed**: `global.css`, `Footer.astro`.
**Spec sections updated**: new §4.3, new §9.6, §8 (Legal column), §10.4, status header.
**Design-tokens updated**: new §3.7 (`.legal-prose`).
**Build**: `npm run build` exits 0 — 5 pages, sitemap regenerated. Banned-string grep of `src/` and
`dist/`: zero hits.

### 2026-09-01 (latest−1) — Microsoft Partner badge, legal footer, premium polish layer

Three pieces of work. Decisions WD-026, WD-027, WD-028. Open item §3.2 closed.
Note: the footer bottom bar added here (company registration details) is unchanged by the legal
pages work above — that changed the Legal *column*, not the bottom bar.

| Was | Now | Where |
|---|---|---|
| `Microsoft 365 & Google OAuth — never your password` (green shield SVG) | `Microsoft Partner` (four-colour Microsoft mark) | Hero trust row, pill 1 |
| `For revenue teams that measure success in meetings, not sent counts.` | `SYNCLEAD LTD · Company Number: 15903993` / `20 Wenlock Road, London, England, N1 7GU` / support + privacy mailto links / `© 2026 SyncLead Ltd.` | Footer bottom bar |
| Single flat `--shadow-card` everywhere; no hover states | Two-layer elevation ladder (`--shadow-card-hover`, `--shadow-elevated`) + `.card-lift` / `.card-lift-glass` | `global.css`, `tokens.css`, `Card.astro` |
| `transition-all` on buttons, no press feedback | `.btn-base` — 1px hover rise, press-down on `:active` | `Button.astro` |
| Nav links changed colour only | `.nav-link` — sky underline growing from the left | `Navbar.astro`, `Footer.astro` ×3 columns |
| Dark sections butted directly against light ones | `.section-seam` 1px sky hairline on the top edge | `MetricsBand`, `CTASection`, `Footer` |
| Icon containers 40px `rounded-btn`, inconsistent fills | 44px `rounded-full`, consistent across the page | `FoundingTeams`, `AIInsightsSection`, `MetricsBand` |
| Pro tier sat flush in the pricing grid | `md:-mt-4 md:mb-4` so it breaks the grid line; prices use `.tabular` | `PricingSection` |

**Why the badge changed**: `Microsoft Partner` is a stronger and shorter trust signal than
describing the OAuth mechanism, and the founder confirmed Solutions Partner status. The OAuth fact
is still true and still stated — it lives in the `LogoBar` line ("SyncLead never asks for or
stores your email password"), which is where a technical detail belongs. Nothing was lost.

**Why the footer changed**: UK company registration details are a legal requirement and read as
legitimacy to enterprise buyers. The tagline was good copy sitting in the one place on the page
where copy does no work.

**Why the polish layer is CSS-only**: the page was correct but flat — one shadow depth, no pointer
response. Perceived production value comes from consistent elevation, restrained hover motion and
typographic detail, none of which needed new content or layout changes. No claim was touched, so
WD-004 is unaffected.

**Files changed**: `tokens.css`, `global.css`, `Button.astro`, `Card.astro`, `HeroSection.astro`,
`Footer.astro`, `Navbar.astro`, `LogoBar.astro`, `MetricsBand.astro`, `AIInsightsSection.astro`,
`FoundingTeams.astro`, `PricingSection.astro`, `CTASection.astro`.
**Spec sections updated**: §5.3 (trust row), §6.1, §6.2, §6.3, §7.5, §7.6, §7.7, §8.
**Design-tokens updated**: §1.7 + §3.1 (two new shadow tokens).

**Outstanding**: the official Microsoft badge artwork and Partner ID, so the hand-drawn
four-square SVG can be swapped for the licensed asset (§3.2).

### 2026-09-01 (latest−1) — Navbar button fix + CTA cursor spotlight

Two follow-ups from visual QA. Decisions WD-025; WD-019 corrected.

| Was | Now | Where |
|---|---|---|
| Navbar/MobileMenu CTA `variant="solid"` — `bg-dark-900` invisible on dark header | `variant="primary"` — gradient sky-end provides contrast on dark surfaces | `Navbar.astro`, `MobileMenu.astro` |
| CTASection had only a static centered glow | Pointer-reactive spotlight + grid (lightweight hero-style cursor layer) | `CTASection.astro` |

**Why**: (1) The `solid` variant was `bg-dark-900` on a `bg-dark-900/95` navbar — same colour, the button was invisible. The gradient `primary` works on dark surfaces because the sky-blue end creates contrast. `solid` is now scoped to light surfaces only. (2) The CTA section felt flat compared to the hero; adding the cursor spotlight creates visual continuity between the two conversion surfaces.

**Files changed**: `Navbar.astro`, `MobileMenu.astro`, `CTASection.astro`.
**Spec sections updated**: §5.1, §5.2, §7.7.

### 2026-09-01 (latest−1) — CTA contrast, icon weight, paragraph width, navbar copy

Founder-directed UX audit: four visual/strategic issues identified and fixed.
Decisions WD-019, WD-020, WD-021, WD-022.

| Was | Now | Where |
|---|---|---|
| `Button` had 3 variants (`primary`/`ghost`/`outline`) | 4 variants: added `solid` (`bg-dark-900 text-white`) for light-surface CTAs | `Button.astro` |
| `variant="primary"` on FoundingTeams CTA — gradient washed out on `bg-grey-100` | `variant="solid"` — solid dark navy, commands the page | `FoundingTeams.astro` |
| `variant="primary"` on Navbar/MobileMenu CTA — gradient navy end invisible on dark header | `variant="solid"` — consistent dark fill | `Navbar.astro`, `MobileMenu.astro` |
| `Start Free Trial` in navbar + mobile menu | `Audit Your Stack` — aligns with the premium Founding Teams positioning | `Navbar.astro`, `MobileMenu.astro` |
| Card icons: `rounded-btn bg-brand-sky-light/50` (faint tint, rounded-square) | `rounded-full bg-brand-sky` (solid sky circle, strong visual mass) | `FoundingTeams.astro` |
| Lead paragraph inherited `max-w-3xl` (~95 chars/line) | `max-w-2xl mx-auto` (~75 chars/line, readable) | `FoundingTeams.astro` |
| FoundingTeams `bg-grey-100` — merged visually with adjacent Pricing (also `bg-grey-100`) | `bg-white` — restores alternating section rhythm | `FoundingTeams.astro` |
| Badge `sky` variant `border-brand-sky/30` — nearly invisible on grey-100 | `border-brand-sky/50` — subtle but clearly intentional | `Badge.astro` |

**Why**: (1) The gradient CTA failed accessibility contrast on both light and dark surfaces — white text on sky-blue is below AA. (2) The navbar said "Start Free Trial" while the page sold a premium founding-team offer — cognitive dissonance. (3) The card checkmarks were too thin and floated in too much space. (4) The long paragraph discouraged reading. (5) Two consecutive grey-100 sections merged into one undifferentiated block. (6) The PRICING badge outline was invisible.

**Files changed**: `Button.astro`, `Navbar.astro`, `MobileMenu.astro`, `FoundingTeams.astro`, `Badge.astro`.
**Spec sections updated**: §5.1, §5.2, §6.1, §6.2, §7.5. Design-tokens §4.5 rhythm updated.

### 2026-09-01 (later) — Founding Teams reframe + hero micro-demo

Founder design brief: strip the "unfinished beta" positioning, replace with a high-ticket
exclusive B2B infrastructure vibe. Shift from *asking for design partners* to *offering founding
team workspaces*. Decisions WD-016, WD-017, WD-018, WD-007b.

| Was | Now | Where |
|---|---|---|
| `Private beta — onboarding design partners` | `Onboarding founding teams — let us rebuild your outbound` | Hero eyebrow |
| Static `dashboard-overview.svg` screenshot | Looping 9s micro-demo: send → reply detected, sequence stops → slot fills, meeting confirms | Hero frame |
| Two buttons (`Build a Sequence` / `Book a 20-Min Walkthrough`) | Inline domain capture — `yourcompany.com` → `Generate My Sequence`, walkthrough demoted to a text link | Hero CTA |
| `DESIGN PARTNER PROGRAMME` | `FOUNDING TEAMS` | Mid-page eyebrow |
| "We would rather show you the product than quote a stranger" | "Let Us **Rebuild Your Outbound**" | Mid-page H2 |
| "SyncLead is in private beta. We are not going to put invented case studies…" | "We are exclusively onboarding serious outbound engines—from solo founders… If you treat outbound like a science, we are a fit." | Mid-page body |
| Card 1 sub-text: "Deliverability problems you hit become roadmap items." | "You tell us what your outbound engine is missing, and we build it directly into the platform." | Founding Teams card 1 |
| `Apply as a Design Partner` | `Audit Our Outbound Stack` | Mid-page CTA |
| "Tell us what your outbound stack looks like today. If we are not a fit, we will say so on the call." | "Tell us what your current stack looks like. If we are not the right fit to scale your volume, we will tell you directly on the call." | Mid-page CTA sub-text |
| "Built for outbound teams who own their domains." | "For revenue teams that measure success in meetings, not sent counts." | Footer tagline |
| `Private beta · onboarding design partners` | `Onboarding founding teams` | Footer stage marker |
| `Private beta · billing secured by Stripe · …` | `Onboarding founding teams · billing secured by Stripe · …` | CTA band strip |

Cards 2 and 3 ("Locked founding price", "Migration done with you") kept verbatim — they already
supported the new framing.

**Why card 1 changed**: the old sub-text said deliverability problems "you hit become roadmap
items", which implies the customer is *guaranteed to hit problems*. Reframed to a capability
request instead of a defect expectation.

**Files**: `TestimonialGrid.astro` **deleted**, replaced by
[`FoundingTeams.astro`](../src/components/sections/FoundingTeams.astro) (WD-018).
[`HeroMicroDemo.astro`](../src/components/hero/HeroMicroDemo.astro) created.
`global.css` gained an `.sr-only` utility and extended the focus-visible ring to form controls.
The hero frame max-width tightened from `max-w-5xl` to `max-w-4xl` — the demo is denser than a
screenshot and read too wide.

**Still honest**: no claim was added. The removed beta disclosure was an apology, not evidence;
WD-004 remains fully in force and the banned-string table is unchanged.

**New dependency introduced**: the domain capture posts `?domain=` to app signup. If the app
ignores it, the hero is promising a generated sequence that never appears — a WD-004 breach by
omission. Logged as §3.9 and flagged as the top open item.

### 2026-09-01 — Session: hero polish → claim audit → real brand assets

Three chained pieces of work. The claim audit was not requested at the start; it surfaced when
the founder corrected a certification claim while reviewing the hero.

#### 2a. Hero interaction layer (WD-010)
`HeroSection.astro` gained five pointer-driven effects: cursor spotlight, grid revealed only
around the cursor, three-plane parallax on glows and particles, 3D frame tilt with specular
glare, and a headline gradient tracking cursor X. Existing ambient particle float and scroll
indicator retained. `tokens.css` gained the RGB channel tokens (WD-014).

#### 2b. Claim audit — removals and replacements (WD-004)

| Removed | Where | Replaced with |
|---|---|---|
| `SOC 2 Type II` badge | Hero trust row | `Microsoft 365 & Google OAuth — never your password` |
| `SOC 2` footer link | Footer legal column | `Data Processing` |
| `G2 Leader — Fall 2025` badge | Hero trust row | `Billing secured by Stripe` |
| `No credit card required` | Hero + pricing subtext | `14-day trial · cancel in one click` + pricing risk-reversal row |
| `Trusted by 500+ SDR & BDR teams worldwide` | Hero social proof | *(line deleted — no honest equivalent)* |
| 6 invented company names + "Trusted by teams at" | `LogoBar` | Integration strip, 5 real integrations (WD-007) |
| 3 `AnimatedCounter`s: 2.4M emails/mo, 38% reply lift, 12,000+ meetings | `MetricsBand` | "Three mechanisms" numbered explainer (WD-008) |
| 3 fabricated testimonials (Maya Chen/Quantiv, Daniel Okafor/HelioCRM, Priya Raghavan/Brightpath Labs) + 5-star ratings + invented deltas | `TestimonialGrid` | Design-partner programme with explicit "no published results yet" disclosure + 3 partner benefits + apply CTA |
| `SSO/SAML` | Pricing, Enterprise tier | `Role-based access and audit logging` — API has no SSO implementation |
| `Now with calendar no-show recovery` | Hero eyebrow | `Private beta — onboarding design partners` |

Verified by grepping `src/` and `dist/` for every banned string: zero hits.

#### 2c. Copy revision (WD-005, WD-006)
Founder-supplied H1, sub-headline, both section H2s, and primary CTA installed verbatim.
Deviations, both deliberate: H1 dropped to display-L for overflow; secondary CTA changed from
`Watch Demo` to `Book a 20-Min Walkthrough`. Page title, meta description, OG image alt,
footer tagline and copyright year updated to match. `CTASection`'s `headline` prop was
**removed** — declared but never rendered, so it was dead API surface.

#### 2d. Real brand assets (WD-012)
Founder supplied icon, dark-surface and light-surface logos, and a 64px PNG favicon.
Filenames normalised, `Logo.astro` created, navbar/mobile menu/footer switched from the
placeholder `favicon.svg` + Inter-Extrabold text wordmark to real artwork. Icon links and
JSON-LD `logo` repointed. `favicon.svg` is superseded and unreferenced (kept, harmless).
Colour conflict recorded as WD-013 rather than resolved.

#### 2e. Harness sync (WD-015)
`site-spec.md` corrected across ten sections; new §5.3.1 (cursor contract), §6.6 (`Logo.astro`),
§9A (claim policy), §2.4 (brand assets). §9.4 (About page, unbuilt) marked **do-not-build** —
its spec copy contained a fabricated founding story, founder roles, "30+ countries",
"millions of emails a month", and a stats band reusing the same fake numbers already deleted
from the home page. `role-code.md` gained the claim-integrity rules and five validation gates.
This memory bank and `project-context.md` created.

**Discovered incidentally**: `/og-image.png` is referenced by `BaseLayout` but does not exist,
so social shares currently render without an image. Logged in §3.7.

### Earlier — Initial build
Home page and all shared components implemented from `site-spec.md` as originally written.
Brand palette corrected from generic-SaaS-blue + violet to the navy/sky system (WD-003).
Dashboard mockups shipped as abstract placeholder SVGs, not the PNGs the spec assumed.

---

## 3. Open Decisions — blocked on founder input

Each item lists exactly what unblocks it. Do not guess or proceed on assumption.

### 3.1 🔴 Logo vs palette colour conflict (WD-013)
**Need**: a choice between (a) re-export artwork as `#8ECAE6` / `#0B1D33`, or (b) re-base
`--color-sky` on `#1093ef` and re-check contrast everywhere sky sits on navy.
**Recommendation**: (a). `#1093ef` on navy is a harsher contrast, the softer sky reads as more
premium in B2B, and (b) touches dozens of places including the gradient headline treatment.

### 3.2 🟢 Microsoft Partner badge — ANSWERED, badge asset still outstanding
**Resolved 2026-09-01**: founder confirmed **Microsoft Solutions Partner** status. The hero trust
pill now reads `Microsoft Partner` with the four-colour Microsoft mark (WD-026).
**Still needed (low priority)**: the official badge artwork and the Partner ID, so the mark can be
replaced with the licensed asset rather than a hand-drawn four-square SVG.
**Historical note, kept deliberately**: the earlier concern was that "Miro for Startups" plus a
$1,000 credit looked like *Microsoft for Startups Founders Hub*, which is **not** the same as
Solutions Partner — the term is controlled and buyers check. That concern is now closed by the
founder's confirmation, but the distinction is worth remembering if the wording is ever revisited.

### 3.3 🟡 Real metrics to restore the counters (WD-008)
**Need**: pilot reply-rate deltas *with date range and sample size*. One honest data point
unlocks the metrics band; it beats three invented ones.

### 3.4 🟡 Trial mechanics (WD-009)
**Need**: is a card required at signup, and what happens on day 15? Determines whether
"no credit card required" can return.

### 3.5 🟡 Named testimonial
**Need**: person, company, quote, and **written** logo permission (email is fine).

### 3.6 🟡 `/security` page content and contact form endpoint
**Need**: hosting region, encryption at rest, retention policy, internal access policy. A plain
security page satisfies most buyers at this stage and is what the SOC 2 badge was faking.
Separately, the contact form has no endpoint (WD-002) — needs a form service or API route.
**Update (WD-030)**: the footer no longer advertises a `/security` link, so the site is no longer
shipping a broken promise — but the page is still wanted. Note that the Privacy Policy §7 now
publishes specific controls (TLS 1.3, encryption at rest, regular audits, bcrypt); a `/security`
page must not contradict them, and §3.11(c) asks whether they are all accurate.

### 3.7 🟡 Missing assets
`og-image.png` (referenced, absent), real dashboard screenshots (currently abstract SVGs), and
a 90-second walkthrough recording (would make a `Watch Demo` CTA real again).

### 3.8 🟡 About page (`about.astro`)
**Need**: real founder history. The spec copy at §9.4 is fabricated and marked do-not-build.
Note the irony that the page's own stated value is "Honest metrics" — that value is worth
keeping, the numbers around it are not.

### 3.9 🔴 App must handle `?domain=` from the hero capture (WD-017)
**Need**: `https://app.synclead.io/signup?domain=acme.com` must read the parameter and generate
a draft outreach sequence for that domain.
**Why this is red**: the hero now says "Enter your website and we will draft an outreach sequence
for your market." If signup ignores the parameter, the site is making a promise the product does
not keep — the exact failure mode WD-004 exists to prevent, just pointed forward in time instead
of backward. The site-side work is done and shipping; the app side is not verified.
**Interim option if the app cannot ship it soon**: change the button to `Deploy Your Workspace` and
the hint to "Enter your domain to prefill your workspace" — still zero-friction, but only promises
what actually happens. (Originally this said `Start Free Trial`; that is now a banned string under
WD-031.)
**Also worth deciding**: whether to capture these domains for follow-up even when signup is
abandoned. That needs a form endpoint (§3.6) and a privacy note.

### 3.10 🟡 Founding Teams offer needs operational backing
The section now promises **a direct Slack channel with the engineering team**, white-glove
migration, and pricing locked "forever". These are commitments, not copy.
**Need**: confirmation that (a) a shared Slack channel per founding team is something you will
actually run, (b) "locked forever" is acceptable as a permanent discount liability, and (c) there
is a cap on how many founding teams you take. The word "exclusively" implies scarcity — if there
is no limit, consider stating the number, which strengthens the offer and keeps it true.

### 3.11 🔴 The legal documents disagree with the product and the pricing page (WD-029)
Found while building the four policy pages. **Not fixed** — editing a legal document so it matches
marketing copy changes what the company is contractually bound by, so each of these is a founder
call. All are currently published as written.

**(a) Integrations that do not exist.** Terms §2 and Privacy §2.4/§5 name **Salesforce and Clay**
as CRM integrations with bi-directional sync. [`project-context.md §4`](project-context.md) lists
HubSpot only, and there is no Salesforce or Clay code in the API. Same class of problem as the
SSO/SAML claim removed from pricing under WD-004 — except this one sits in a contract rather than
on a marketing page, which makes it worse, not better.
**Unblocked by**: shipping those integrations, or amending both documents to name only HubSpot.
**Recommendation**: amend now, re-add on ship.

**(b) Plan names do not match.** Refund Policy §2 says the guarantee covers
**"Starter, Professional, and Scale"**. The site sells **Starter / Pro / Enterprise** (WD-006,
unchanged). A customer on Enterprise can reasonably argue the named list does not cover them.
**Unblocked by**: deciding the canonical plan names, then correcting whichever document is wrong.

**(c) Security controls asserted without verification.** Privacy §7 publishes TLS 1.3, encryption
at rest for OAuth tokens, *regular security audits and vulnerability assessments*, role-based
internal access, and bcrypt-or-equivalent hashing. These are now public commitments; this role
verified none of them against the API. "Regular security audits" in particular is the kind of line
a procurement questionnaire asks for evidence of.
**Unblocked by**: confirming each control, or softening the aspirational ones.

**(d) Minor — response SLAs.** The Refund Policy closes with "we aim to respond to all refund
requests within 24 hours during business days" and the AUP §7 promises abuse-report investigation
"within 48 hours". Both are operational commitments in the same category as §3.10 — fine if you
will run them, a liability if not.

**(e) Partly answers §3.4.** The published 14-day money-back guarantee is stronger than the trial
language the site currently uses, but it still does not say whether a card is required at signup —
so "no credit card required" remains banned.

---

## 4. Traps and Gotchas

Things that look like bugs or oversights but are intentional. Check here before "fixing".

1. **`AnimatedCounter.astro` is unused.** Deliberate (WD-008). Do not delete.
2. **`public/favicon.svg` is unreferenced.** Superseded placeholder (WD-012). Harmless.
3. **There is no `TestimonialGrid.astro`.** The slot is [`FoundingTeams.astro`](../src/components/sections/FoundingTeams.astro) — an offer section, not social proof (WD-018). Third identity for this position; see §2.
4. **The H1 uses display-L, not display-XL.** Overflow, not oversight (WD-005).
5. **Frame tilt is only 5°.** Legibility cap, not a placeholder value (WD-010).
6. **Reduced-motion and coarse-pointer gating appears twice** (CSS and JS). Intentional belt-and-braces (WD-010).
7. **Dashboard SVGs still draw a simplified square as the in-app logo.** They are placeholder screenshots overall; embedding real artwork into art that will be replaced is wasted work.
8. **`site-spec.md §9.4` must not be implemented as written.** Fabricated copy (§3.8).
9. **`site-spec.md` original §5.3 hero copy is superseded** by §9A.3. Where they conflict, §9A wins.
10. **`public/images/dashboard-overview.svg` is now unused** — the hero shows the micro-demo instead (WD-007b). The other three dashboard SVGs are still used by `FeatureShowcase`.
11. **The hero micro-demo has no JS.** Phases are synchronised by sharing one 9s duration across every keyframe animation with staggered percentage stops. Editing one timing means re-checking the others — the percentages are a contract, documented in the component header.
12. **The hero form has no server.** It is a `GET` to app signup (WD-017). The script only normalises the hostname; it never submits anything itself.
13. **The legal pages contradict `project-context.md §4` and the pricing section — deliberately.** Salesforce/Clay integrations and the plan names "Professional"/"Scale" appear in the policies because that is what the founder-supplied documents say, reproduced verbatim (WD-029). **Do not "correct" them to match the site.** They are escalated at §3.11; which document is wrong is a founder decision.
14. **The legal pages have no `CTASection` and no `data-reveal`.** Both omissions are deliberate (WD-029) — a conversion band under a refund policy reads as a sales pitch attached to a contract, and legal text should not fade in.
15. **The footer Legal column has four links, not the six an earlier spec described.** `Security` and `Data Processing` were removed, not forgotten (WD-030).
16. **`synclead_site/bin/` holds the source plain text for the four policies.** It is not build output despite the directory name, and it is not in `.gitignore`'s `dist/` rule. Treat it as the founder's original submission; if a policy changes, change the page.
17. **The legal pages still say "cancel at any time" and still describe the 14-day money-back guarantee — while the marketing copy says neither.** Not an inconsistency to fix. WD-031 banned that vocabulary from *marketing surfaces*; the policies are the instrument the company is bound by (WD-029) and the commitments are real. The pricing page deliberately links to `/refund` instead of restating them.
18. **The CTA band's primary button goes to `/contact` while the secondary goes to app signup.** Looks inverted, is not: a founding-team spot is granted on a call, not self-provisioned (WD-031).

---

## 5. Update Protocol

Binding — see WD-015 and [`roles/role-code.md`](roles/role-code.md).

**Write to this file when:**
- a decision is taken, changed, or reversed → §1 (new `WD-nnn`; mark the old one Superseded, never delete)
- code behaviour, copy, or structure changes → §2 (what was there → what replaced it → why)
- something is blocked on the founder → §3 (with the exact unblocker)
- an intentional oddity is introduced that a future agent might "fix" → §4

**Write to [`project-context.md`](project-context.md) when:** implementation status changes, a
file is added or removed, or a new claim becomes evidence-backed (§5 evidence ledger).

**Write to [`site-spec.md`](site-spec.md) when:** a file's props, markup, classes, or copy change.

**Write to [`design-tokens.md`](design-tokens.md) when:** a token, gradient, shadow, or asset changes.

Update in the **same task** as the code change, before reporting completion. If a task changes
nothing structural, say so rather than padding these files.
