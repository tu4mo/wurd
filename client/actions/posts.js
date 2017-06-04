import {
  CREATE_POST,
  DELETE_POST,
  FETCH_POST,
  FETCH_POSTS,
  LIKE_POST,
  UNLIKE_POST
} from '.'

export const fetchHomePosts = () => (dispatch, getState, api) => {
  api('get', 'posts?filter=following').then(response => {
    dispatch({
      type: FETCH_POSTS,
      posts: response.data
    })
  })
}

export const fetchPostsByUsername = username => (dispatch, getState, api) => {
  api('get', `posts?username=${username}`).then(response => {
    dispatch({
      type: FETCH_POSTS,
      posts: response.data
    })
  })
}

export const createPost = post => (dispatch, getState, api) => {
  return api('post', 'posts', post).then(response => {
    dispatch({
      type: CREATE_POST,
      post
    })
  })
}

export const likePost = id => (dispatch, getState, api) => {
  dispatch({
    type: LIKE_POST,
    id
  })

  return api('post', `posts/${id}/likes`).then(response => {
    dispatch({
      type: FETCH_POST,
      post: response.data
    })
  })
}

export const unlikePost = id => (dispatch, getState, api) => {
  dispatch({
    type: UNLIKE_POST,
    id
  })

  return api('delete', `posts/${id}/likes`).then(response => {
    dispatch({
      type: FETCH_POST,
      post: response.data
    })
  })
}

export const deletePost = id => (dispatch, getState, api) => {
  dispatch({
    type: DELETE_POST,
    id
  })

  return api('delete', `posts/${id}`).then(() => {})
}
