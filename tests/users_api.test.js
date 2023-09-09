/*
Tests for the users API.
*/

const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { startTestDatabase, closeTestDatabase, initialUsers } = require('./db_setup_for_tests')

// supertest provides a high-level abstraction for testing HTTP requests
const api = supertest(app)

// Setup of the test database before each test
beforeEach(async () => {
    await startTestDatabase()
})

// Close the database connection after all tests are done
afterAll(async () => {
    await closeTestDatabase()
})

// Tests start here
describe('In a POST request to /api/users ', () => {

    const newUser = {
        username: 'tImpala',
        name: 'tame Impala',
        password: 'weakpw456'
    }

    const existingUser = {
        username: 'kingG',
        name: 'King Gizzard',
        password: 'weakpw123'
    }

    const userWithoutUsername = {
        name: 'Incomplete User',
        password: 'weakpw456'
    }

    const userWithoutPassword = {
        username: 'incUser',
        name: 'Incomplete User'
    }

    test('a new user is created', async () => {

        const response = await api.post('/api/users').send(newUser)
        expect(response.statusCode).toBe(201) // HTTP 201 Created

        const usersAtEnd = await User.find({})
        expect(usersAtEnd.length).toBe(initialUsers.length + 1) // There is one more user

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

    test('a user with an existing username is not created', async () => {

        const response = await api.post('/api/users').send(existingUser)
        expect(response.statusCode).toBe(400) // HTTP 400 Bad Request
        expect(response.body.error).toContain('username already exists')
    })

    test('a user with a missing username is not created', async () => {

        const response = await api.post('/api/users').send(userWithoutUsername)
        expect(response.statusCode).toBe(400) // HTTP 400 Bad Request
        expect(response.body.error).toContain('username is required')
    })

    test('a user with a missing password is not created', async () => {

        const response = await api.post('/api/users').send(userWithoutPassword)
        expect(response.statusCode).toBe(400) // HTTP 400 Bad Request
        expect(response.body.error).toContain('password is required')
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