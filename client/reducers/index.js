import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import account from './account'
import auth from './auth'
import posts from './posts'
import timelines from './timelines'
import users from './users'

const reducers = combineReducers({
  account,
  auth,
  form,
  posts,
  timelines,
  users
})

export default reducers
