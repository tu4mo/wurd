const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const INVALID_USERNAMES = ['about', 'home', 'search', 'users']

const userSchema = new mongoose.Schema(
  {
    email: {
      index: true,
      lowercase: true,
      maxlength: 50,
      required: true,
      type: String,
      unique: true,
      validate: {
        message: 'Invalid e-mail',
        validator: v => /^\S+@\S+$/.test(v)
      }
    },
    lastLogged: {
      default: Date.now,
      type: Date
    },
    password: {
      required: true,
      type: String
    },
    username: {
      maxlength: 15,
      minlength: 1,
      required: true,
      type: String,
      unique: true,
      validate: {
        message: 'Invalid username',
        validator: v =>
          /^[a-z0-9_]+$/i.test(v) && !INVALID_USERNAMES.includes(v)
      }
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

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, 10)
}

module.exports = mongoose.model('User', userSchema)
