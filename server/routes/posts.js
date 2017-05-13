// Require models
const Post = require('../models/Post')
const User = require('../models/User')

const get = async (req, res) => {
  const { limit = 10, username } = req.query

  try {
    const query = {}

    if (username) {
      const user = await User.findOne({ username }).select({ _id: 1 })
      query.user = user._id
    }

    const posts = await Post.find(query, null)
      .sort({ created: -1 })
      .limit(limit)
      .populate('user')

    const json = posts.map(post => ({
      id: post._id,
      content: post.content,
      created: post.created,
      gradientEnd: post.gradientEnd,
      gradientStart: post.gradientStart,
      likes: 5,
      user: {
        id: post.user._id,
        username: post.user.username
      }
    }))

    res.status(200).json(json)
  } catch (err) {
    res.sendStatus(500)
    throw err
  }
}

const post = (req, res) => {
  const { sub: user } = req.jwtPayload
  const { content, gradientEnd, gradientStart } = req.body

  // Create new post
  const newPost = new Post({
    content,
    gradientEnd,
    gradientStart,
    user
  })

  // Save new post
  newPost.save((err, post) => {
    if (err) {
      console.error(err)
      return res.sendStatus(400)
    }

    res.sendStatus(201)
  })
}

module.exports = {
  get,
  post
}
