import {
  USER_FETCH,
  USERS_FETCH_PENDING,
  USERS_FETCH_FULFILLED,
  USER_FOLLOW,
  USER_UNFOLLOW
} from '~/actions'

const users = (state = { isPending: false, data: {} }, action) => {
  switch (action.type) {
    case USER_FETCH:
      return {
        ...state,
        isPending: false,
        data: {
          ...state.data,
          [action.user.username]: action.user
        }
      }

    case USERS_FETCH_PENDING:
      return {
        ...state,
        isPending: true
      }

    case USERS_FETCH_FULFILLED:
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

    case USER_FOLLOW:
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

    case USER_UNFOLLOW:
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
