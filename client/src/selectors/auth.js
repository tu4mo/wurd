export const getAuthenticationError = state => state.auth.error
export const getAuthenticatedUsername = state => state.auth.username
export const isAuthenticated = state => !!state.auth.token
