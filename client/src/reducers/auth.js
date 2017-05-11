const auth = (state = {}, action) => {
  switch (action.type) {
    default:
      return {
        isAuthenticated: false,
        username: 'tu4mo'
      }
  }
}

export default auth
