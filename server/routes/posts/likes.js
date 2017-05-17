const Post = require('../../models/Post')

const deleteLike = async (req, res) => {
  const { id } = req.params

  try {
    await Post.findByIdAndUpdate(
      id,
      { $pull: { likes: req.userId } },
      { new: true }
    )

    return res.sendStatus(201)
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}

const post = async (req, res) => {
  const { id } = req.params

  try {
    await Post.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.userId } },
      { new: true }
    )

    return res.sendStatus(201)
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}

module.exports = {
  deleteLike,
  post
}
