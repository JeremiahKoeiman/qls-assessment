module.exports = {
  root: true,
  ignorePatterns: ['**/*'],
  plugins: ['@nx'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true
      },
      plugins: ['@stylistic/js'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@nx/typescript'],
      rules: {
        '@angular-eslint/component-class-suffix': [
          'error',
          {
            suffixes: ['Container', 'Component', 'Pipe', 'Directive', 'Service', 'Dialog']
          }
        ],
        '@stylistic/js/arrow-parens': [2, 'as-needed'],
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_'
          }
        ],
        '@typescript-eslint/prefer-readonly': [
          'error',
          {
            onlyInlineLambdas: true
          }
        ],
        'max-len': [
          'error',
          {
            code: 140,
            ignoreTemplateLiterals: true
          }
        ],
        'no-restricted-imports': [
          'warn',
          {
            patterns: [
              {
                group: ['../src/*', '../../src/*', '../../../src/*', '../../../../src/*'],
                message: 'Please do not import directly from src/ folders. Please import using the library name.'
              },
              {
                group: ['projects/*', '../projects/*', '../../projects/*', '../../../projects/*', '../../../../projects/*'],
                message: 'Please do not import directly from the projects/ folders. Please import using the library name.'
              }
            ]
          }
        ],
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error'
      }
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nx/javascript'],
      rules: {}
    },
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
      env: {
        jest: true
      },
      rules: {
        'max-len': ['off']
      }
    }
  ]
};
