/*
    Creates the actual application, taking different middleware into use.
    Has responsibility for connecting to the database.
*/

const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors') // let's us not need to explicitly write out try-catch blocks for error handling
const notesRouter = require('./controllers/notes') // Must only define relative parts of routes
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter) // Note the path here

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
