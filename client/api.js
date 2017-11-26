import axios from 'axios'

export default ({ data, method, params, url }) =>
  axios({
    baseURL: '/api/',
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method,
    params,
    url
  })
