/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        foreground: '#fafafa',
        card: {
          DEFAULT: '#121215',
          foreground: '#fafafa',
        },
        popover: {
          DEFAULT: '#09090b',
          foreground: '#fafafa',
        },
        primary: {
          DEFAULT: '#fafafa',
          foreground: '#18181b',
        },
        secondary: {
          DEFAULT: '#27272a',
          foreground: '#fafafa',
        },
        muted: {
          DEFAULT: '#27272a',
          foreground: '#a1a1aa',
        },
        accent: {
          DEFAULT: '#27272a',
          foreground: '#fafafa',
        },
        destructive: {
          DEFAULT: '#7f1d1d',
          foreground: '#fef2f2',
        },
        border: '#27272a',
        input: '#27272a',
        ring: '#d4d4d8',
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
    },
  },
  plugins: [],
};
