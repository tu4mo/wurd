const router = require('express').Router()
const passport = require('../../middleware/passport')

router.get('/', passport.authenticate('twitter', { session: false }))

router.get(
  '/callback',
  passport.authenticate('twitter', { failureRedirect: '/', session: false }),
  (req, res) => res.redirect(`/auth/${req.user.token}`)
)

module.exports = router
