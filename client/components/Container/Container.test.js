import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Container from './Container'

it('renders correctly', () => {
  const tree1 = renderer.create(<Container>Test</Container>).toJSON()
  const tree2 = renderer
    .create(<Container disablePadding>Test</Container>)
    .toJSON()
  const tree3 = renderer.create(<Container fullHeight>Test</Container>).toJSON()
  const tree4 = renderer
    .create(<Container withYPadding>Test</Container>)
    .toJSON()

  expect(tree1).toMatchSnapshot()
  expect(tree2).toMatchSnapshot()
  expect(tree3).toMatchSnapshot()
  expect(tree4).toMatchSnapshot()
})
