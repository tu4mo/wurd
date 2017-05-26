import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import api from './api'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedState = localStorage.getItem('token')
  ? { auth: { token: JSON.parse(localStorage.getItem('token')) } }
  : {}

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(api)))
)

store.subscribe(() => {
  const { auth } = store.getState()
  localStorage.setItem('token', JSON.stringify(auth.token))
})

export default store
