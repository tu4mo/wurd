import React from 'react'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import store from '../../store'

import UserList from './UserList'

it('should render null', () => {
  const tree = renderer.create(<UserList />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render null', () => {
  const tree = renderer.create(<UserList isPending />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render users', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter>
          <UserList
            users={[
              {
                profileUrl: 'https://www.domain.com/profile.jpg',
                username: 'tu4mo'
              }
            ]}
          />
        </MemoryRouter>
      </Provider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
