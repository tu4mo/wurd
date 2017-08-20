import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import account from './account'
import auth from './auth'
import pagination from './pagination'
import posts from './posts'
import users from './users'

const reducers = combineReducers({
  account,
  auth,
  form,
  pagination,
  posts,
  users
})

export default reducers
