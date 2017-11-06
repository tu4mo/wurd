// Require dependencies
const router = require('express').Router()

// Require routes
const account = require('./account')
const auth = require('./auth')
const posts = require('./posts')
const relationships = require('./relationships')
const users = require('./users')

// Set up routes
router.use('/account', account)
router.use('/auth', auth)
router.use('/posts', posts)
router.use('/relationships', relationships)
router.use('/users', users)

module.exports = router
