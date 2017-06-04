const mongoose = require('mongoose')

const postContentRegExp = /[^A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff]/
const hexColorRegExp = /^#[0-9a-f]{6}$/i

const postSchema = new mongoose.Schema(
  {
    content: {
      maxlength: 30,
      minlength: 1,
      required: true,
      type: String,
      validate: {
        validator: v => !postContentRegExp.test(v),
        message: 'Post validation failed'
      }
    },
    gradientEnd: {
      maxlength: 7,
      required: true,
      type: String,
      validate: {
        validator: v => hexColorRegExp.test(v),
        message: 'Invalid gradient'
      }
    },
    gradientStart: {
      required: true,
      type: String,
      validate: {
        validator: v => hexColorRegExp.test(v),
        message: 'Invalid gradient'
      }
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
