/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["'DM Sans'",  'system-ui', 'sans-serif'],
        display: ["'Syne'",     "'DM Sans'", 'sans-serif'],
      },
      colors: {
        // Aligned to --brand-primary: #7C5CFC
        brand: {
          50:  '#F3EEFF',
          100: '#E4D8FF',
          200: '#C9B3FF',
          300: '#A88FFF',
          400: '#9070FF',
          500: '#7C5CFC',
          600: '#6644E8',
          700: '#5233CC',
          800: '#3E25A8',
          900: '#2C1A80',
        },
        // Status colors — dark-mode aware (no zinc-50 on dark bg)
        emerald: {
          DEFAULT: '#00E5B3',
          dim:     'rgba(0,229,179,0.12)',
          border:  'rgba(0,229,179,0.25)',
          text:    '#00C99C',
        },
        rose: {
          DEFAULT: '#FF5E7D',
          dim:     'rgba(255,94,125,0.12)',
          border:  'rgba(255,94,125,0.25)',
        },
        amber: {
          DEFAULT: '#FFB547',
          dim:     'rgba(255,181,71,0.12)',
          border:  'rgba(255,181,71,0.25)',
        },
        // Surface palette mapped to CSS vars
        surface: {
          base:     '#080810',
          card:     '#131320',
          elevated: '#181828',
        },
      },
      borderRadius: {
        'xs':  '8px',
        'sm':  '12px',
        'md':  '18px',
        'lg':  '24px',
        'xl':  '32px',
        'pill':'9999px',
        // Keep Tailwind defaults working too
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        // 8pt grid extras
        '4.5': '18px',
        '13':  '52px',
        '15':  '60px',
        '18':  '72px',
        // Touch targets
        'touch': '44px',
      },
      fontSize: {
        'xxs': ['10px',  { lineHeight: '14px', letterSpacing: '0.06em' }],
        'xs':  ['12px',  { lineHeight: '16px' }],
        'sm':  ['13px',  { lineHeight: '18px' }],
        'base':['15px',  { lineHeight: '22px' }],
        'md':  ['16px',  { lineHeight: '24px' }],
        'lg':  ['18px',  { lineHeight: '26px', letterSpacing: '-0.02em' }],
        'xl':  ['22px',  { lineHeight: '28px', letterSpacing: '-0.03em' }],
        '2xl': ['28px',  { lineHeight: '34px', letterSpacing: '-0.04em' }],
        '3xl': ['32px',  { lineHeight: '38px', letterSpacing: '-0.04em' }],
      },
      screens: {
        'xs': '375px',  // iPhone SE
        'sm': '430px',  // iPhone Pro Max / app shell max-width
        // md+ intentionally omitted — mobile-only app
      },
      boxShadow: {
        'xs':    '0 1px 6px rgba(0,0,0,0.25)',
        'sm':    '0 4px 16px rgba(0,0,0,0.35)',
        'md':    '0 8px 32px rgba(0,0,0,0.45)',
        'lg':    '0 20px 64px rgba(0,0,0,0.55)',
        'brand': '0 8px 32px rgba(124,92,252,0.45)',
        'glow':  '0 0 48px rgba(124,92,252,0.18)',
        'glow-sm':'0 0 24px rgba(124,92,252,0.12)',
      },
    },
  },
  plugins: [],
};
