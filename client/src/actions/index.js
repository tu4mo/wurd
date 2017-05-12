import axios from 'axios'
import store from '../store'

export const API_URL = 'http://localhost:3000/api'

export const AUTH_CLEAR = 'AUTH_CLEAR'
export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN'
export const AUTH_SET_USER = 'AUTH_SET_USER'

export const api = (method, endpoint, data) => {
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
