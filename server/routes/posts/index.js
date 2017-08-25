// Require models
const Post = require('../../models/Post')
const Relationship = require('../../models/Relationship')
const User = require('../../models/User')
const { getProfileUrl } = require('../users')

const decorateUserJSON = user => ({
  id: user._id,
  username: user.username,
  profileUrl: getProfileUrl(user.email)
})

const decoratePostJSON = (post, userId) => ({
  id: post._id,
  content: post.content,
  comments: post.comments.map(comment => ({
    content: comment.content,
    user: decorateUserJSON(comment.user),
    id: comment._id
  })),
  createdAt: post.createdAt,
  gradientEnd: post.gradientEnd,
  gradientStart: post.gradientStart,
  liked: post.likes.indexOf(userId) !== -1,
  likes: post.likes.length,
  user: decorateUserJSON(post.user)
})

const POPULATED_PATHS = ['user', 'comments', 'comments.user']

const get = async (req, res) => {
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
      data: posts.map(post => decoratePostJSON(post, req.userId)),
      hasMore: count > limit
    }

    return res.status(200).json(json)
  } catch (err) {
    res.sendStatus(500)
    throw err
  }
}

const getSingle = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findById(id).populate(POPULATED_PATHS)

    return res.status(200).json(decoratePostJSON(post, req.userId))
  } catch (err) {
    res.sendStatus(500)
    throw err
  }
}

const post = async (req, res) => {
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
    return res.status(201).json(decoratePostJSON(populatedPost))
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}

const deletePost = async (req, res) => {
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
}

module.exports = {
  POPULATED_PATHS,
  decoratePostJSON,
  get,
  getSingle,
  post,
  deletePost
}
