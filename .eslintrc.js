module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  globals: {
    think: 'readonly'
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'no-unused-vars': 'warn',
    camelcase: 'off'
  }
}