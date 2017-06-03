import { AUTH_CLEAR, AUTH_SET_ERROR, AUTH_SET_TOKEN, AUTH_SET_USER } from '.'

import { fetchUserByUsername } from './users'

export const authenticateUser = () => async (dispatch, getState, api) => {
  try {
    const response = await api('get', 'auth')
    const { data: { id, username } } = response

    dispatch({
      type: AUTH_SET_USER,
      id,
      username
    })

    dispatch(fetchUserByUsername(username))
  } catch (err) {
    dispatch(logOut())
  }
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

      dispatch(authenticateUser())
    })
    .catch(err => {
      dispatch({
        type: AUTH_SET_ERROR,
        error: err.response.data.error
      })
    })
}

export const logOut = () => ({
  type: AUTH_CLEAR
})

export const signUp = (username, email, password, passwordConfirm) => async (
  dispatch,
  getState,
  api
) => {
  try {
    await api('post', 'users', {
      email,
      username,
      password,
      passwordConfirm
    })

    dispatch(logIn(email, password))
  } catch (err) {
    dispatch({
      type: AUTH_SET_ERROR,
      error: err.response.data.error
    })
  }
}
