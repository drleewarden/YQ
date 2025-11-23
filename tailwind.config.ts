import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#ffffff',
        accent: '#d4a574',
        'accent-dark': '#b8844f',
        'accent-light': '#e8c8a0',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        'food-orange': '#f97316',
        'food-amber': '#f59e0b',
      },
      fontFamily: {
        'sans': ['system-ui', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'lg': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
export default config
