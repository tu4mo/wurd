export const getAuthenticatedUser = state => state.users[state.auth.username]
export const getUser = username => state => state.users[username]
