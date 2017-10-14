// Require dependencies
const md5 = require('md5')

// Require models
const User = require('../models/User')
const Post = require('../models/Post')
const Relationship = require('../models/Relationship')

const getProfileUrl = email =>
  email
    ? `https://www.gravatar.com/avatar/${md5(
        email.trim()
      )}?default=identicon&size=256`
    : null

const decorateFollowingUser = user => ({
  profileUrl: getProfileUrl(user.email),
  username: user.username
})

const sortByUsername = (a, b) => {
  const usernameA = a.username.toUpperCase()
  const usernameB = b.username.toUpperCase()

  if (usernameA < usernameB) {
    return -1
  }

  if (usernameA > usernameB) {
    return 1
  }

  return 0
}

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
    followers: followers
      .map(relationship => decorateFollowingUser(relationship.user))
      .sort(sortByUsername),
    following: following
      .map(relationship => decorateFollowingUser(relationship.following))
      .sort(sortByUsername),
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
    console.error(err)
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

module.exports = {
  get,
  getProfileUrl,
  getSingle
}
