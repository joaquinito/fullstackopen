/*
Tests for the blogs API.
*/

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

// supertest provides a high-level abstraction for testing HTTP requests
const api = supertest(app)

describe('In a GET request to /api/blogs ', () => {

  test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
  })

  test('the number of blogs is correct', async () => {
    const response = await api.get('/api/blogs')

    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(2)
  })

  test('there is a property named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.statusCode).toBe(200)
    expect(response.body[0].id).toBeDefined()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })
})