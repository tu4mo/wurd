import { AUTH_CLEAR, AUTH_SET_ERROR, AUTH_SET_TOKEN, AUTH_SET_USER } from '.'

import { fetchUserByUsername } from './users'

export const authenticateUser = () => (dispatch, getState, api) => {
  api('get', 'auth')
    .then(response => {
      const { data: { id, username } } = response

      dispatch({
        type: AUTH_SET_USER,
        id,
        username
      })

      dispatch(fetchUserByUsername(username))
    })
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

      dispatch(authenticateUser())
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

export const signUp = (username, email, password, passwordConfirm) => (
  dispatch,
  getState,
  api
) => {
  api('post', 'users', {
    email,
    username,
    password,
    passwordConfirm
  })
    .then(response => {
      dispatch(logIn(email, password))
    })
    .catch(err => {
      throw err
    })
}