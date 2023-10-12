module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    'cypress/globals': true
  },
  overrides: [
    {
      files: ['./cypress/**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json']
      },
      plugins: ['import', '@typescript-eslint', 'cypress'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:cypress/recommended'
      ],
      rules: {
        semi: ['error'],
        'spaced-comment': 'off',
        'func-names': ['error', 'never'],
        'no-use-before-define': 'off',
        'comma-dangle': [
          'error',
          {
            arrays: 'ignore',
            objects: 'ignore',
            imports: 'ignore',
            exports: 'ignore',
            functions: 'never'
          }
        ],
        'no-plusplus': 'off',
        'no-redeclare': 'off',
        'no-extra-semi': 'error',
        'no-multi-spaces': 'error',
        'no-trailing-spaces': 'error',
        'no-multiple-empty-lines': 'error',
        'no-underscore-dangle': 'warn',
        'prefer-template': 'warn',
        'linebreak-style': 'off',
        'max-len': 'off',
        'arrow-parens': 'off',
        'function-paren-newline': 'off',
        indent: 'off',
        'implicit-arrow-linebreak': 'off',
        'object-curly-newline': [
          'error',
          {
            consistent: true
          }
        ],
        'operator-linebreak': 'off',
        'space-before-function-paren': 'off',
        'no-confusing-arrow': 'off',
        quotes: [
          'error',
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: false
          }
        ],
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              Function: false
            }
          }
        ],
        '@typescript-eslint/no-namespace': 'off'
      }
    }
  ]
};
