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
    'prettier/standard',
    'plugin:jsx-a11y/recommended'
  ],
  parser: 'babel-eslint',
  plugins: ['jsx-a11y'],
  rules: {
    'comma-dangle': ['error', 'never'],
    'react/sort-comp': 'error',
    'react/sort-prop-types': 'error',
    'sort-keys': ['error', 'asc', { caseSensitive: true, natural: false }]
  },
  settings: {
    'import/resolver': 'webpack'
  }
}
