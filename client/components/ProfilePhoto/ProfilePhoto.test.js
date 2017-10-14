import React from 'react'
import renderer from 'react-test-renderer'

import ProfilePhoto from './ProfilePhoto'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ProfilePhoto
        className="test"
        isMe
        size="small"
        url="https://www.test.com"
        username="test"
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
