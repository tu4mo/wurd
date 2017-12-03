import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { color, withKnobs, text, boolean, number } from '@storybook/addon-knobs'
import { MemoryRouter } from 'react-router'

import Button from '../../components/Button'
import Post from '../../components/Post/Post'

import '../../App.scss'

const stories = storiesOf('Components', module)

stories.addDecorator(withKnobs)
stories.addDecorator(story => (
  <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
))

stories.add('Button', () => (
  <Button
    disabled={boolean('disabled', false)}
    link={boolean('link', false)}
    loading={boolean('loading', false)}
    onClick={action('clicked')}
    secondary={boolean('secondary', false)}
    textOnly={boolean('textOnly', false)}
  >
    Button
  </Button>
))

stories.add('Post', () => (
  <Post
    post={{
      comments: [],
      content: text('content', 'Post can be five words'),
      gradientEnd: color('gradientEnd', '#eeeeee'),
      gradientStart: color('gradientStart', '#dddddd'),
      createdAt: Date.now(),
      id: '123',
      liked: boolean('liked', true),
      likes: number('likes', 5),
      user: { username: 'tu4mo', profileUrl: 'test' }
    }}
  />
))
