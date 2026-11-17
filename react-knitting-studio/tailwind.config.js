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
        'on-surface': '#1b1712',
        'on-surface-variant': '#473630',
        outline: '#7c6660',
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', 'serif'],
        sans: ['"Pretendard"', '"Plus Jakarta Sans"', '"Noto Sans KR"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
