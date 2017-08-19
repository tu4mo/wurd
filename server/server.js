const isDev = process.env.NODE_ENV === 'development'

// Load environment variables
require('dotenv').config()

// Import dependencies
const bodyParser = require('body-parser')
const express = require('express')
const gzipStatic = require('connect-gzip-static')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

// Set mongoose to use ES6 promises
mongoose.Promise = global.Promise

// Initialize Express
const app = express()

// Use Morgan to log requests to the console
app.use(morgan('dev'))

// Set up Helmet
app.use(helmet())

// Force HTTPS
if (!isDev) {
  app.use((req, res, next) => {
    req.headers['x-forwarded-proto'] === 'https'
      ? next()
      : res.redirect('https://' + req.headers.host + req.url)
  })
}

// Set up body parser
app.use(bodyParser.json())

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
app.use(gzipStatic(path.resolve(__dirname, '../dist')))

// Set up routes
const api = require('./routes')
app.use('/api', api)

// Serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

// Start the server
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
