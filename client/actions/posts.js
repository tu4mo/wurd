import {
  POST_CREATE,
  POST_DELETE,
  POST_LIKE,
  POST_SAVE,
  POST_UNLIKE,
  POSTS_FETCH
} from '.'

import { setHasMore, setPosts } from './timelines'

export const fetchPosts = (options = {}) => (dispatch, getState, api) => {
  const { filter = '', page = 0, timeline = '', username = '' } = options

  api({
    method: 'get',
    url: 'posts',
    params: {
      filter,
      limit: 10,
      page,
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
