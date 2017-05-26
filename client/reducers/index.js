import { combineReducers } from 'redux'
import auth from './auth'
import posts from './posts'
import users from './users'

const reducers = combineReducers({
  auth,
  posts,
  users
})

export default reducers
