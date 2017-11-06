// Require dependencies
const router = require('express').Router()

// Require middleware
const resolveToken = require('../../middleware/resolveToken')

// Require models
const User = require('../../models/User')
const Post = require('../../models/Post')
const Relationship = require('../../models/Relationship')

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
  const [posts, followers, following] = await Promise.all([
    Post.count({ user: user._id }),
    Relationship.find({ following: user._id }, 'user').populate('user'),
    Relationship.find({ user: user._id }, 'following').populate('following')
  ])

  return {
    followers: followers
      .filter(relationship => relationship.user !== null)
      .map(relationship => relationship.user.getDecorated())
      .sort(sortByUsername),
    following: following
      .filter(relationship => relationship.following !== null)
      .map(relationship => relationship.following.getDecorated())
      .sort(sortByUsername),
    id: user._id,
    posts,
    profileUrl: user.profileUrl,
    username: user.username
  }
}

router.get('/', resolveToken(false), async (req, res) => {
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
})

router.get('/:username', resolveToken(false), async (req, res) => {
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
})

module.exports = router
