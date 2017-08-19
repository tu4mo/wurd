// Require models
const Post = require('../../models/Post')
const Relationship = require('../../models/Relationship')
const User = require('../../models/User')
const { getProfileUrl } = require('../users')

const decoratePostJSON = (post, userId) => ({
  id: post._id,
  content: post.content,
  createdAt: post.createdAt,
  gradientEnd: post.gradientEnd,
  gradientStart: post.gradientStart,
  liked: post.likes.indexOf(userId) !== -1,
  likes: post.likes.length,
  user: {
    id: post.user._id,
    username: post.user.username,
    profileUrl: getProfileUrl(post.user.email)
  }
})

const get = async (req, res) => {
  const { filter, limit = 100, page = 0, username } = req.query

  if (limit > 100) {
    return res.sendStatus(400)
  }

  try {
    const query = {}

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

    const posts = await Post.find(query, null)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(page) * limit)
      .populate('user')

    const json = posts.map(post => decoratePostJSON(post, req.userId))

    return res.status(200).json(json)
  } catch (err) {
    res.sendStatus(500)
    throw err
  }
}

const getSingle = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findById(id).populate('user')

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
    const populatedPost = await Post.findOne(post).populate('user')
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
  decoratePostJSON,
  get,
  getSingle,
  post,
  deletePost
}
