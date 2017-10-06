// Require dependencies
const jwt = require('jsonwebtoken')

// Require models
const User = require('../models/User')

const get = (req, res) => {
  User.findById(req.userId).then(user => {
    return res.status(200).json({
      id: user._id,
      username: user.username
    })
  })
}

const post = async (req, res) => {
  const { email, password } = req.body
  const errorResponse = { error: 'The username or password is incorrect' }

  try {
    const user = await User.findOne({ email })

    if (!user || !user.isValidPassword(password)) {
      return res.status(401).json(errorResponse)
    }

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: '14 days'
    })

    user.set({ lastLogged: Date.now() })
    await user.save()

    return res.status(200).json({ token })
  } catch (err) {
    res.sendStatus(500)
    throw err
  }
}

module.exports = {
  get,
  post
}
