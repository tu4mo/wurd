import axios from 'axios'
import store from './store'

const API_URL = 'http://localhost:3000/api'

export default (method, endpoint, data) => {
  const auth = store.getState().auth
  const token = auth.token

  return axios({
    data,
    headers: {
      Authorization: `Bearer ${token}`
    },
    method,
    url: `${API_URL}/${endpoint}`
  })
}
