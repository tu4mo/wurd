import { removePost, setHasMore, setPosts } from './timelines'

const POST_COMMENT = 'POST/COMMENT'
const POST_CREATE = 'POST/CREATE'
const POST_DELETE = 'POST/DELETE'
const POST_LIKE = 'POST/LIKE'
const POST_SAVE = 'POST/SAVE'
const POST_UNLIKE = 'POST/UNLIKE'
const POSTS_FETCH = 'POSTS/FETCH'

export const fetchPosts = (options = {}) => async (dispatch, getState, api) => {
  try {
    const {
      after,
      before = null,
      filter = null,
      timeline = null,
      username = null
    } = options

    const response = await api({
      method: 'get',
      params: {
        after,
        before,
        filter,
        limit: 10,
        username
      },
      url: 'posts'
    })

    dispatch({
      posts: response.data,
      type: POSTS_FETCH
    })

    dispatch(setHasMore(timeline, response.data.hasMore))
    dispatch(setPosts(timeline, response.data.data.map(post => post.id)))
  } catch (err) {
    console.error(err)
  }
}

export const fetchPostById = id => (dispatch, getState, api) => {
  api({ method: 'get', url: `posts/${id}` }).then(response => {
    dispatch(savePost(response.data))
    dispatch(setPosts(response.data.user.username, [response.data.id]))
  })
}

export const createPost = post => (dispatch, getState, api) => {
  return api({
    data: post,
    method: 'post',
    url: 'posts'
  }).then(response => {
    dispatch({
      post,
      type: POST_CREATE
    })

    dispatch(savePost(response.data))
    dispatch(setPosts(response.data.user.username, [response.data.id]))
    dispatch(setPosts('home', [response.data.id]))
  })
}

export const createComment = (id, content) => async (
  dispatch,
  getState,
  api
) => {
  dispatch({
    content,
    id,
    type: POST_COMMENT
  })

  try {
    const response = await api({
      data: { content },
      method: 'post',
      url: `posts/${id}/comments`
    })

    dispatch(savePost(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const likePost = id => async (dispatch, getState, api) => {
  dispatch({
    id,
    type: POST_LIKE
  })

  try {
    await api({
      method: 'post',
      url: `posts/${id}/likes`
    })
  } catch (err) {
    console.error(err)
  }
}

export const unlikePost = id => async (dispatch, getState, api) => {
  dispatch({
    id,
    type: POST_UNLIKE
  })

  try {
    await api({
      method: 'delete',
      url: `posts/${id}/likes`
    })
  } catch (err) {
    console.error(err)
  }
}

export const deletePost = id => async (dispatch, getState, api) => {
  dispatch({
    id,
    type: POST_DELETE
  })

  dispatch(removePost(id))

  try {
    await api({
      method: 'delete',
      url: `posts/${id}`
    })
  } catch (err) {
    console.error(err)
  }
}

export const savePost = post => ({
  post,
  type: POST_SAVE
})

const toObjectByKey = (arr, key) =>
  arr.reduce(
    (acc, val) => ({
      ...acc,
      [val[key]]: val
    }),
    {}
  )

export default (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE:
      const { [action.id]: omit, ...rest } = state
      return rest

    case POST_SAVE:
      return {
        ...state,
        [action.post.id]: action.post
      }

    case POSTS_FETCH:
      return {
        ...state,
        ...toObjectByKey(action.posts.data, 'id')
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
