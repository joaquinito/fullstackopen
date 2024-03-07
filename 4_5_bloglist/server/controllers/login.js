/*
Route handler for the login endpoint.
*/

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

// HTTP POST
// Expecting a request body with the following format:
// {
//   "username": "user1",
//   "password": "password1"
// }
loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    // Search in the database for the username sent in the request
    const user = await User.findOne({ username })
    // Check if the password sent in the request matches the password in the database
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    // Create a token that contains the username and id of the user in a digitally signed form
    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter