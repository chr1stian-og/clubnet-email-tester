/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/App.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["acid"],
  },
};