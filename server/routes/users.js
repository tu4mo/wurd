// Require dependencies
const bcrypt = require('bcrypt')

// Require models
const User = require('../models/User')

const post = (req, res) => {
  const { email, username, password, passwordConfirm } = req.body

  if (
    !email ||
    !username ||
    !password ||
    password.length < 8 ||
    password !== passwordConfirm
  ) {
    return res.sendStatus(400)
  }

  // Create hashed password
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)

  // Create new user
  const newUser = new User({
    email,
    username,
    password: hash
  })

  // Save new user
  newUser.save((err, user) => {
    if (err) {
      console.error(err)
      return res.sendStatus(409)
    }

    res.sendStatus(201)
  })
}

module.exports = post
