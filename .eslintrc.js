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
    'plugin:jsx-a11y/recommended',
    'plugin:testcafe/recommended'
  ],
  parser: 'babel-eslint',
  plugins: ['jsx-a11y', 'testcafe'],
  rules: {
    'comma-dangle': ['error', 'never'],
    'react/jsx-sort-props': 'error',
    'react/sort-comp': 'error',
    'react/sort-prop-types': 'error',
    'sort-keys': ['error', 'asc', { caseSensitive: true, natural: false }]
  },
  settings: {
    'import/resolver': 'webpack'
  }
}
