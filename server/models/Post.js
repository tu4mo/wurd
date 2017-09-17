const mongoose = require('mongoose')

const hexColorRegExp = /^#[0-9a-f]{6}$/i

const commentSchema = new mongoose.Schema(
  {
    content: {
      maxlength: 500,
      minlength: 1,
      required: true,
      trim: true,
      type: String
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

const postSchema = new mongoose.Schema(
  {
    comments: [commentSchema],
    content: {
      maxlength: 50,
      minlength: 1,
      required: true,
      trim: true,
      type: String,
      validate: {
        message: 'Post validation failed',
        validator: v => v.split(' ').length < 6
      }
    },
    gradientEnd: {
      required: true,
      type: String,
      validate: {
        message: 'Invalid gradient',
        validator: v => hexColorRegExp.test(v)
      }
    },
    gradientStart: {
      required: true,
      type: String,
      validate: {
        message: 'Invalid gradient',
        validator: v => hexColorRegExp.test(v)
      }
    },
    likes: [
      {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
      }
    ],
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
