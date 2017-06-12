import { FETCH_USER, FETCH_USERS, FOLLOW_USER, UNFOLLOW_USER } from '../actions'

const users = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        [action.user.username]: action.user
      }

    case FETCH_USERS:
      return {
        ...state,
        ...action.users.reduce(
          (acc, val) => ({
            ...acc,
            [val.username]: val
          }),
          {}
        )
      }

    case FOLLOW_USER:
      return {
        ...state,
        [action.username]: {
          ...state[action.username],
          following: [
            ...state[action.username].following,
            { username: action.following }
          ]
        }
      }

    case UNFOLLOW_USER:
      return {
        ...state,
        [action.username]: {
          ...state[action.username],
          following: state[action.username].following.filter(
            user => user.username !== action.following
          )
        }
      }

    default:
      return state
  }
}

export default users
