const router = require('express').Router()

const token = require('./token')
const twitter = require('./twitter')

// Require middleware
const resolveToken = require('../../middleware/resolveToken')

// Require models
const User = require('../../models/User')

router.get('/', resolveToken(true), async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    return res.status(200).json({
      id: user._id,
      username: user.username
    })
  } catch (err) {
    res.sendStatus(500)
    throw err
  }
})

router.post('/', resolveToken(false), async (req, res) => {
  const { email = '', password } = req.body
  const errorResponse = { error: 'The username or password is incorrect' }

  try {
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user || !user.isValidPassword(password)) {
      return res.status(401).json(errorResponse)
    }

    const jwt = user.getJWT()

    user.set({ lastLogged: Date.now() })
    await user.save()

    return res.status(200).json({ token: jwt })
  } catch (err) {
    res.sendStatus(500)
    throw err
  }
})

router.use('/token', token)
router.use('/twitter', twitter)

module.exports = router
