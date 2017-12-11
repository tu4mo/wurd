import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import api from './api'

const composeEnhancers =
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'test' ||
  !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)))
)

export default store
