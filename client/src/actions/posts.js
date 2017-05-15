import _ from 'lodash'
import { CREATE_POST, FETCH_POSTS } from '.'

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
