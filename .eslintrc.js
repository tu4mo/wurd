module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true
  },
  extends: [
    'standard',
    'standard-react',
    'prettier',
    'prettier/react',
    'plugin:jsx-a11y/recommended'
  ],
  parser: 'babel-eslint',
  plugins: ['jsx-a11y'],
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
    'react/sort-comp': 'error',
    'react/sort-prop-types': 'error'
  },
  settings: {
    'import/resolver': 'webpack'
  }
}
