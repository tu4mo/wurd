// Require models
const Post = require('../../models/Post')
const User = require('../../models/User')
const { getProfileUrl } = require('../users')

const decoratePostJSON = (post, userId, req) => ({
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
    profileUrl: post.user.hasProfilePhoto ? getProfileUrl(post.user._id, req) : null
  }
})

const get = async (req, res) => {
  const { limit = 10, username } = req.query

  try {
    const query = {}

    if (username) {
      const user = await User.findOne({ username }).select({ _id: 1 })
      query.user = user._id
    }

    const posts = await Post.find(query, null)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user')

    const json = posts.map(post => decoratePostJSON(post, req.userId, req))

    return res.status(200).json(json)
  } catch (err) {
    res.sendStatus(500)
    throw err
  }
}

const getSingle = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findById(id)

    return res.status(200).json(decoratePostJSON(post, req.userId))
  } catch (err) {
    res.sendStatus(500)
    throw err
  }
}

const post = (req, res) => {
  const { content, gradientEnd, gradientStart } = req.body

  // Create new post
  const newPost = new Post({
    content,
    gradientEnd,
    gradientStart,
    user: req.userId
  })

  // Save new post
  newPost.save((err, post) => {
    if (err) {
      console.error(err)
      return res.sendStatus(400)
    }

    res.status(201).json(decoratePostJSON(post, req.userId))
  })
}

module.exports = {
  decoratePostJSON,
  get,
  getSingle,
  post
}
