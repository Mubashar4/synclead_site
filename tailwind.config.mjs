/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          0: 'var(--bg-0)',
          1: 'var(--bg-1)',
          2: 'var(--bg-2)',
          3: 'var(--bg-3)',
        },
        sky: {
          DEFAULT: 'var(--color-sky)',
          2:       'var(--color-sky-2)',
          ink:     'var(--color-sky-ink)',
        },
        violet: {
          DEFAULT: 'var(--color-violet)',
          2:       'var(--color-violet-2)',
          ink:     'var(--color-violet-ink)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          2:       'var(--ink-2)',
          3:       'var(--ink-3)',
        },
        'ink-l': {
          DEFAULT: 'var(--ink-l)',
          2:       'var(--ink-l-2)',
          3:       'var(--ink-l-3)',
        },
        paper:   'var(--paper)',
        ok:      'var(--color-ok)',
        warn:    'var(--color-warn)',
        err:     'var(--color-err)',
      },
      fontFamily: {
        ui:    ['Instrument Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'Times New Roman', 'serif'],
        mono:  ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      borderRadius: {
        card:  '16px',
        btn:   '12px',
        badge: '9999px',
        sm:    '10px',
      },
      boxShadow: {
        stage:      'var(--shadow-stage)',
        card:       'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        elevated:   'var(--shadow-elevated)',
        float:      'var(--shadow-float)',
      },
      maxWidth: {
        container: '1200px',
      },
      transitionTimingFunction: {
        site:   'cubic-bezier(0.2, 0.7, 0.2, 1)',
        'site-x': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
