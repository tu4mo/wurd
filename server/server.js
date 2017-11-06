const isDev = process.env.NODE_ENV === 'development'

// Load environment variables
require('dotenv').config()

// Import dependencies
const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')

// Set mongoose to use ES6 promises
mongoose.Promise = global.Promise

// Initialize Express
const app = express()

// Use Morgan to log requests to the console
app.use(morgan('dev'))

// Set up compression
app.use(compression())

// Set up Helmet
app.use(helmet())

// Set up session
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  })
)

// Set up passport
const passport = require('./middleware/passport')
app.use(passport.initialize())

// Force HTTPS
if (!isDev) {
  app.use((req, res, next) => {
    req.headers['x-forwarded-proto'] === 'https'
      ? next()
      : res.redirect('https://' + req.headers.host + req.url)
  })
}

// Set up JSON parser
app.use(express.json())

// Set up port
const port = process.env.PORT || 3000

// Connect to database
mongoose.connect(
  isDev ? process.env.MONGODB_DEV_URI : process.env.MONGODB_URI,
  {
    useMongoClient: true
  }
)

// Serve static (gzip) files
app.use(express.static(path.resolve(__dirname, '../dist')))

// Set up routes
const routes = require('./routes')
app.use('/api', routes)

// Serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

// Start the server
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
