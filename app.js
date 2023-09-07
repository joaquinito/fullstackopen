/*
Code that creates the actual application.
This file takes different middleware into use.
*/

const express = require('express')
require('express-async-errors') 
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

app = express()

logger.info('Connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.requestLogger)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app