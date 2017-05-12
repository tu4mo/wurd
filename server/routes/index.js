// Require dependencies
const express = require('express')

// Require middleware
const isAuthenticated = require('../middleware/isAuthenticated')

// Set up Router
const router = new express.Router()

// Require routes
const auth = require('./auth')
const posts = require('./posts')
const users = require('./users')

// Set up routes
router.get('/auth', isAuthenticated, auth.get)
router.post('/auth', auth.post)
// router.get('/posts', posts.get)
router.post('/posts', isAuthenticated, posts.post)
router.post('/users', users)

module.exports = router
