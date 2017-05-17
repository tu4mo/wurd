const jwt = require('jsonwebtoken')

const resolveToken = preventOnError => (req, res, next) => {
  const auth = req.headers['authorization']

  if (preventOnError && !auth) {
    return res.sendStatus(403)
  }

  const parts = auth.split(' ')
  const token = parts[1]

  if (preventOnError && !token) {
    return res.sendStatus(403)
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, jwtPayload) => {
    if (preventOnError && err) {
      return res.sendStatus(403)
    }

    req.userId = (jwtPayload && jwtPayload.sub) || null

    next()
  })
}

module.exports = resolveToken
