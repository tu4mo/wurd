// Require dependencies
const express = require('express')

// Require middleware
const resolveToken = require('../middleware/resolveToken')

// Set up Router
const router = new express.Router()

// Require routes
const auth = require('./auth')
const posts = require('./posts')
const likes = require('./posts/likes')
const relationships = require('./relationships')
const users = require('./users')

// Set up routes
router.delete('/posts/:id/likes', resolveToken(true), likes.deleteLike)
router.get('/auth', resolveToken(true), auth.get)
router.get('/posts', resolveToken(false), posts.get)
router.get('/posts/:id', resolveToken(false), posts.getSingle)
router.get('/users/:username', resolveToken(false), users.get)
router.post('/auth', resolveToken(false), auth.post)
router.post('/posts', resolveToken(true), posts.post)
router.post('/posts/:id/likes', resolveToken(true), likes.post)
router.post('/relationships', resolveToken(true), relationships.post)
router.post('/users', resolveToken(false), users.post)

module.exports = router
