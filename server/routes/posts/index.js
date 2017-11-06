const router = require('express').Router()

// Require routes
const comments = require('./comments')
const likes = require('./likes')

// Require middleware
const resolveToken = require('../../middleware/resolveToken')

// Require models
const Post = require('../../models/Post')
const Relationship = require('../../models/Relationship')
const User = require('../../models/User')

const { POPULATED_PATHS } = require('./_consts')

router.get('/', resolveToken(false), async (req, res) => {
  const { after, before, filter, username } = req.query
  const limit = Number(req.query.limit)

  if (limit > 100) {
    return res.sendStatus(400)
  }

  try {
    const query = {}

    if (after) {
      query._id = { $gt: after }
    }

    if (before) {
      query._id = { $lt: before }
    }

    if (filter === 'following') {
      const followedUsers = await Relationship.find({
        user: req.userId
      }).select({ following: 1 })

      query.$or = [
        ...followedUsers.map(relationship => ({
          user: relationship.following
        })),
        { user: req.userId }
      ]
    }

    if (username) {
      const user = await User.findOne({ username }).select({ _id: 1 })
      query.user = user._id
    }

    const count = await Post.count(query)

    const posts = await Post.find(query, null)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate(POPULATED_PATHS)

    const json = {
      data: posts.map(post => post.getDecorated(req.userId)),
      hasMore: count > limit
    }

    return res.status(200).json(json)
  } catch (err) {
    res.sendStatus(500)
    throw err
  }
})

router.get('/:id', resolveToken(false), async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findById(id).populate(POPULATED_PATHS)

    return res.status(200).json(post.getDecorated(req.userId))
  } catch (err) {
    res.sendStatus(500)
    throw err
  }
})

router.post('/', resolveToken(true), async (req, res) => {
  const { content, gradientEnd, gradientStart } = req.body

  // Create new post
  const newPost = new Post({
    content,
    gradientEnd,
    gradientStart,
    user: req.userId
  })

  // Save new post
  try {
    const post = await newPost.save()
    const populatedPost = await Post.findOne(post).populate(POPULATED_PATHS)
    return res.status(201).json(populatedPost.getDecorated(req.userId))
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
})

router.delete('/:id', resolveToken(true), async (req, res) => {
  const { id } = req.params

  try {
    await Post.deleteOne({
      _id: id,
      user: req.userId
    })

    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
})

router.use('/:id/comments', comments)
router.use('/:id/likes', likes)

module.exports = router
