# SyncLead Design System & Palette Specification (v2 — Dark Cinema)

This is the authoritative design system, brand identity, color palette, typography stack, and component token specification for the **SyncLead** application and marketing web platforms.

---

## 1. Brand Aesthetic & Philosophy

SyncLead is positioned as **heavy-duty, enterprise-grade outbound infrastructure**, not a low-ticket B2C productivity widget. The visual identity reflects:
- **Dark Cinema Aesthetic**: Deep, rich obsidian and dark blue canvas backgrounds providing maximum contrast for telemetry data and UI cards.
- **Dual-Accent Color Language**:
  - **Sky Blue (`#41C8FF`)**: Primary accent representing the "Booked" outcome, active connections, links, highlights, and primary interactions.
  - **Violet (`#9D8BFF`)**: Secondary accent representing outreach sequences, "Sent" chips, and AI operations.
- **Precision Telemetry**: Monospace tags and high-contrast micro-chips for DNS status, health scores, and deliverability metrics.

---

## 2. Master Color Palette

### 2.1 Dark Canvas & Background Scale
Used for application screens, sidebars, modals, and container panels:

| Token Name | HEX | RGB | Intended Usage |
|---|---|---|---|
| `--bg-0` | `#05080F` | `5, 8, 15` | Deepest page canvas, master application background |
| `--bg-1` | `#0A0F1D` | `10, 15, 29` | Primary dark surface, main section backgrounds, sidebar panels |
| `--bg-2` | `#0E1626` | `14, 22, 38` | Default card backgrounds, table containers, data frames |
| `--bg-3` | `#141D33` | `20, 29, 51` | Elevated surfaces, dropdowns, tooltips, dialogs, active items |

### 2.2 Accent Colors (Sky & Violet)

| Token Name | HEX | RGB | Intended Usage |
|---|---|---|---|
| `--color-sky` | `#41C8FF` | `65, 200, 255` | **Primary Brand Accent**: Booked status, active links, primary buttons, glow effects |
| `--color-sky-2` | `#7FD9FF` | `127, 217, 255` | Hover state for sky accent buttons and active links |
| `--color-sky-ink` | `#0E86C8` | `14, 134, 200` | Deep sky for readable text and pill borders on light surfaces |
| `--color-violet` | `#9D8BFF` | `157, 139, 255` | **Secondary Brand Accent**: Sent state, AI triggers, secondary badges |
| `--color-violet-2` | `#B7A8FF` | `183, 168, 255` | Hover state and active glow for violet elements |
| `--color-violet-ink` | `#6C58E8` | `108, 88, 232` | Violet text and icons on light backgrounds |

### 2.3 Semantic & Health Status Colors

| Token Name | HEX | RGB | Intended Usage |
|---|---|---|---|
| `--color-ok` | `#3DD68C` | `61, 214, 140` | Success, 100% health score, verified SPF/DKIM/DMARC, connected accounts |
| `--color-warn` | `#F5B74E` | `245, 183, 78` | Warning, warmup active, pending approval, stopped sequences |
| `--color-err` | `#F0618C` | `240, 97, 140` | Error, DNS drift, bounce quarantine, failed connections |

### 2.4 Text & Ink Tokens (Dark Surface)

| Token Name | HEX | CSS Value | Intended Usage |
|---|---|---|---|
| `--ink` | `#E8EDF7` | `#E8EDF7` | Primary high-contrast text and headlines on dark |
| `--ink-2` | `#9AA6BE` | `#9AA6BE` | Secondary text, descriptions, table body, metadata |
| `--ink-3` | `#5F6B85` | `#5F6B85` | Muted labels, placeholders, disabled text, inactive chrome |

### 2.5 Light Surfaces & Light Mode Accents

| Token Name | HEX | CSS Value | Intended Usage |
|---|---|---|---|
| `--paper` | `#F4F7FB` | `#F4F7FB` | Warm paper white for alternate light card panels |
| `--line-l` | `#E2E9F3` | `#E2E9F3` | Subtle border for light cards and divider lines |
| `--ink-l` | `#0D1626` | `#0D1626` | Primary high-contrast dark text on light backgrounds |
| `--ink-l-2` | `#525E77` | `#525E77` | Secondary body text on light backgrounds |
| `--ink-l-3` | `#8B96AD` | `#8B96AD` | Tertiary text, sub-labels on light backgrounds |

### 2.6 Borders & Separators

