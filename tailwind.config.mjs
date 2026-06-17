/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: ['selector', 'html[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens (mapped to CSS custom properties in global.css)
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-sidebar': 'var(--bg-sidebar)',
        'border-color': 'var(--border-color)',
        'border-subtle': 'var(--border-subtle)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'link': 'var(--link-color)',
        'link-hover': 'var(--link-hover)',
        // Phase accent colors (fixed across light/dark)
        phase: {
          1: '#0D9488',
          '1-light': '#CCFBF1',
          '1-dark': '#042F2E',
          2: '#7C3AED',
          '2-light': '#EDE9FE',
          '2-dark': '#2E1065',
          3: '#2563EB',
          '3-light': '#DBEAFE',
          '3-dark': '#1E3A8A',
          4: '#D97706',
          '4-light': '#FEF3C7',
          '4-dark': '#78350F',
          5: '#EA580C',
          '5-light': '#FFEDD5',
          '5-dark': '#7C2D12',
        },
        // Semantic colors
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        info: '#2563EB',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      borderRadius: {
        pill: '9999px',
        card: '12px',
        code: '8px',
        input: '8px',
        callout: '8px',
      },
      maxWidth: {
        content: '72ch',
        article: '780px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08)',
        navbar: '0 1px 0 var(--border-color)',
      },
    },
  },
  plugins: [],
};
