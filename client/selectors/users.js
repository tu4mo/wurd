export const getAuthenticatedUser = state =>
  state.users.data[state.auth.username] || {}

export const getUser = username => state => state.users.data[username]

export const getUsers = state => ({
  isPending: state.users.isPending,
  data: Object.keys(state.users.data)
    .map(username => ({
      username,
      profileUrl: state.users.data[username].profileUrl
    }))
    .sort((a, b) => a.username.localeCompare(b.username))
})

export const isFollowingUsername = username => state => {
  const authenticatedUser = getAuthenticatedUser(state)

  if (!authenticatedUser) return false

  return (
    authenticatedUser.following.findIndex(
      user => username === user.username
    ) !== -1
  )
}
