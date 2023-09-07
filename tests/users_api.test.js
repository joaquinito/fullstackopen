/*
Tests for the users API.
*/

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

// supertest provides a high-level abstraction for testing HTTP requests
const api = supertest(app)

// Initial users in the test database
initialUsers = [
    {
        username: 'kingG',
        name: 'King Gizzard',
        password: 'weakpw123'
    }
]

// Setup of the test database before each test
beforeEach(async () => {
    await User.deleteMany({})

    let userObject = new User(initialUsers[0])
    await userObject.save()
})

// Close the database connection after all tests are done
afterAll(async () => {
    await mongoose.connection.close()
})

// Tests start here
describe('In a POST request to /api/users ', () => {

    const newUser = {
        username: 'lWizz',
        name: 'Lizard Wizzard',
        password: 'weakpw456'
    }

    test('a new user is created', async () => {

        const response = await api.post('/api/users').send(newUser)
        expect(response.statusCode).toBe(201) // HTTP 201 Created

        const usersAtEnd = await User.find({})
        expect(usersAtEnd.length).toBe(initialUsers.length + 1) // There is one user

        const userAdded = usersAtEnd.find(user => user.username === newUser.username)
        expect(userAdded).toBeDefined() //The new user is in the database
    })

    test('the password has been hashed', async () => {
    
        const response = await api.post('/api/users').send(newUser)
        expect(response.statusCode).toBe(201) // HTTP 201 Created

        const usersAtEnd = await User.find({})
        const userAdded = usersAtEnd.find(user => user.username === newUser.username)
        expect(userAdded.passwordHash).not.toBe(newUser.password) 
    })
})

describe('In a GET request to /api/users ', () => {

    test('users are returned as json', async () => {
        const response = await api.get('/api/users')
    
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('application/json')
      })
    
      test('the number of users is correct', async () => {
        const response = await api.get('/api/users')
    
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(initialUsers.length)
      })
})