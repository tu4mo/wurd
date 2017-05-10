// Load environment variables
require('dotenv').config()

// Import dependencies
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const path = require('path')

// Initialize Express
const app = express()

// Use Morgan to log requests to the console
app.use(morgan('dev'))

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }))

// Set up port
const port = process.env.PORT || 3000

// Serve static files
app.use(express.static('../client/dist'))

// Set up routes
// const api = require('./routes')
// app.use('/api', api)

// Serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'))
})

// Start the server
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
