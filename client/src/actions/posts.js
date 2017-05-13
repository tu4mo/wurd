import { FETCH_POSTS } from '.'

export const fetchPostsByUsername = username => (dispatch, getState, api) => {
  api('get', `posts?username=${username}`).then(response => {
    dispatch({
      type: FETCH_POSTS,
      username,
      posts: response.data
    })
  })
}
