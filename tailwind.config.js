/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a5f',
          950: '#0f172a',
        },
        water: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        theme: {
          bg: 'hsl(var(--bg) / <alpha-value>)',
          'bg-secondary': 'hsl(var(--bg-secondary) / <alpha-value>)',
          surface: 'hsl(var(--surface) / <alpha-value>)',
          'surface-hover': 'hsl(var(--surface-hover) / <alpha-value>)',
          card: 'hsl(var(--card) / <alpha-value>)',
          elevated: 'hsl(var(--elevated) / <alpha-value>)',
          border: 'hsl(var(--border) / <alpha-value>)',
          primary: 'hsl(var(--primary) / <alpha-value>)',
          'primary-hover': 'hsl(var(--primary-hover) / <alpha-value>)',
          accent: 'hsl(var(--accent) / <alpha-value>)',
          'text-primary': 'hsl(var(--text-primary) / <alpha-value>)',
          'text-secondary': 'hsl(var(--text-secondary) / <alpha-value>)',
          'text-muted': 'hsl(var(--text-muted) / <alpha-value>)',
          success: 'hsl(var(--success) / <alpha-value>)',
          warning: 'hsl(var(--warning) / <alpha-value>)',
          danger: 'hsl(var(--danger) / <alpha-value>)',
        },
      },
      boxShadow: {
        theme: 'var(--shadow)',
        glow: 'var(--glow)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
