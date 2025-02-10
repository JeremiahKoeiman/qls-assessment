module.exports = {
  extends: ['../../../.eslintrc.js'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['./tsconfig.editor.json'],
        tsconfigRootDir: __dirname
      },
      extends: ['plugin:@nx/angular', 'plugin:@angular-eslint/template/process-inline-templates'],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'sd',
            style: 'camelCase'
          }
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'sd',
            style: 'kebab-case'
          }
        ],
      }
    },
    {
      files: ['*.html'],
      extends: ['plugin:@nx/angular-template'],
      rules: {}
    }
  ]
};
