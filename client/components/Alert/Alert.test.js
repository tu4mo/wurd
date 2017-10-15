import React from 'react'
import Alert from './Alert'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

it('renders correctly', () => {
  const tree = renderer.create(<Alert message="Hello World!" />).toJSON()
  expect(tree).toMatchSnapshot()
})
