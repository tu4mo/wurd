export const getPosts = () => ({
  type: 'GET_POSTS',
  payload: [
    {
      content: 'Lorem',
      user: 'tu4mo',
      timestamp: Date.now() - 1000000,
      gradientStart: '#84fab0',
      gradientEnd: '#8fd3f4'
    },
    {
      content: 'Consectetuer',
      user: 'tu4mo',
      timestamp: Date.now() - 200000000,
      gradientStart: '#fccb90',
      gradientEnd: '#d57eeb'
    }
  ]
})
