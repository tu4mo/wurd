import axios from 'axios'
import store from './store'

export default ({ method, endpoint, data, params }) => {
  const auth = store.getState().auth
  const token = auth.token

  return axios({
    baseURL: '/api/',
    data,
    headers: {
      Authorization: `Bearer ${token}`
    },
    method,
    params,
    url: endpoint
  })
}
