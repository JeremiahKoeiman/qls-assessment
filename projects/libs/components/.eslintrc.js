const { join } = require('path');
module.exports = {
  extends: [
    '../../../.eslintrc.js',
    'plugin:tailwindcss/recommended',
    'eslint:recommended',
    'plugin:@nx/angular',
    'plugin:@angular-eslint/template/process-inline-templates',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  ignorePatterns: ['!**/*'],
  plugins: ['tailwindcss'],
  settings: {
    tailwindcss: {
      callees: ['class', 'ngClass'],
      config: join(__dirname, './tailwind.config.js')
    }
  },
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['./tsconfig.editor.json'],
        tsconfigRootDir: __dirname
      },
      rules: {
        eqeqeq: 'off',
        'no-nested-ternary': 'error',
        'no-unneeded-ternary': 'error',
        'no-empty': 'error',
        'no-empty-pattern': 'error',
        'no-void': 'error',
        'no-undef-init': 'error',
        'no-global-assign': 'error',
        'no-trailing-spaces': 'error',
        'jsdoc/newline-after-description': 'off',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        'object-curly-spacing': ['error', 'always'],
        'no-console': [
          'error',
          {
            allow: ['error']
          }
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'qls',
            style: 'kebab-case'
          }
        ]
      }
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      files: ['*.html'],
      extends: ['plugin:@nx/angular-template', 'plugin:@angular-eslint/template/recommended'],
      rules: {
        'tailwindcss/no-custom-classname': 1,
        '@angular-eslint/template/prefer-self-closing-tags': ['error']
      }
    },
    {
      files: ['*.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        '@nx/dependency-checks': 'error'
      }
    }
  ]
};
