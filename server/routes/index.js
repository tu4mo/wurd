// Require dependencies
const express = require('express')
const passport = require('../middleware/passport')

// Require middleware
const resolveToken = require('../middleware/resolveToken')

// Set up Router
const router = new express.Router()

// Require routes
const account = require('./account')
const auth = require('./auth')
const authToken = require('./auth/token')
const comments = require('./posts/comments')
const likes = require('./posts/likes')
const posts = require('./posts')
const relationships = require('./relationships')
const users = require('./users')

// Set up routes
router.delete('/posts/:id', resolveToken(true), posts.deletePost)
router.delete('/posts/:id/likes', resolveToken(true), likes.deleteLike)
router.delete(
  '/relationships',
  resolveToken(true),
  relationships.deleteRelationship
)
router.get('/account', resolveToken(true), account.get)
router.get('/auth', resolveToken(true), auth.get)
router.get(
  '/auth/twitter',
  passport.authenticate('twitter', { session: false })
)
router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/', session: false }),
  (req, res) => res.redirect(`/auth/${req.user.token}`)
)
router.get('/posts', resolveToken(false), posts.get)
router.get('/posts/:id', resolveToken(false), posts.getSingle)
router.get('/users', resolveToken(false), users.get)
router.get('/users/:username', resolveToken(false), users.getSingle)
router.post('/account', resolveToken(false), account.post)
router.post('/auth', resolveToken(false), auth.post)
router.post('/auth/token', authToken.post)
router.post('/posts', resolveToken(true), posts.post)
router.post('/posts/:id/comments', resolveToken(true), comments.post)
router.post('/posts/:id/likes', resolveToken(true), likes.post)
router.post('/relationships', resolveToken(true), relationships.post)
router.put('/account', resolveToken(true), account.put)

module.exports = router
