/* eslint-disable */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:jest/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  env: {
    es6: true,
    browser: true,
    node: true,
    'jest/globals': true,
  },
  ignorePatterns: ['node_modules/*', 'dist'],
  rules: {
    'import/no-named-as-default': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { caughtErrors: 'none', argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/no-empty-interface': 'off',
  },
};
