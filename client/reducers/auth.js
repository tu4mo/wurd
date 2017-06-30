import {
  AUTH_CLEAR,
  AUTH_SET_ERROR,
  AUTH_SET_TOKEN,
  AUTH_SET_USER
} from '~/actions'

const INITIAL_STATE = {
  email: null,
  error: null,
  id: null,
  token: null,
  username: null
}

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_CLEAR:
      return {
        ...INITIAL_STATE,
        error: state.error
      }

    case AUTH_SET_ERROR:
      return {
        ...INITIAL_STATE,
        error: action.error
      }

    case AUTH_SET_TOKEN:
      return {
        ...INITIAL_STATE,
        token: action.token
      }

    case AUTH_SET_USER:
      return {
        ...state,
        email: action.email,
        error: null,
        id: action.id,
        username: action.username
      }

    default:
      return state
  }
}

export default auth
