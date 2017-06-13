module.exports = {
  env: {
    browser: true
  },
  extends: ['standard', 'standard-react', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'jsx-quotes': ['error', 'prefer-double']
  }
}
