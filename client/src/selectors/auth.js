export const getAuthenticatedUser = state => state.auth.user
export const getAuhtenticationError = state => state.auth.error
export const isAuthenticated = state => !!state.auth.token
