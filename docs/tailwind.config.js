/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{md,ts,mdx,tsx}",
    "./examples/**/*.{md,ts,mdx,tsx}",
    "./pages/**/*.{md,ts,mdx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
