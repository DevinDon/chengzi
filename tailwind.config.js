module.exports = {
  purge: [
    './apps/**/*.tsx',
    './libs/**/*.tsx',
  ],
  darkMode: 'media', // false or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
