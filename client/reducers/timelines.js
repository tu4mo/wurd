import { TIMELINES_SET_POSTS, TIMELINES_TOGGLE_HAS_MORE } from '~/actions'

const pagination = (state = {}, action) => {
  switch (action.type) {
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

export default pagination
