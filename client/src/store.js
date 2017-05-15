import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import api from './api'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedState = localStorage.getItem('auth')
  ? { auth: JSON.parse(localStorage.getItem('auth')) }
  : {}

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)))
)

store.subscribe(() => {
  localStorage.setItem('auth', JSON.stringify(store.getState().auth))
})

export default store
