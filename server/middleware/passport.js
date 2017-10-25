const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const User = require('../models/User')

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const user = await User.findOneOrCreate({
          query: {
            twitterId: profile.id
          },
          user: {
            twitterId: profile.id,
            username: `tw${profile.id}`
          }
        })

        const userWithToken = await user.generateOneTimeToken()

        done(null, userWithToken)
      } catch (err) {
        done(err)
      }
    }
  )
)

module.exports = passport
