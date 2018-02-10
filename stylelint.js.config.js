const stylelintConfig = require('./stylelint.config')

module.exports = {
  ...stylelintConfig,
  extends: [...stylelintConfig.extends, 'stylelint-config-styled-components'],
  processors: ['stylelint-processor-styled-components'],
  rules: {
    ...stylelintConfig.rules,
    'value-list-max-empty-lines': null
  }
}
