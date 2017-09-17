import { TIMELINES_SET_POSTS, TIMELINES_TOGGLE_HAS_MORE } from '.'

export const setPosts = (id, posts) => ({
  id,
  posts,
  type: TIMELINES_SET_POSTS
})

export const setHasMore = (id, hasMore) => ({
  hasMore,
  id,
  type: TIMELINES_TOGGLE_HAS_MORE
})
