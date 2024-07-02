/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,css}'],
  darkMode: 'selector',
  theme: {
    extend: {
      animation: {
        modalf: 'modalf 0.15s ease-in-out',
      },
      keyframes: {
        modalf: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
