const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  }
})

module.exports = mongoose.model('Post', postSchema)
