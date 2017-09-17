import { AUTH_CLEAR, AUTH_SET_ERROR, AUTH_SET_TOKEN, AUTH_SET_USER } from '.'

import { fetchAccount } from './account'
import { fetchUserByUsername } from './users'

export const authenticateUser = () => async (dispatch, getState, api) => {
  try {
    const response = await api({ method: 'get', url: 'auth' })
    const { data: { id, username } } = response

    dispatch({
      id,
      type: AUTH_SET_USER,
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
      data: {
        email,
        password
      },
      method: 'post',
      url: 'auth'
    })

    dispatch({
      token: response.data.token,
      type: AUTH_SET_TOKEN
    })

    dispatch(authenticateUser())
  } catch (err) {
    dispatch({
      error: err.response.data.error,
      type: AUTH_SET_ERROR
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
      data: {
        email,
        password,
        username
      },
      method: 'post',
      url: 'account'
    })

    dispatch(logIn(email, password))
  } catch (err) {
    dispatch({
      error: err.response.data.error,
      type: AUTH_SET_ERROR
    })
  }
}
