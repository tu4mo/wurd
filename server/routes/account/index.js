const router = require('express').Router()

// Require middleware
const resolveToken = require('../../middleware/resolveToken')

// Require models
const User = require('../../models/User')

const getUserAsJSON = user => ({
  email: user.email,
  id: user._id,
  username: user.username,
  verified: user.verified
})

const getFirstError = err => {
  if (err.errors) {
    return err.errors[Object.keys(err.errors)[0]].message
  }

  if (err.code === 11000) {
    return 'User already exists'
  }
}

router.get('/', resolveToken(true), (req, res) => {
  User.findById(req.userId).then(user => {
    return res.status(200).json(getUserAsJSON(user))
  })
})

router.post('/', resolveToken(false), (req, res) => {
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
    username
  })

  newUser.setPassword(password)

  // Save new user
  newUser.save((err, user) => {
    if (err) {
      console.error(err)
      return res.status(400).json({ error: getFirstError(err) })
    }

    res.sendStatus(201)
  })
})

router.put('/', resolveToken(true), async (req, res) => {
  const { email, username, currentPassword, password } = req.body

  try {
    const user = await User.findById(req.userId)
    const isMatch = user.isValidPassword(currentPassword)

    if (isMatch) {
      user.email = email
      user.username = username

      if (password) {
        if (password.length < 8) {
          return res.status(400).json({
            error: 'Password must be at least 8 characters'
          })
        }

        user.setPassword(password)
      }

      const savedUser = await user.save()

      return res.status(200).json(getUserAsJSON(savedUser))
    }

    res.status(400).json({ error: 'Invalid password' })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: getFirstError(err) })
  }
})

module.exports = router
