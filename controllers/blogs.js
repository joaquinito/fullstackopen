/*
Route handlers.
The event handlers of routes are commonly referred to as controllers, and for this reason 
we have this in the "controllers" directory.
Note that we are using the express-async-errors library to catch exceptions in async functions,
instead of using try-catch in all of the route handlers. More information:
https://fullstackopen.com/en/part4/testing_the_backend#eliminating-the-try-catch
*/

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// HTTP GET 
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

// HTTP POST 
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter