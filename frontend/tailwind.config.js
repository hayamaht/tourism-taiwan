/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    //"./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('https://tecdn.b-cdn.net/img/new/slides/146.webp')",
      }
    },
  },
  darkMode: "class",
  plugins: [
    require("daisyui"),
    //require("tw-elements/dist/plugin.cjs"),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  daisyui: {
    themes: ['emerald', 'business']
  }
}

