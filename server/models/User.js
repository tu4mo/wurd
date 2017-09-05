const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const INVALID_USERNAMES = ['about', 'home', 'search', 'users']

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
        validator: v => /^\S+@\S+$/.test(v),
        message: 'Invalid e-mail'
      }
    },
    username: {
      maxlength: 15,
      minlength: 1,
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: v =>
          /^[a-z0-9_]+$/i.test(v) && !INVALID_USERNAMES.includes(v),
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

userSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
