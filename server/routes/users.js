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

const get = async (req, res) => {
  const { username } = req.params

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.sendStatus(404)
    }

    const posts = await Post.count({ user: user._id })
    const followers = await Relationship.find(
      { following: user._id },
      'user'
    ).populate('user')
    const following = await Relationship.find(
      { user: user._id },
      'following'
    ).populate('following')

    return res.status(200).json({
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
  getProfileUrl,
  post
}