| Token Name | CSS Value | Intended Usage |
|---|---|---|
| `--line` | `rgba(151, 166, 199, 0.14)` | Subtle hairline borders on dark containers |
| `--line-2` | `rgba(151, 166, 199, 0.24)` | Stronger card borders, table header dividers |
| `--line-accent` | `rgba(65, 200, 255, 0.35)` | Highlighted card borders, active input focus states |

---

## 3. Typography System

The application and website use a strict 3-font hierarchy. All fonts are self-hosted (via `@fontsource` packages or local webfonts).

### 3.1 Font Families
1. **UI Sans**: `'Instrument Sans', ui-sans-serif, system-ui, -apple-system, sans-serif`
   - Used for all standard interface text, buttons, body copy, navigation, forms, and general UI.
   - Weights: `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold).
2. **Editorial Serif**: `'Instrument Serif', Georgia, 'Times New Roman', serif`
   - Used specifically for italicized emphasis words in major headlines (`<em>without the ops headcount</em>`).
   - Style: Italic (`font-style: italic; font-weight: 400`).
3. **Machine Monospace**: `'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace`
   - Used for telemetry data, email addresses, IP addresses, DNS indicators, counters, status pills, and code.
   - Weights: `500` (Medium), `600` (SemiBold), `700` (Bold).

### 3.2 Typography Scale

| Hierarchy | Font Family | Size | Line Height | Letter Spacing | Weight |
|---|---|---|---|---|---|
| **H1 Display** | `Instrument Sans` | `40px–76px` (clamp) | `1.06` | `-0.032em` | `700` |
| **H2 Section** | `Instrument Sans` | `30px–46px` (clamp) | `1.16` | `-0.022em` | `700` |
| **H3 Card** | `Instrument Sans` | `20px` | `1.30` | `0` | `600` |
| **Lead Text** | `Instrument Sans` | `16px–18px` | `1.68` | `0` | `400` |
| **Body UI** | `Instrument Sans` | `14px–15px` | `1.60` | `0` | `400 / 500` |
| **Eyebrow / Label** | `Instrument Sans` | `11px` | `1.20` | `0.26em` | `600 (UPPERCASE)` |
| **Telemetry / Chip** | `JetBrains Mono` | `9.5px` | `1.20` | `0.18em` | `600` |
| **DNS / Micro Tag** | `JetBrains Mono` | `7.5px–8.5px` | `1.00` | `0.06em` | `600` |

---

## 4. Geometry, Radii, Shadows & Elevation

### 4.1 Border Radius
- **Cards & Dashboard Panels**: `16px` (`--radius-card`)
- **Buttons & Action Triggers**: `12px` (`--radius-btn`)
- **Small Elements & Inputs**: `10px` (`--radius-sm`)
- **Badges & Status Pills**: `9999px` (Full pill radius)

### 4.2 Shadows & Lighting

```css
/* Deep dashboard elevation with sky accent glow */
--shadow-stage: 0 40px 100px -40px rgba(0, 0, 0, 0.8),
                0 0 90px -46px rgba(65, 200, 255, 0.5);

/* Subtle card shadow on light surfaces */
--shadow-card: 0 2px 6px rgba(13, 22, 38, 0.04);

/* Card hover elevation */
--shadow-card-hover: 0 2px 4px rgba(13, 22, 38, 0.04),
                     0 16px 44px -10px rgba(13, 22, 38, 0.16);

/* Floating modal / dropdown shadow */
--shadow-elevated: 0 34px 80px -36px rgba(13, 22, 38, 0.55);
--shadow-float: 0 24px 60px -30px rgba(0, 0, 0, 0.5);
```

### 4.3 Gradients & Lighting Backgrounds

```css
/* Gradient Route (Violet to Sky connection flow) */
--gradient-route: linear-gradient(90deg, #9D8BFF, #41C8FF);

/* Deep Hero & Section Radial Canvas */
--gradient-hero: radial-gradient(1100px 700px at 72% -12%, rgba(22, 35, 70, 0.95), transparent 60%),
                 radial-gradient(900px 620px at 6% 108%, rgba(16, 28, 58, 0.85), transparent 60%),
                 #05080F;

/* Sky Focus Glow */
--sky-glow: 0 0 24px -4px rgba(65, 200, 255, 0.4);
```

---

## 5. Ready-to-Use CSS Variables (`tokens.css`)

Developers can drop this into their application's global stylesheet:

