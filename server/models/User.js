// Require dependencies
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const mongoose = require('mongoose')

const INVALID_USERNAMES = ['about', 'home', 'search', 'users']

const userSchema = new mongoose.Schema(
  {
    email: {
      index: true,
      lowercase: true,
      maxlength: 50,
      required: [true, 'Email is required'],
      trim: true,
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
      minlength: [8, 'Password must be at least 8 characters'],
      required: [true, 'Password is required'],
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
      maxlength: [15, 'Username is too long'],
      minlength: 1,
      required: [true, 'Username is required'],
      trim: true,
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

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 10)

  next()
})

userSchema.virtual('profileUrl').get(function() {
  return this.email
    ? `https://www.gravatar.com/avatar/${md5(
        this.email
      )}?default=identicon&size=256`
    : null
})

userSchema.methods.generateOneTimeToken = function() {
  return this.set({
    token: String(Math.floor(Math.random() * 9e15))
  }).save()
}

userSchema.methods.getDecorated = function() {
  return {
    id: this._id,
    profileUrl: this.profileUrl,
    username: this.username
  }
}

userSchema.methods.getJWT = function() {
  return jwt.sign({ sub: this._id }, process.env.JWT_SECRET, {
    expiresIn: '14 days'
  })
}

userSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
