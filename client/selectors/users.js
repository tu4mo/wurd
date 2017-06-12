export const getAuthenticatedUser = state => state.users[state.auth.username]

export const getUser = username => state => state.users[username]

export const getUsers = state => Object.keys(state.users).map(username => ({
  username,
  profileUrl: state.users[username].profileUrl
}))

export const isFollowingUsername = username => state => {
  const authenticatedUser = getAuthenticatedUser(state)

  if (!authenticatedUser) return false

  return (
    authenticatedUser.following.findIndex(
      user => username === user.username
    ) !== -1
  )
}
