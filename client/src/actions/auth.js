import { api, AUTH_SET_TOKEN, AUTH_SET_USER } from '.'

export const login = (email, password, callback) => dispatch => {
  api('post', 'auth', {
    email,
    password
  }).then(response => {
    dispatch({
      type: AUTH_SET_TOKEN,
      token: response.data.token
    })
    callback()
  })
}

export const getUser = () => dispatch => {
  api('get', 'auth').then(response =>
    dispatch({
      type: AUTH_SET_USER,
      user: response.data
    })
  )
}
