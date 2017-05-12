// Require dependencies
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Require models
const User = require('../models/User')

const post = async (req, res) => {
  const { email, password } = req.body
  const errorResponse = { error: 'The user name or password is incorrect' }

  try {
    const user = await User.findOne({
      email
    })

    if (!user) {
      return res.status(401).json(errorResponse)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7 days'
      })

      return res.status(200).json({
        token
      })
    } else {
      return res.status(401).json(errorResponse)
    }
  } catch (err) {
    res.sendStatus(500)
    throw err
  }
}

module.exports = post