```css
:root {
  /* Canvas Backgrounds */
  --bg-0: #05080F;
  --bg-1: #0A0F1D;
  --bg-2: #0E1626;
  --bg-3: #141D33;

  /* Borders & Dividers */
  --line:   rgba(151, 166, 199, 0.14);
  --line-2: rgba(151, 166, 199, 0.24);
  --line-l: #E2E9F3;

  /* Ink (Text) */
  --ink:    #E8EDF7;
  --ink-2:  #9AA6BE;
  --ink-3:  #5F6B85;
  --ink-l:  #0D1626;
  --ink-l-2:#525E77;
  --ink-l-3:#8B96AD;

  /* Primary Accent: Sky Blue */
  --color-sky:     #41C8FF;
  --color-sky-2:   #7FD9FF;
  --color-sky-ink: #0E86C8;

  /* Secondary Accent: Violet */
  --color-violet:     #9D8BFF;
  --color-violet-2:   #B7A8FF;
  --color-violet-ink: #6C58E8;

  /* Semantic Status */
  --color-ok:   #3DD68C;
  --color-warn: #F5B74E;
  --color-err:  #F0618C;

  /* Surfaces */
  --paper: #F4F7FB;

  /* RGB Channels for compositing rgba() */
  --color-sky-rgb:    65, 200, 255;
  --color-violet-rgb: 157, 139, 255;
  --color-ok-rgb:     61, 214, 140;
  --color-warn-rgb:   245, 183, 78;

  /* Font Families */
  --f-ui:    'Instrument Sans', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --f-serif: 'Instrument Serif', Georgia, serif;
  --f-mono:  'JetBrains Mono', ui-monospace, monospace;

  /* Radii */
  --radius-card: 16px;
  --radius-btn:  12px;
  --radius-sm:   10px;
  --radius-badge:9999px;

  /* Shadows */
  --shadow-stage: 0 40px 100px -40px rgba(0, 0, 0, 0.8), 0 0 90px -46px rgba(65, 200, 255, 0.5);
  --shadow-card:  0 2px 6px rgba(13, 22, 38, 0.04);
  --shadow-elevated: 0 34px 80px -36px rgba(13, 22, 38, 0.55);
}
```

---

## 6. Tailwind CSS Extension Configuration

For projects utilizing Tailwind CSS v3:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        bg: {
          0: '#05080F',
          1: '#0A0F1D',
          2: '#0E1626',
          3: '#141D33',
        },
        sky: {
          DEFAULT: '#41C8FF',
          2:       '#7FD9FF',
          ink:     '#0E86C8',
        },
        violet: {
          DEFAULT: '#9D8BFF',
          2:       '#B7A8FF',
          ink:     '#6C58E8',
        },
        ink: {
          DEFAULT: '#E8EDF7',
          2:       '#9AA6BE',
          3:       '#5F6B85',
        },
        'ink-l': {
          DEFAULT: '#0D1626',
          2:       '#525E77',
          3:       '#8B96AD',
        },
        paper: '#F4F7FB',
        ok:    '#3DD68C',
        warn:  '#F5B74E',
        err:   '#F0618C',
      },
      fontFamily: {
        ui:    ['Instrument Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono:  ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card:  '16px',
        btn:   '12px',
        badge: '9999px',
        sm:    '10px',
      },
    },
  },
};
```

---

## 7. Standard Component Patterns

### 7.1 Status Indicators & Micro-Chips
- **Verified DNS Tag (SPF / DKIM / DMARC)**:
  - Background: `rgba(61, 214, 140, 0.10)`
  - Text Color: `#3DD68C`
  - Border: `1px solid rgba(61, 214, 140, 0.20)`
  - Font: `JetBrains Mono 7.5px bold`
- **Connected Provider Tags**:
  - Google: `rgba(66, 133, 244, 0.12)` bg, `#4285F4` text, `1px solid rgba(66, 133, 244, 0.30)`
  - Microsoft 365: `rgba(0, 164, 239, 0.12)` bg, `#00A4EF` text, `1px solid rgba(0, 164, 239, 0.30)`
- **"Coming Soon" Bubble (Light Cards)**:
  - Background: `rgba(14, 134, 200, 0.08)`
  - Text Color: `#0E86C8` (`var(--color-sky-ink)`)
  - Border: `1px solid rgba(14, 134, 200, 0.22)`
  - Radius: `9999px` (pill)
  - Font: `JetBrains Mono 8px semi-bold uppercase`

### 7.2 Primary Buttons
- Background: `#41C8FF`
- Text: `#05080F` (high-contrast black)
- Font: `Instrument Sans 14px 600 weight`
- Radius: `12px`
- Hover: Background `#7FD9FF`, box-shadow `0 0 20px rgba(65, 200, 255, 0.45)`
