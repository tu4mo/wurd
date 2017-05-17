import _ from 'lodash'
import { CREATE_POST, FETCH_POSTS, LIKE_POST, UNLIKE_POST } from '.'

export const fetchPostsByUsername = username => (dispatch, getState, api) => {
  api('get', `posts?username=${username}`).then(response => {
    const sortedPosts = _.sortBy(response.data, 'createdAt').reverse()
    const posts = _.mapKeys(sortedPosts, 'id')

    dispatch({
      type: FETCH_POSTS,
      username,
      posts
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
      type: LIKE_POST
    })
  })
}

export const unlikePost = id => (dispatch, getState, api) => {
  return api('delete', `posts/${id}/likes`).then(response => {
    dispatch({
      type: UNLIKE_POST
    })
  })
}
