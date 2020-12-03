module.exports = {
  env: {
    es2021: true
  },
  globals: {
    think: 'readonly',
    mongo: 'readonly'
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    camelcase: 'off'
  }
}
