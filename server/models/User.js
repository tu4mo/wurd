// Require dependencies
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
      type: String
    },
    token: {
      type: String
    },
    twitterId: {
      sparse: true,
      type: Number,
      unique: true
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

userSchema.methods.generateOneTimeToken = function() {
  return this.set({
    token: String(Math.floor(Math.random() * 9e15))
  }).save()
}

userSchema.methods.getJWT = function() {
  return jwt.sign({ sub: this._id }, process.env.JWT_SECRET, {
    expiresIn: '14 days'
  })
}

userSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, 10)
}

module.exports = mongoose.model('User', userSchema)
