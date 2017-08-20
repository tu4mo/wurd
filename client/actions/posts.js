import {
  POST_CREATE,
  POST_DELETE,
  POST_FETCH,
  POSTS_FETCH,
  POST_LIKE,
  POST_UNLIKE
} from '.'

export const fetchPosts = ({ filter, limit, page }) => (
  dispatch,
  getState,
  api
) => {
  api({
    method: 'get',
    url: 'posts',
    params: {
      filter,
      limit,
      page
    }
  }).then(response => {
    dispatch({
      type: POSTS_FETCH,
      posts: response.data
    })
  })
}

export const fetchPostById = id => (dispatch, getState, api) => {
  api({ method: 'get', url: `posts/${id}` }).then(response => {
    dispatch({
      type: POST_FETCH,
      post: response.data
    })
  })
}

export const fetchPostsByUsername = username => (dispatch, getState, api) => {
  api({
    method: 'get',
    url: 'posts',
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
    url: 'posts',
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
    url: `posts/${id}/likes`
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
    url: `posts/${id}/likes`
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

  return api({ method: 'delete', url: `posts/${id}` }).then(() => {})
}
