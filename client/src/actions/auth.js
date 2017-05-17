import { AUTH_CLEAR, AUTH_SET_ERROR, AUTH_SET_TOKEN, AUTH_SET_USER } from '.'

export const getUser = () => (dispatch, getState, api) => {
  api('get', 'auth')
    .then(response =>
      dispatch({
        type: AUTH_SET_USER,
        user: response.data
      })
    )
    .catch(() => {
      dispatch(logOut())
    })
}

export const logIn = (email, password) => (dispatch, getState, api) => {
  return api('post', 'auth', {
    email,
    password
  })
    .then(response => {
      dispatch({
        type: AUTH_SET_TOKEN,
        token: response.data.token
      })
    })
    .catch(err => {
      dispatch({
        type: AUTH_SET_ERROR,
        error: err.response.data.error
      })

      throw err
    })
}

export const logOut = () => ({
  type: AUTH_CLEAR
})
