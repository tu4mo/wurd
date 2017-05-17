const Post = require('../../models/Post')

const { decoratePostJSON } = require('.')

const deleteLike = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $pull: { likes: req.userId } },
      { new: true }
    ).populate('user')

    return res.status(201).json(decoratePostJSON(post, req.userId))
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}

const post = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.userId } },
      { new: true }
    ).populate('user')

    return res.status(201).json(decoratePostJSON(post, req.userId))
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}

module.exports = {
  deleteLike,
  post
}
