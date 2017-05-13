// Require dependencies
const bcrypt = require('bcrypt')

// Require models
const User = require('../models/User')
const Post = require('../models/Post')
const Relationship = require('../models/Relationship')

const get = async (req, res) => {
  const { username } = req.params

  try {
    const user = await User.findOne({ username })
    const posts = await Post.count({ user: user._id })
    const followers = await Relationship.count({ following: user._id })
    const following = await Relationship.count({ user: user._id })

    return res.status(200).json({
      followers,
      following,
      id: user._id,
      posts,
      username: user.username
    })
  } catch (err) {
    return res.sendStatus(500)
  }
}

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

module.exports = {
  get,
  post
}
