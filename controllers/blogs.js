/*
Route handlers for database table 'blogs'.
The event handlers of routes are commonly referred to as controllers, and for this reason 
we have this in the "controllers" directory.
Note that we are using the express-async-errors library to catch exceptions in async functions,
instead of using try-catch in all of the route handlers. More information:
https://fullstackopen.com/en/part4/testing_the_backend#eliminating-the-try-catch
*/

const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

// HTTP GET 
blogsRouter.get('/', async (request, response) => {
    // .populate('user') will make the 'user' field of the blog document 
    // contain the information of the user who created the blog
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 , id: 1 })
    response.json(blogs)
})

// HTTP POST 
blogsRouter.post('/', async (request, response) => {

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        // 401 Unauthorized
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

// HTTP DELETE
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

// HTTP PUT
blogsRouter.put('/:id', async (request, response) => {
    const newBlogData = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlogData,
        { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter