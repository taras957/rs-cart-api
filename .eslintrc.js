module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-explicit-any':'off',
    "@typescript-eslint/no-var-requires":"off",
    "strict":'off',
    "one-var":"off",
    "@typescript-eslint/no-var-requires":"off",
    "no-cond-assign":'off',
    "no-sequences":'off',
    "no-extra-parens":'off',
    "no-cond-assign":'off',
    "@typescript-eslint/no-unused-vars":'off',
    "@typescript-eslint/no-unused-vars":'off',
    "semi":'off'



  }
};
