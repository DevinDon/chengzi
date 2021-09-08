module.exports = {
  purge: [
    './apps/**/*/src/**/*.tsx',
    './libs/**/*/src/**/*.tsx',
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
