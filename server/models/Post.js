const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    gradientEnd: {
      type: String,
      required: true
    },
    gradientStart: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Post', postSchema)
