const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // all aliases are prefixed with `X` for this project
        // https://tailwindcss.com/docs/customizing-colors#aliasing-color-names
        Xborder: {
          DEFAULT: colors.neutral[900],
        },
      },
      transitionTimingFunction: {
        'ease-out-quad': 'cubic-bezier(0.5, 1, 0.89, 1)',
      },
    },
  },
  plugins: [],
}
