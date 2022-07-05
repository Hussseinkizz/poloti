module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './screens/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    // require('daisyui'),
    // require('tw-elements/dist/plugin'),
  ],
  theme: {
    extend: {},
  },
  // daisyui: {
  //   // themes: ['light', 'dark'],
  //   themes: false,
  // },
};
