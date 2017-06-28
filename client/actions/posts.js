import {
  POST_CREATE,
  POST_DELETE,
  POST_FETCH,
  POSTS_FETCH,
  POST_LIKE,
  POST_UNLIKE
} from '.'

export const fetchHomePosts = () => (dispatch, getState, api) => {
  api('get', 'posts?filter=following').then(response => {
    dispatch({
      type: POSTS_FETCH,
      posts: response.data
    })
  })
}

export const fetchPostById = id => (dispatch, getState, api) => {
  api('get', `posts/${id}`).then(response => {
    dispatch({
      type: POST_FETCH,
      post: response.data
    })
  })
}

export const fetchPostsByUsername = username => (dispatch, getState, api) => {
  api('get', `posts?username=${username}`).then(response => {
    dispatch({
      type: POSTS_FETCH,
      posts: response.data
    })
  })
}

export const createPost = post => (dispatch, getState, api) => {
  return api('post', 'posts', post).then(response => {
    dispatch({
      type: POST_CREATE,
      post
    })
  })
}

export const likePost = id => (dispatch, getState, api) => {
  dispatch({
    type: POST_LIKE,
    id
  })

  return api('post', `posts/${id}/likes`).then(response => {
    dispatch({
      type: POST_FETCH,
      post: response.data
    })
  })
}

export const unlikePost = id => (dispatch, getState, api) => {
  dispatch({
    type: POST_UNLIKE,
    id
  })

  return api('delete', `posts/${id}/likes`).then(response => {
    dispatch({
      type: POST_FETCH,
      post: response.data
    })
  })
}

export const deletePost = id => (dispatch, getState, api) => {
  dispatch({
    type: POST_DELETE,
    id
  })

  return api('delete', `posts/${id}`).then(() => {})
}
