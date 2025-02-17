module.exports = {
  trailingComma: 'none',
  printWidth: 120,
  htmlWhitespaceSensitivity: 'ignore',
  singleQuote: true,
  overrides: [
    {
      files: '*.html',
      options: {
        printWidth: 100
      }
    }
  ],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  arrowParens: 'avoid',
  plugins: [require.resolve('prettier-plugin-tailwindcss')]
};
