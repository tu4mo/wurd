import {
  TIMELINES_REMOVE_POST,
  TIMELINES_SET_POSTS,
  TIMELINES_TOGGLE_HAS_MORE
} from '~/actions'

const timelines = (state = {}, action) => {
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

export default timelines
