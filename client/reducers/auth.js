import { AUTH_CLEAR, AUTH_SET_AUTHENTICATED, AUTH_SET_ERROR } from '~/actions'

const INITIAL_STATE = {
  authenticated: false,
  error: null
}

const auth = (state = INITIAL_STATE, action) => {
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

export default auth
