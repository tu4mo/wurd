import {
  FETCH_USER,
  FETCH_USERS_PENDING,
  FETCH_USERS_FULFILLED,
  FETCH_USERS_REJECTED,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '.'

export const fetchUserByUsername = username => (dispatch, getState, api) => {
  return api('get', `users/${username}`).then(response => {
    dispatch({
      type: FETCH_USER,
      user: response.data
    })
  })
}

export const fetchUsers = () => async (dispatch, getState, api) => {
  try {
    dispatch({
      type: FETCH_USERS_PENDING
    })

    const response = await api('get', 'users')

    dispatch({
      type: FETCH_USERS_FULFILLED,
      users: response.data.users
    })
  } catch (err) {
    dispatch({
      type: FETCH_USERS_REJECTED
    })
  }
}

export const followUser = username => (dispatch, getState, api) => {
  dispatch({
    type: FOLLOW_USER,
    username: getState().auth.username,
    following: username
  })

  return api('post', `relationships?username=${username}`).then(response => {
    // TODO: Instead of fetching the user separately,
    // make API return the user after following
    dispatch(fetchUserByUsername(username))
  })
}

export const unfollowUser = username => (dispatch, getState, api) => {
  dispatch({
    type: UNFOLLOW_USER,
    username: getState().auth.username,
    following: username
  })

  return api('delete', `relationships?username=${username}`).then(response => {
    // TODO: Instead of fetching the user separately,
    // make API return the user after following
    dispatch(fetchUserByUsername(username))
  })
}
