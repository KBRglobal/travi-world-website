/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#573CD0', dark: '#4530A8', light: '#6443F4' },
      },
    },
  },
  plugins: [],
};
