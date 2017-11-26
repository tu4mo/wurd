// Require dependencies
const router = require('express').Router({ mergeParams: true })

// Require middleware
const resolveToken = require('../../middleware/resolveToken')

// Require models
const Post = require('../../models/Post')

const { POPULATED_PATHS } = require('./_consts')

router.delete('/', resolveToken(true), async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $pull: { likes: req.userId } },
      { new: true }
    ).populate(POPULATED_PATHS)

    return res.status(201).json(post.getDecorated(req.userId))
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
})

router.post('/', resolveToken(true), async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.userId } },
      { new: true }
    ).populate(POPULATED_PATHS)

    return res.status(201).json(post.getDecorated(req.userId))
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
})

module.exports = router
