module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['content', 'extends', 'ignores', 'include', 'mixin']
      }
    ],
    'declaration-colon-newline-after': null,
    'value-list-comma-newline-after': null
  }
}
