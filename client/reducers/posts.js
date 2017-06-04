import {
  DELETE_POST,
  FETCH_POST,
  FETCH_POSTS,
  LIKE_POST,
  UNLIKE_POST
} from '../actions'

const toObjByKey = (arr, key) =>
  arr.reduce(
    (acc, val) => ({
      ...acc,
      [val[key]]: val
    }),
    {}
  )

const posts = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST:
      const { [action.id]: omit, ...rest } = state
      return rest

    case FETCH_POST:
      return {
        ...state,
        [action.post.id]: action.post
      }

    case FETCH_POSTS:
      return {
        ...state,
        ...toObjByKey(action.posts, 'id')
      }

    case LIKE_POST: {
      const post = state[action.id]

      if (!post.liked) {
        return {
          ...state,
          [action.id]: {
            ...post,
            liked: true,
            likes: post.likes + 1
          }
        }
      }

      return state
    }

    case UNLIKE_POST: {
      const post = state[action.id]

      if (post.liked) {
        return {
          ...state,
          [action.id]: {
            ...post,
            liked: false,
            likes: post.likes - 1
          }
        }
      }

      return state
    }

    default:
      return state
  }
}

export default posts
