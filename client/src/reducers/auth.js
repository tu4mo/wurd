import { AUTH_CLEAR, AUTH_SET_TOKEN, AUTH_SET_USER } from '../actions'

const INITIAL_STATE = {
  isAuthenticated: false,
  token: null,
  user: null
}

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_CLEAR:
      return INITIAL_STATE
    case AUTH_SET_TOKEN:
      return {
        isAuthenticated: true,
        token: action.token,
        user: null
      }
    case AUTH_SET_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}

export default auth
