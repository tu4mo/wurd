// Load environment variables
require('dotenv').config()

// Import dependencies
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

// Set mongoose to use ES6 promises
mongoose.Promise = global.Promise

// Initialize Express
const app = express()

// Enable cors
if (process.env.NODE_ENV === 'development') {
  const cors = require('cors')
  app.use(cors())
}

// Use Morgan to log requests to the console
app.use(morgan('dev'))

// Set up body parser
app.use(bodyParser.json())

// Set up port
const port = process.env.PORT || 3000

// Connect to database
mongoose.connect(process.env.MONGODB_URI)

// Serve static files
app.use(express.static('../client/dist'))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

// Set up routes
const api = require('./routes')
app.use('/api', api)

// Serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'))
})

// Start the server
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
