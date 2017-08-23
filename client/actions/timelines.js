import { TIMELINES_SET_POSTS, TIMELINES_TOGGLE_HAS_MORE } from '.'

export const setPosts = (id, posts) => ({
  type: TIMELINES_SET_POSTS,
  id,
  posts
})

export const setHasMore = (id, hasMore) => ({
  type: TIMELINES_TOGGLE_HAS_MORE,
  id,
  hasMore
})
