module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['content', 'extends', 'ignores', 'include', 'mixin']
      }
    ],
    'declaration-colon-newline-after': null,
    'declaration-empty-line-before': null,
    'value-list-comma-newline-after': null
  }
}
