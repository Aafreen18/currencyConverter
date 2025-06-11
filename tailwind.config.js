/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        dancing: ['"Dancing Script"', 'cursive'],
      },
      backgroundImage: {
        'custom-bg': "url('/src/assets/bg1.svg')",
      },
    },
  },
  plugins: [],
}