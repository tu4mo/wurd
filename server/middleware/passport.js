const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const User = require('../models/User')

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      includeEmail: true
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const { emails, id: twitterId } = profile
        const { value: email } = emails[0]

        const foundUser = await User.findOne({
          $or: [{ twitterId }, { email }]
        })

        const user = await (!foundUser
          ? User.create({ email, twitterId, username: `tw${twitterId}` })
          : foundUser
              .set({
                email: foundUser.email !== email ? foundUser.email : email,
                twitterId
              })
              .save())

        const userWithToken = await user.generateOneTimeToken()

        done(null, userWithToken)
      } catch (err) {
        done(err)
      }
    }
  )
)

module.exports = passport
