/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a56db',
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d7fe',
          300: '#a4bcfd',
          400: '#8098f9',
          500: '#6173f3',
          600: '#4756e6',
          700: '#3a46cc',
          800: '#2d39a2',
          900: '#243283',
        },
        secondary: {
          DEFAULT: '#14b8a6',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
