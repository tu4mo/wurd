import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import account from './account'
import auth from './auth'
import posts from './posts'
import users from './users'

const reducers = combineReducers({
  account,
  auth,
  form,
  posts,
  users
})

export default reducers
