/*
Route handlers.
The event handlers of routes are commonly referred to as controllers, and for this reason 
we have this in the "controllers" directory.
*/

const notesRouter = require('express').Router()
const Blog = require('../models/blog')

// HTTP GET 
notesRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

// HTTP POST 
notesRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = notesRouter