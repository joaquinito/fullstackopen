/*
Route handlers for database table 'blogs'.
*/

const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// HTTP GET 
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(users)
})

// HTTP POST
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    try {
        if (password.length < 3) {
            return response.status(400).json({
                error: 'password must be at least 3 characters long'
            })
        }
    } catch (error) {
        return response.status(400).json({
            error: 'password is required'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash,
    })
    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter