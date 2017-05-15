import { FETCH_USER } from '../actions'

const users = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        [action.user.username]: action.user
      }
    default:
      return state
  }
}

export default users
