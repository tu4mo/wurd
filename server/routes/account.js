// Require dependencies
const bcrypt = require('bcrypt')

// Require models
const User = require('../models/User')

const getUserAsJSON = user => ({
  email: user.email,
  id: user._id,
  username: user.username
})

const getFirstError = err => {
  if (err.errors) {
    return err.errors[Object.keys(err.errors)[0]].message
  }

  if (err.code === 11000) {
    return 'Username already exists'
  }
}

const hashPassword = password => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

module.exports.get = (req, res) => {
  User.findById(req.userId).then(user => {
    return res.status(200).json(getUserAsJSON(user))
  })
}

module.exports.post = (req, res) => {
  const { email, username, password } = req.body

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Fill in the required fields' })
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters'
    })
  }

  // Create new user
  const newUser = new User({
    email,
    username,
    password: hashPassword(password)
  })

  // Save new user
  newUser.save((err, user) => {
    if (err) {
      console.error(err)
      return res.status(400).json({ error: getFirstError(err) })
    }

    res.sendStatus(201)
  })
}

module.exports.put = async (req, res) => {
  const { email, username, currentPassword, password } = req.body

  try {
    const user = await User.findById(req.userId)
    const isMatch = await bcrypt.compare(currentPassword, user.password)

    if (isMatch) {
      user.email = email
      user.username = username

      if (password) {
        if (password.length < 8) {
          return res.status(400).json({
            error: 'Password must be at least 8 characters'
          })
        }

        user.password = hashPassword(password)
      }

      const savedUser = await user.save()

      return res.status(200).json(getUserAsJSON(savedUser))
    }

    res.status(400).json({ error: 'Invalid password' })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: getFirstError(err) })
  }
}
