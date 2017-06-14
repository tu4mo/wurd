import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'

import Button from '../../components/Button'

const stories = storiesOf('Button', module)

stories.addDecorator(withKnobs)

stories.add('with text', () =>
  <Button disabled={boolean('Disabled', false)} onClick={action('clicked')}>
    Button
  </Button>
)
