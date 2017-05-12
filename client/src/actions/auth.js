import { api, AUTH_CLEAR, AUTH_SET_TOKEN, AUTH_SET_USER } from '.'

export const getUser = () => dispatch => {
  api('get', 'auth').then(response =>
    dispatch({
      type: AUTH_SET_USER,
      user: response.data
    })
  )
}

export const logIn = (email, password, callback) => dispatch => {
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

export const logOut = () => ({
  type: AUTH_CLEAR
})
