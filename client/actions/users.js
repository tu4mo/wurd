import {
  USER_FETCH,
  USERS_FETCH_PENDING,
  USERS_FETCH_FULFILLED,
  USERS_FETCH_REJECTED,
  USER_FOLLOW,
  USER_UNFOLLOW
} from '.'

export const fetchUserByUsername = username => (dispatch, getState, api) => {
  return api({
    method: 'get',
    url: `users/${username}`
  }).then(response => {
    dispatch({
      type: USER_FETCH,
      user: response.data
    })
  })
}

export const fetchUsers = () => async (dispatch, getState, api) => {
  try {
    dispatch({
      type: USERS_FETCH_PENDING
    })

    const response = await api({ method: 'get', url: 'users' })

    dispatch({
      type: USERS_FETCH_FULFILLED,
      users: response.data.users
    })
  } catch (err) {
    dispatch({
      type: USERS_FETCH_REJECTED
    })
  }
}

export const followUser = username => (dispatch, getState, api) => {
  dispatch({
    type: USER_FOLLOW,
    username: getState().auth.username,
    following: username
  })

  return api({
    method: 'post',
    url: `relationships`,
    params: {
      username
    }
  }).then(response => {
    // TODO: Instead of fetching the user separately,
    // make API return the user after following
    dispatch(fetchUserByUsername(username))
  })
}

export const unfollowUser = username => (dispatch, getState, api) => {
  dispatch({
    type: USER_UNFOLLOW,
    username: getState().auth.username,
    following: username
  })

  return api({
    method: 'delete',
    url: 'relationships',
    params: {
      username
    }
  }).then(response => {
    // TODO: Instead of fetching the user separately,
    // make API return the user after following
    dispatch(fetchUserByUsername(username))
  })
}
