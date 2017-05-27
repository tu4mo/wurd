import {
  AUTH_CLEAR,
  AUTH_SET_ERROR,
  AUTH_SET_TOKEN,
  AUTH_SET_USER
} from '../actions'

const INITIAL_STATE = {
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
        ...state,
        error: action.error
      }

    case AUTH_SET_TOKEN:
      return {
        ...state,
        error: null,
        token: action.token,
        username: null
      }

    case AUTH_SET_USER:
      return {
        ...state,
        id: action.id,
        error: null,
        username: action.username
      }

    default:
      return state
  }
}

export default auth