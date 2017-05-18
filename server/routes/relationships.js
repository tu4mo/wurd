// Require models
const Relationship = require('../models/Relationship')
const User = require('../models/User')

const get = async (req, res) => {}

const post = async (req, res) => {
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
}

const deleteRelationship = async (req, res) => {
  const { username } = req.query

  try {
    const followingUser = await User.findOne({ username }).select({ _id: 1 })

    await Relationship.findOneAndRemove({ following: followingUser._id, user: req.userId })
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}

module.exports = {
  deleteRelationship,
  get,
  post
}
