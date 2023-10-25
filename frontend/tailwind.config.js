/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require("daisyui"),
    require("tw-elements/dist/plugin.cjs"),
    require('@tailwindcss/forms'),
  ],
  daisyui: {
    themes: ['emerald', 'business']
  }
}

