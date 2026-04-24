/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#050505',
        'brand-surface': '#111111',
        'brand-surface-hover': '#1a1a1a',
        'brand-primary': '#38bdf8',
        'brand-accent': '#818cf8',
        'brand-text': '#f8fafc',
        'brand-muted': '#94a3b8',
        'brand-border': '#262626',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}