import axios from 'axios'
import store from './store'

export default (method, endpoint, data) => {
  const auth = store.getState().auth
  const token = auth.token

  return axios({
    data,
    headers: {
      Authorization: `Bearer ${token}`
    },
    method,
    url: `/api/${endpoint}`
  })
}
