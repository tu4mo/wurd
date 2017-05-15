import { FETCH_USER } from '.'

export const fetchUserByUsername = username => (dispatch, getState, api) => {
  api('get', `users/${username}`).then(response => {
    dispatch({
      type: FETCH_USER,
      user: response.data
    })
  })
}
