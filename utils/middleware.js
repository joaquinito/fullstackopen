/*
Custom middleware functions.
*/

const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

// Unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// Error handler middleware
const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {

        if (error.errors.username) {
            return response.status(400).json({ error: 'username is required' })
        }
        else if (error.errors.password) {
            return response.status(400).json({ error: 'password is required' })
        }
        else {
            return response.status(400).json({ error: error.message })
        }
    }
    // MongoDB error code 11000 indicates a duplicate key error
    else if (error.name === 'MongoServerError' && error.code === 11000) {
        return response.status(400).json({ error: 'username already exists' })
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}