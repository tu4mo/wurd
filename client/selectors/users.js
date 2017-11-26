export const getMe = state => state.users.data[state.account.username] || {}

export const getUser = username => state => state.users.data[username] || {}

export const getUsers = state => ({
  data: Object.keys(state.users.data)
    .map(username => ({
      profileUrl: state.users.data[username].profileUrl,
      username
    }))
    .sort((a, b) => a.username.localeCompare(b.username)),
  isPending: state.users.isPending
})

export const isFollowingUsername = username => state => {
  const me = getMe(state)

  if (!me || !me.following) {
    return false
  }

  return me.following.findIndex(user => username === user.username) !== -1
}
