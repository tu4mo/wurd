const jwt = require('jsonwebtoken')

const resolveToken = returnOnError => (req, res, next) => {
  const auth = req.headers['authorization']

  if (returnOnError && !auth) {
    return res.sendStatus(403)
  }

  const parts = auth ? auth.split(' ') : []
  const token = parts[1]

  if (returnOnError && !token) {
    return res.sendStatus(403)
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, jwtPayload) => {
    if (returnOnError && err) {
      return res.sendStatus(403)
    }

    req.userId = (jwtPayload && jwtPayload.sub) || null

    next()
  })
}

module.exports = resolveToken
