import { FETCH_USER } from '.'

export const fetchUserByUsername = username => (dispatch, getState, api) => {
  api('get', `users/${username}`).then(response => {
    dispatch({
      type: FETCH_USER,
      user: response.data
    })
  })
}

export const followUser = username => (dispatch, getState, api) => {
  api('post', `relationships?username=${username}`).then(response => {
    // TODO: Instead of fetching the user separately,
    // make API return the user after following
    dispatch(fetchUserByUsername(username))
  })
}

export const unfollowUser = username => (dispatch, getState, api) => {
  api('delete', `relationships?username=${username}`).then(response => {
    // TODO: Instead of fetching the user separately,
    // make API return the user after following
    dispatch(fetchUserByUsername(username))
  })
}

export const saveProfilePhoto = (file, username) => (
  dispatch,
  getState,
  api
) => {
  let data = new FormData()
  data.append('file', file)

  api('post', 'account/profile-photo', data).then(response => {
    dispatch(fetchUserByUsername(username))
  })
}
