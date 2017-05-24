import { CREATE_POST, FETCH_POST, FETCH_POSTS, LIKE_POST, UNLIKE_POST } from '.'

export const fetchHomePosts = () => (dispatch, getState, api) => {
  api('get', 'posts').then(response => {
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
  return api('post', `posts/${id}/likes`).then(response => {
    dispatch({
      type: LIKE_POST,
      id
    })

    dispatch({
      type: FETCH_POST,
      post: response.data
    })
  })
}

export const unlikePost = id => (dispatch, getState, api) => {
  return api('delete', `posts/${id}/likes`).then(response => {
    dispatch({
      type: UNLIKE_POST,
      id
    })

    dispatch({
      type: FETCH_POST,
      post: response.data
    })
  })
}
