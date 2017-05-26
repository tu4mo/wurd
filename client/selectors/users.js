export const getAuthenticatedUser = state => state.users[state.auth.username]

export const getUser = username => state => state.users[username]

export const isFollowingUsername = username => state => {
  const authenticatedUser = getAuthenticatedUser(state)

  if (!authenticatedUser) return false

  return authenticatedUser.following.includes(username)
}
