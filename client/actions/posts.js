import {
  POST_CREATE,
  POST_DELETE,
  POST_FETCH,
  POSTS_FETCH,
  POST_LIKE,
  POST_UNLIKE
} from '.'

export const fetchPosts = ({ filter, limit }) => (dispatch, getState, api) => {
  api({
    method: 'get',
    endpoint: 'posts',
    params: {
      filter,
      limit
    }
  }).then(response => {
    dispatch({
      type: POSTS_FETCH,
      posts: response.data
    })
  })
}

export const fetchPostById = id => (dispatch, getState, api) => {
  api({ method: 'get', endpoint: `posts/${id}` }).then(response => {
    dispatch({
      type: POST_FETCH,
      post: response.data
    })
  })
}

export const fetchPostsByUsername = username => (dispatch, getState, api) => {
  api({
    method: 'get',
    endpoint: 'posts',
    params: {
      username
    }
  }).then(response => {
    dispatch({
      type: POSTS_FETCH,
      posts: response.data
    })
  })
}

export const createPost = post => (dispatch, getState, api) => {
  return api({
    method: 'post',
    endpoint: 'posts',
    data: post
  }).then(response => {
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

  return api({
    method: 'post',
    endpoint: `posts/${id}/likes`
  }).then(response => {
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

  return api({
    method: 'delete',
    endpoint: `posts/${id}/likes`
  }).then(response => {
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

  return api({ method: 'delete', endpoint: `posts/${id}` }).then(() => {})
}
