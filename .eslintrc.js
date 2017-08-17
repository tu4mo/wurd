module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ['standard', 'standard-react', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  rules: {
    'jsx-quotes': ['error', 'prefer-double']
  },
  settings: {
    'import/resolver': 'webpack'
  }
}
