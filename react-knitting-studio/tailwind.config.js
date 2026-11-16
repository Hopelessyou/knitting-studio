/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c46243',
        'primary-hover': '#b8593b',
        'primary-light': '#ffdbd0',
        secondary: '#2c3a47',
        'secondary-light': '#52606e',
        tertiary: '#7a8b7b',
        surface: '#fff8f3',
        'surface-container': '#f8ecdf',
        'surface-container-low': '#fef2e5',
        'surface-container-lowest': '#ffffff',
        'on-surface': '#201b13',
        'on-surface-variant': '#56423d',
        outline: '#89726c',
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
