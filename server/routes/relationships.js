// Require models
const Relationship = require('../models/Relationship')
const User = require('../models/User')

const get = async (req, res) => {}

const post = async (req, res) => {
  const { sub: user } = req.jwtPayload
  const { username } = req.body

  try {
    const followingUser = await User.findOne({ username }).select({ _id: 1 })

    // Create new relationship
    const newRelationship = new Relationship({
      following: followingUser._id,
      user
    })

    // Save new post
    await newRelationship.save()
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}

module.exports = {
  get,
  post
}
