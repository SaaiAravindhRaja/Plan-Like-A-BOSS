/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // SMU Brand Colors
        'smu-red': '#C3002F',
        'smu-red-light': '#E6003D',
        'smu-red-dark': '#9B0025',

        // Dark Mode Palette
        'dark-bg': '#111111',
        'dark-surface': '#1A1A1A',
        'dark-elevated': '#222222',
        'dark-border': '#2A2A2A',
        'dark-text': '#EAEAEA',
        'dark-text-secondary': '#A0A0A0',

        // Light Mode Palette
        'light-bg': '#FAFAFA',
        'light-surface': '#FFFFFF',
        'light-elevated': '#F5F5F5',
        'light-border': '#E5E5E5',
        'light-text': '#1A1A1A',
        'light-text-secondary': '#666666',

        // Accent Colors
        'accent-blue': '#3B82F6',
        'accent-purple': '#8B5CF6',
        'accent-cyan': '#06B6D4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
