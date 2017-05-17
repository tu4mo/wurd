const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    content: {
      maxlength: 30,
      minlength: 1,
      required: true,
      type: String
    },
    gradientEnd: {
      required: true,
      type: String
    },
    gradientStart: {
      required: true,
      type: String
    },
    likes: {
      ref: 'User',
      type: [mongoose.Schema.Types.ObjectId]
    },
    user: {
      ref: 'User',
      required: true,
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Post', postSchema)
