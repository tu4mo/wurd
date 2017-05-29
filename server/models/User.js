const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      index: true,
      maxlength: 50,
      unique: true,
      validate: {
        validator: v => /^\S+@\S+$/.test(v)
      }
    },
    username: {
      maxlength: 15,
      minlength: 1,
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: v => /^[a-z0-9_]+$/i.test(v),
        message: 'Invalid username'
      }
    },
    password: {
      required: true,
      type: String
    },
    verified: {
      default: false,
      required: true,
      type: Boolean
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
