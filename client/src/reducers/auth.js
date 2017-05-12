import { AUTH_TOKEN } from '../actions'

const INITIAL_STATE = {
  token: null
}

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_TOKEN:
      return {
        token: action.token
      }
    default:
      return state
  }
}

export default auth
