// Require dependencies
const router = require('express').Router()

// Require middleware
const resolveToken = require('../../middleware/resolveToken')

// Require models
const Relationship = require('../../models/Relationship')
const User = require('../../models/User')

router.post('/', resolveToken(true), async (req, res) => {
  const { username } = req.query

  try {
    const followingUser = await User.findOne({ username }).select({ _id: 1 })

    // Create new relationship
    const newRelationship = new Relationship({
      following: followingUser._id,
      user: req.userId
    })

    // Save new post
    await newRelationship.save()
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
})

router.delete('/', resolveToken(true), async (req, res) => {
  const { username } = req.query

  try {
    const followingUser = await User.findOne({ username }).select({ _id: 1 })

    await Relationship.findOneAndRemove({
      following: followingUser._id,
      user: req.userId
    })

    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
})

module.exports = router
