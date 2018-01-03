import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Input from './Input'

it('renders correctly', () => {
  const tree = renderer.create(<Input id="test-id" />).toJSON()

  expect(tree).toMatchSnapshot()
})
