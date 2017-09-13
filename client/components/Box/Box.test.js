import React from 'react'
import renderer from 'react-test-renderer'

import Box from './Box'
import BoxSection from './BoxSection'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Box className="test">
        <BoxSection className="test" hasPadding>
          Test
        </BoxSection>
      </Box>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
