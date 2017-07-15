import { setOptions } from '@storybook/addon-options'
import { configure } from '@storybook/react'

function loadStories() {
  require('./stories/index.js')
}

setOptions({
  downPanelInRight: true
})

configure(loadStories, module)
