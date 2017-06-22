import {
  FETCH_USER,
  FETCH_USERS_PENDING,
  FETCH_USERS_FULFILLED,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '~/actions'

const users = (state = { isPending: false, data: {} }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isPending: false,
        data: {
          ...state.data,
          [action.user.username]: action.user
        }
      }

    case FETCH_USERS_PENDING:
      return {
        ...state,
        isPending: true
      }

    case FETCH_USERS_FULFILLED:
      return {
        ...state,
        isPending: false,
        data: {
          ...state.data,
          ...action.users.reduce(
            (acc, val) => ({
              ...acc,
              [val.username]: val
            }),
            {}
          )
        }
      }

    case FOLLOW_USER:
      return {
        ...state,
        data: {
          ...state.data,
          [action.username]: {
            ...state.data[action.username],
            following: [
              ...state.data[action.username].following,
              { username: action.following }
            ]
          }
        }
      }

    case UNFOLLOW_USER:
      return {
        ...state,
        data: {
          ...state.data,
          [action.username]: {
            ...state.data[action.username],
            following: state.data[action.username].following.filter(
              user => user.username !== action.following
            )
          }
        }
      }

    default:
      return state
  }
}

export default users
