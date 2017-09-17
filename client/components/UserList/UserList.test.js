import React from 'react'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import store from '../../store'

import UserList from './UserList'

it('renders correctly', () => {
  const tree1 = renderer.create(<UserList />).toJSON()

  const tree2 = renderer.create(<UserList isPending />).toJSON()

  const tree3 = renderer
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

  expect(tree1).toMatchSnapshot()
  expect(tree2).toMatchSnapshot()
  expect(tree3).toMatchSnapshot()
})
