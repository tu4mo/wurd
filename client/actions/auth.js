import { AUTH_CLEAR, AUTH_SET_ERROR, AUTH_SET_TOKEN, AUTH_SET_USER } from '.'

import { fetchAccount } from './account'
import { fetchUserByUsername } from './users'

export const authenticateUser = () => async (dispatch, getState, api) => {
  try {
    const response = await api({ method: 'get', endpoint: 'auth' })
    const { data: { id, username } } = response

    dispatch({
      type: AUTH_SET_USER,
      id,
      username
    })

    dispatch(fetchAccount())
    dispatch(fetchUserByUsername(username))
  } catch (err) {
    dispatch(logOut())
  }
}

export const logIn = (email, password) => async (dispatch, getState, api) => {
  try {
    const response = await api({
      method: 'post',
      endpoint: 'auth',
      data: {
        email,
        password
      }
    })

    dispatch({
      type: AUTH_SET_TOKEN,
      token: response.data.token
    })

    dispatch(authenticateUser())
  } catch (err) {
    dispatch({
      type: AUTH_SET_ERROR,
      error: err.response.data.error
    })
  }
}

export const logOut = () => ({
  type: AUTH_CLEAR
})

// TODO: Move to account.js
export const signUp = (username, email, password) => async (
  dispatch,
  getState,
  api
) => {
  try {
    await api({
      method: 'post',
      endpoint: 'account',
      data: {
        email,
        username,
        password
      }
    })

    dispatch(logIn(email, password))
  } catch (err) {
    dispatch({
      type: AUTH_SET_ERROR,
      error: err.response.data.error
    })
  }
}
