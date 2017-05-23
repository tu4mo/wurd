import _ from 'lodash'

import { FETCH_POST, FETCH_POSTS } from '../actions'

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
        ..._.mapKeys(action.posts, 'id')
      }
    default:
      return state
  }
}

export default posts
