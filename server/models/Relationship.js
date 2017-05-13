const mongoose = require('mongoose')

const relationshipSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Relationship', relationshipSchema)
