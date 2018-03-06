import { EMPTY_ARRAY, EMPTY_OBJECT } from '.'

export const getMe = state =>
  state.users.data[state.account.username] || EMPTY_OBJECT

export const getUser = username => state =>
  state.users.data[username] || EMPTY_OBJECT

export const getUsers = state => {
  const keys = Object.keys(state.users.data)

  return keys.length > 0
    ? keys
        .map(username => ({
          profileUrl: state.users.data[username].profileUrl,
          username
        }))
        .sort((a, b) => a.username.localeCompare(b.username))
    : EMPTY_ARRAY
}

export const isFollowingUsername = username => state => {
  const me = getMe(state)

  if (!me || !me.following) {
    return false
  }

  return me.following.findIndex(user => username === user.username) !== -1
}

export const isUsersPending = state => state.users.isPending
