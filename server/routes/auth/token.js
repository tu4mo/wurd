const express = require('express')
const router = express.Router()

// Require models
const User = require('../../models/User')

router.post('/', async (req, res) => {
  const { token } = req.body
  const errorResponse = { error: 'Invalid token' }

  try {
    const user = await User.findOne({ token })

    if (!user) {
      return res.status(401).json(errorResponse)
    }

    const jwt = user.getJWT()

    user.set({ lastLogged: Date.now(), token: undefined })
    await user.save()

    return res.status(200).json({ token: jwt })
  } catch (err) {
    res.sendStatus(500)
    throw err
  }
})

module.exports = router
