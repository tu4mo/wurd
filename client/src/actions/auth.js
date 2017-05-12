import axios from 'axios'
import { AUTH_TOKEN } from '.'

const API_URL = 'http://localhost:3000/api'

export const login = (email, password) => dispatch => {
  axios
    .post(`${API_URL}/auth`, {
      email,
      password
    })
    .then(response => {
      return dispatch({
        type: AUTH_TOKEN,
        token: response.data.token
      })
    })
}
