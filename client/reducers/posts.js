import {
  POST_DELETE,
  POST_FETCH,
  POSTS_FETCH,
  POST_LIKE,
  POST_UNLIKE
} from '~/actions'

const toObjectByKey = (arr, key) =>
  arr.reduce(
    (acc, val) => ({
      ...acc,
      [val[key]]: val
    }),
    {}
  )

const posts = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE:
      const { [action.id]: omit, ...rest } = state
      return rest

    case POST_FETCH:
      return {
        ...state,
        [action.post.id]: action.post
      }

    case POSTS_FETCH:
      return {
        ...state,
        ...toObjectByKey(action.posts, 'id')
      }

    case POST_LIKE: {
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

    case POST_UNLIKE: {
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
