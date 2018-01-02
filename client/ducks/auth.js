import { fetchAccount } from './account'
import { fetchUserByUsername } from './users'

const AUTH_CLEAR = 'AUTH/CLEAR'
const AUTH_SET_AUTHENTICATED = 'AUTH/SET_AUTHENTICATED'
const AUTH_SET_ERROR = 'AUTH/SET_ERROR'

export const authenticateUser = () => async (dispatch, getState, api) => {
  try {
    const response = await api({ method: 'get', url: 'auth' })
    const { data: { id, username } } = response

    dispatch({
      id,
      type: AUTH_SET_AUTHENTICATED,
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

    localStorage.setItem('token', response.data.token)

    dispatch(authenticateUser())
  } catch (err) {
    dispatch({
      error: err.response.data.error,
      type: AUTH_SET_ERROR
    })
  }
}

export const logInWithToken = (token, callback) => async (
  dispatch,
  getState,
  api
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await api({
        data: {
          token
        },
        method: 'post',
        url: 'auth/token'
      })

      localStorage.setItem('token', response.data.token)

      dispatch(authenticateUser())

      resolve()
    } catch (err) {
      dispatch({
        error: err.response.data.error,
        type: AUTH_SET_ERROR
      })

      reject(err)
    }
  })

export const logOut = () => {
  localStorage.removeItem('token')

  return {
    type: AUTH_CLEAR
  }
}

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

const INITIAL_STATE = {
  authenticated: false,
  error: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_CLEAR:
      return {
        ...INITIAL_STATE,
        error: state.error
      }

    case AUTH_SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        error: null
      }

    case AUTH_SET_ERROR:
      return {
        ...INITIAL_STATE,
        error: action.error
      }

    default:
      return state
  }
}
