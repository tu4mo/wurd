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

  return usersPosts
}

export const getPostsForHome = state => state.posts
