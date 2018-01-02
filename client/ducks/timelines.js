export const TIMELINES_REMOVE_POST = 'TIMELINES/REMOVE_POST'
export const TIMELINES_SET_POSTS = 'TIMELINES/SET_POSTS'
export const TIMELINES_TOGGLE_HAS_MORE = 'TIMELINES/TOGGLE_HAS_MORE'

export const removePost = id => ({
  id,
  type: TIMELINES_REMOVE_POST
})

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

export default (state = {}, action) => {
  switch (action.type) {
    case TIMELINES_REMOVE_POST:
      return Object.keys(state).reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: {
            ...state[curr],
            posts: state[curr].posts.filter(postId => postId !== action.id)
          }
        }),
        {}
      )

    case TIMELINES_TOGGLE_HAS_MORE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          hasMore: action.hasMore
        }
      }

    case TIMELINES_SET_POSTS:
      const currentPosts = (state[action.id] && state[action.id].posts) || []

      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          posts: [...new Set([...currentPosts, ...action.posts])]
            .sort()
            .reverse()
        }
      }

    default:
      return state
  }
}
