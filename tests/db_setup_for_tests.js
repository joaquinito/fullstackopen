/*
Data and functions for setting up the test database. 
*/

const mongoose = require('mongoose')
const User = require('../models/user')
const Blog = require('../models/blog')

// Initial users in the test database
const initialUsers = [
    {
        username: 'kingG',
        name: 'King Gizzard',
        passwordHash: '$2b$10$8e9ZDlpVDePBb/eH8i2HxePYReQqBdbPQCDKGZ7No5EKguHeZz6VS'
    }
]

// Initial blogs in the test database
const initialBlogs = [
    {
        title: 'First blog',
        author: 'Ricardo',
        url: 'www.firstblog.com',
        likes: 2
    },
    {
        title: 'Second blog',
        author: 'Maria',
        url: 'www.secondblog.com',
        likes: 4
    }
]

/* Start the test database
   1. Delete all users and blogs
   2. Add one user and two blogs
*/
const startTestDatabase = async () => {

    await User.deleteMany({})
    await Blog.deleteMany({})

    let userObject = new User(initialUsers[0])
    await userObject.save()

    let blogObject = new Blog(initialBlogs[0])
    blogObject.user = userObject._id
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    blogObject.user = userObject._id
    await blogObject.save()
}

/* Close the mongoose connection */
const closeTestDatabase = async () => {
    await mongoose.connection.close()
}

module.exports = {
    initialUsers,
    initialBlogs,
    startTestDatabase,
    closeTestDatabase
}
