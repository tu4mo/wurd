const stylelintConfig = require('./stylelint.config')

module.exports = {
  ...stylelintConfig,
  extends: [...stylelintConfig.extends, 'stylelint-config-styled-components'],
  processors: ['stylelint-processor-styled-components'],
  rules: {
    ...stylelintConfig.rules,
    'comment-empty-line-before': null // Fix for false positives
  }
}
