const sortPostsByCreatedAt = posts => {
  const entries = Object.entries(posts)
  const sorted = entries
    .sort((a, b) => new Date(a[1].createdAt) - new Date(b[1].createdAt))
    .reverse()

  const obj = sorted.reduce(
    (acc, val) => ({
      ...acc,
      [val[0]]: val[1]
    }),
    {}
  )

  return obj
}

export const getPostsByUsername = username => state => {
  const { posts } = state

  const usersPosts = Object.keys(posts).reduce((acc, val) => {
    return posts[val].user.username === username
      ? {
          ...acc,
          [val]: posts[val]
        }
      : acc
  }, {})

  return sortPostsByCreatedAt(usersPosts)
}

export const getPostsForHome = state => sortPostsByCreatedAt(state.posts)

export const getFollowedPosts = state => {
  const { auth: { username }, posts } = state

  if (!state.users[username]) return {}

  const followedUsers = [...state.users[username].following, username]

  const filteredPosts = Object.keys(posts).reduce((acc, val) => {
    return followedUsers.includes(posts[val].user.username)
      ? {
          ...acc,
          [val]: posts[val]
        }
      : acc
  }, {})

  return sortPostsByCreatedAt(filteredPosts)
}