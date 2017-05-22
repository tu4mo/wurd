import _ from 'lodash'

import { FETCH_POST, FETCH_POSTS } from '../actions'

const handlePosts = posts => {
  const sortedPosts = _.sortBy(posts, 'createdAt').reverse()
  const keyedPosts = _.mapKeys(sortedPosts, 'id')
  return keyedPosts
}

const posts = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        [action.post.id]: action.post
      }
    case FETCH_POSTS:
      return {
        ...state,
        ...handlePosts(action.posts)
      }
    default:
      return state
  }
}

export default posts
