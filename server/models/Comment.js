const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    content: {
      maxlength: 50,
      minlength: 1,
      required: true,
      type: String,
      validate: {
        validator: v => v.split(' ').length < 6,
        message: 'Comment validation failed'
      }
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

module.exports = mongoose.model('Comment', commentSchema)
