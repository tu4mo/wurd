// Require models
const Post = require('../models/Post')

const post = (req, res) => {
  const { content } = req.body

  // Create new post
  const newPost = new Post({
    content
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
  post
}
