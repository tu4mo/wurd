const Post = require('../../models/Post')

const { POPULATED_PATHS, decoratePostJSON } = require('.')

const post = async (req, res) => {
  const { content } = req.body
  const { id } = req.params

  const newComment = {
    content,
    user: req.userId
  }

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $push: { comments: newComment } },
      { new: true, runValidators: true }
    ).populate(POPULATED_PATHS)

    return res.status(201).json(decoratePostJSON(post, req.userId))
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}

module.exports = {
  post
}
