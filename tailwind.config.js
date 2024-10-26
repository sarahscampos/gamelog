/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'jetbrains': ['JetBrains Mono, sans-serif'],
        'inter': ['Inter, sans-serif'],
        'fira': ['Fira Sans, sans-serif'],
      }
    },
  },
  plugins: [],
}

