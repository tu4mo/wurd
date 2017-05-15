// Require dependencies
const express = require('express')

// Require middleware
const isAuthenticated = require('../middleware/isAuthenticated')

// Set up Router
const router = new express.Router()

// Require routes
const auth = require('./auth')
const posts = require('./posts')
const relationships = require('./relationships')
const users = require('./users')

// Set up routes
router.get('/auth', isAuthenticated, auth.get)
router.get('/posts', posts.get)
router.get('/users/:username', users.get)
router.post('/auth', auth.post)
router.post('/posts', isAuthenticated, posts.post)
router.post('/relationships', isAuthenticated, relationships.post)
router.post('/users', users.post)

module.exports = router
