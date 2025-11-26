/** @type {import('tailwindcss').Config} */
module.exports = {
  // Garanta que os caminhos cobrem onde seus arquivos estão
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")], // <--- ISSO É ESSENCIAL NA V4
  theme: {
    extend: {},
  },
  plugins: [],
}