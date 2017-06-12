// Require dependencies
const bcrypt = require('bcrypt')
const md5 = require('md5')

// Require models
const User = require('../models/User')
const Post = require('../models/Post')
const Relationship = require('../models/Relationship')

const getProfileUrl = email =>
  `https://www.gravatar.com/avatar/${md5(
    email.trim()
  )}?default=identicon&size=256`

const decorateFollowingUser = user => ({
  username: user.username,
  profileUrl: getProfileUrl(user.email)
})

const decorateUser = async user => {
  const posts = await Post.count({ user: user._id })

  const followers = await Relationship.find(
    { following: user._id },
    'user'
  ).populate('user')

  const following = await Relationship.find(
    { user: user._id },
    'following'
  ).populate('following')

  return {
    followers: followers.map(relationship =>
      decorateFollowingUser(relationship.user)
    ),
    following: following.map(relationship =>
      decorateFollowingUser(relationship.following)
    ),
    id: user._id,
    posts,
    profileUrl: getProfileUrl(user.email),
    username: user.username
  }
}

const get = async (req, res) => {
  try {
    const users = await User.find().sort('username')
    const decoratedUsers = await Promise.all(users.map(decorateUser))

    return res.status(200).json({
      users: decoratedUsers
    })
  } catch (err) {
    return res.sendStatus(500)
  }
}

const getSingle = async (req, res) => {
  const { username } = req.params

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.sendStatus(404)
    }

    const decoratedUser = await decorateUser(user)

    return res.status(200).json(decoratedUser)
  } catch (err) {
    return res.sendStatus(500)
  }
}

const post = (req, res) => {
  const { email, username, password, passwordConfirm } = req.body

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Fill in the required fields' })
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters'
    })
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({
      error: 'Passwords do not match'
    })
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

      const firstError = err.errors[Object.keys(err.errors)[0]]
      return res.status(400).json({ error: firstError.message })
    }

    res.sendStatus(201)
  })
}

module.exports = {
  get,
  getSingle,
  getProfileUrl,
  post
}
