const router = require('express').Router({ mergeParams: true })

const Post = require('../../models/Post')

// Require middleware
const resolveToken = require('../../middleware/resolveToken')

const { POPULATED_PATHS } = require('./_consts')

router.post('/', resolveToken(true), async (req, res) => {
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

    return res.status(201).json(post.getDecorated(req.userId))
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
})

module.exports = router
