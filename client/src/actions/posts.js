import _ from 'lodash'
import { CREATE_POST, FETCH_POST, FETCH_POSTS } from '.'

const handlePosts = posts => {
  const sortedPosts = _.sortBy(posts, 'createdAt').reverse()
  const keyedPosts = _.mapKeys(sortedPosts, 'id')
  return keyedPosts
}

export const fetchHomePosts = () => (dispatch, getState, api) => {
  api('get', 'posts').then(response => {
    const posts = handlePosts(response.data)

    dispatch({
      type: FETCH_POSTS,
      posts
    })
  })
}

export const fetchPostsByUsername = username => (dispatch, getState, api) => {
  api('get', `posts?username=${username}`).then(response => {
    const posts = handlePosts(response.data)

    dispatch({
      type: FETCH_POSTS,
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
      type: FETCH_POST,
      post: response.data
    })
  })
}

export const unlikePost = id => (dispatch, getState, api) => {
  return api('delete', `posts/${id}/likes`).then(response => {
    dispatch({
      type: FETCH_POST,
      post: response.data
    })
  })
}
