import {
  POST_COMMENT,
  POST_CREATE,
  POST_DELETE,
  POST_LIKE,
  POST_SAVE,
  POST_UNLIKE,
  POSTS_FETCH
} from '.'

import { setHasMore, setPosts } from './timelines'

export const fetchPosts = (options = {}) => (dispatch, getState, api) => {
  const {
    after,
    before = null,
    filter = null,
    timeline = null,
    username = null
  } = options

  api({
    method: 'get',
    url: 'posts',
    params: {
      after,
      before,
      filter,
      limit: 10,
      username
    }
  }).then(response => {
    dispatch({
      type: POSTS_FETCH,
      posts: response.data
    })

    dispatch(setHasMore(timeline, response.data.hasMore))
    dispatch(setPosts(timeline, response.data.data.map(post => post.id)))
  })
}

export const fetchPostById = id => (dispatch, getState, api) => {
  api({ method: 'get', url: `posts/${id}` }).then(response => {
    dispatch(savePost(response.data))
    dispatch(setPosts(response.data.user.username, [response.data.id]))
  })
}

export const createPost = post => (dispatch, getState, api) => {
  return api({
    method: 'post',
    url: 'posts',
    data: post
  }).then(response => {
    dispatch({
      type: POST_CREATE,
      post
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
    type: POST_COMMENT,
    id,
    content
  })

  try {
    const response = await api({
      method: 'post',
      url: `posts/${id}/comments`,
      data: { content }
    })

    dispatch(savePost(response.data))
  } catch (err) {
    console.error(err)
  }
}

export const likePost = id => async (dispatch, getState, api) => {
  dispatch({
    type: POST_LIKE,
    id
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
    type: POST_UNLIKE,
    id
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
    type: POST_DELETE,
    id
  })

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
  type: POST_SAVE,
  post
})
