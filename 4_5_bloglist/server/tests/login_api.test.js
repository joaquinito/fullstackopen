/*
Tests for the login API.
*/

const supertest = require('supertest')
const app = require('../app')
const { startTestDatabase, closeTestDatabase } = require('./db_setup_for_tests')

// supertest provides a high-level abstraction for testing HTTP requests
const api = supertest(app)

// Setup of the test database before any test in this module
beforeAll(async () => {
    await startTestDatabase()
})

// Close the database connection after all tests are done
afterAll(async () => {
    await closeTestDatabase()
})

// Tests start here
describe('In a POST request to /api/login ', () => {

    const userCredentials = {
        username: 'kingG',
        password: 'weakpw123'
    }

    const invalidUserCredentials = {
        username: 'kingG',
        password: 'wrongpw'
    }

    test('an existing user is logged in successfully', async () => {

        const response = await api.post('/api/login').send(userCredentials)
        expect(response.statusCode).toBe(200) // HTTP 200 OK
        expect(response.type).toBe('application/json')
        expect(response.body.token).toBeDefined()
    })

    test('an invalid user is not logged in', async () => {

        const response = await api.post('/api/login').send(invalidUserCredentials)
        expect(response.statusCode).toBe(401) // HTTP 401 Unauthorized
        expect(response.type).toBe('application/json')
        expect(response.body.error).toBeDefined()
    })
})
