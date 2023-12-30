/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js}',
    './index.html',

  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend:{}
  },
  plugins: [],
}

