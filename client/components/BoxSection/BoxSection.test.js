import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import BoxSection from './BoxSection'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <BoxSection hasPadding>
        Test
      </BoxSection>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
