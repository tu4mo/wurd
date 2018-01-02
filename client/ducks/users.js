import { getMe } from '../selectors/users'

const USER_FETCH = 'USER/FETCH'
const USER_FOLLOW = 'USER/FOLLOW'
const USER_UNFOLLOW = 'USER/UNFOLLOW'

const USERS_FETCH_PENDING = 'USERS/FETCH_PENDING'
const USERS_FETCH_FULFILLED = 'USERS/FETCH_FULFILLED'
const USERS_FETCH_REJECTED = 'USERS/FETCH_REJECTED'

export const fetchUserByUsername = username => (dispatch, getState, api) => {
  return api({
    method: 'get',
    url: `users/${username}`
  }).then(response => {
    dispatch({
      type: USER_FETCH,
      user: response.data
    })
  })
}

export const fetchUsers = () => async (dispatch, getState, api) => {
  try {
    dispatch({
      type: USERS_FETCH_PENDING
    })

    const response = await api({ method: 'get', url: 'users' })

    dispatch({
      type: USERS_FETCH_FULFILLED,
      users: response.data.users
    })
  } catch (err) {
    dispatch({
      type: USERS_FETCH_REJECTED
    })
  }
}

export const followUser = username => (dispatch, getState, api) => {
  dispatch({
    following: username,
    type: USER_FOLLOW,
    username: getMe(getState()).username
  })

  return api({
    method: 'post',
    params: {
      username
    },
    url: `relationships`
  }).then(response => {
    // TODO: Instead of fetching the user separately,
    // make API return the user after following
    dispatch(fetchUserByUsername(username))
  })
}

export const unfollowUser = username => (dispatch, getState, api) => {
  dispatch({
    following: username,
    type: USER_UNFOLLOW,
    username: getMe(getState()).username
  })

  return api({
    method: 'delete',
    params: {
      username
    },
    url: 'relationships'
  }).then(response => {
    // TODO: Instead of fetching the user separately,
    // make API return the user after following
    dispatch(fetchUserByUsername(username))
  })
}

const INITIAL_STATE = {
  data: {},
  isPending: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_FETCH:
      return {
        ...state,
        data: {
          ...state.data,
          [action.user.username]: action.user
        },
        isPending: false
      }

    case USERS_FETCH_PENDING:
      return {
        ...state,
        isPending: true
      }

    case USERS_FETCH_FULFILLED:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.users.reduce(
            (acc, val) => ({
              ...acc,
              [val.username]: val
            }),
            {}
          )
        },
        isPending: false
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
