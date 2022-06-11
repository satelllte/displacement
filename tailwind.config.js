/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'ease-out-quad': 'cubic-bezier(0.5, 1, 0.89, 1)',
      },
    },
  },
  plugins: [],
}
