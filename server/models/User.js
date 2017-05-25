const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      index: true,
      unique: true
    },
    hasProfilePhoto: {
      type: Boolean
    },
    username: {
      maxlength: 15,
      minlength: 1,
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: v => /^[a-zA-Z0-9_]+$/.test(v),
        message: 'Invalid username'
      }
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
