/*
Tests for the blogs API.
*/

const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { startTestDatabase, closeTestDatabase, initialBlogs } = require('./db_setup_for_tests')
const User = require('../models/user')

// supertest provides a high-level abstraction for testing HTTP requests
const api = supertest(app)

// Setup of the test database before any test in this module
beforeAll(async () => {
  await startTestDatabase()
})

// Setup of the test database before each test
beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

// Close the database connection after all tests are done
afterAll(async () => {
  await closeTestDatabase()
})

const getToken = async () => {
  credentials = {
    username: 'kingG',
    password: 'weakpw123'
  }
  const response = await api.post('/api/login').send(credentials)
  return response.body.token
}

// Tests start here
describe('In a GET request to /api/blogs ', () => {

  test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')

    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
  })

  test('the number of blogs is correct', async () => {
    const response = await api.get('/api/blogs')

    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('there is a property named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.statusCode).toBe(200)
    expect(response.body[0].id).toBeDefined()
  })
})

describe('In a POST request to /api/blogs ', () => {

  const newBlog = {
    title: 'New blog from automated test',
    author: 'Jest',
    url: 'www.jest.com',
    likes: 6
  }

  test('a new blog is added if the request comes from logged-in user', async () => {

    const jwtoken = await getToken()
    const response = await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${jwtoken}`)

    expect(response.statusCode).toBe(201) // HTTP 201 Created

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd.length).toBe(initialBlogs.length + 1) // There one more blog

    const blogAdded = blogsAtEnd.find(blog => blog.title === newBlog.title)
    expect(blogAdded).toBeDefined() //The new blog is in the database
  })

  test('a new blog is not added without a logged-in user', async () => {

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.statusCode).toBe(401) // HTTP 401 Unauthorized 
  })

  test('the creator of a new blog is the logged-in user', async () => {

    const jwtoken = await getToken()
    const response = await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${jwtoken}`)

    expect(response.statusCode).toBe(201) // HTTP 201 Created

    const blogsAtEnd = await Blog.find({})
    const blogAdded = blogsAtEnd
      .find(blog => blog.title === newBlog.title)

    console.log("blogAdded: ", blogAdded)

    const loggedInUser = await User.findOne({ username: 'kingG' })
    expect(blogAdded.user.toString()).toBe(loggedInUser.id)
  })

  test('a new blog without likes has 0 likes', async () => {

    const newBlogWithoutLikes = {
      title: 'New blog from automated test without likes',
      author: 'Jest',
      url: 'www.jest.com'
    }
    const jwtoken = await getToken()
    const response = await api.post('/api/blogs')
      .send(newBlogWithoutLikes)
      .set('Authorization', `Bearer ${jwtoken}`)

    expect(response.statusCode).toBe(201) // HTTP 201 Created

    const blogsAtEnd = await Blog.find({})
    const blogAdded = blogsAtEnd
      .find(blog => blog.title === newBlogWithoutLikes.title)

    expect(blogAdded).toBeDefined() //The new blog is in the database
    expect(blogAdded.likes).toBe(0) //The new blog has 0 likes
  })

  test('a new blog without title is rejected', async () => {

    const newBlogWithoutTile = {
      author: 'Jest',
      url: 'www.jest.com',
      likes: 0
    }
    const jwtoken = await getToken()
    const response = await api.post('/api/blogs')
      .send(newBlogWithoutTile)
      .set('Authorization', `Bearer ${jwtoken}`)

    expect(response.statusCode).toBe(400) // HTTP 400 Bad Request
  })

  test('a new blog without url is rejected', async () => {

    const newBlogWithoutUrl = {
      title: 'New blog from automated test without url',
      author: 'Jest',
      likes: 0
    }
    const jwtoken = await getToken()
    const response = await api.post('/api/blogs')
      .send(newBlogWithoutUrl)
      .set('Authorization', `Bearer ${jwtoken}`)

    expect(response.statusCode).toBe(400) // HTTP 400 Bad Request
  })

})

describe('In a DELETE request to /api/blogs/:id ', () => {

  test('a blog is deleted', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1) // There is one less blog

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title) // The deleted blog is not in the database
  })

  test('an invalid id is rejected', async () => {
    const invalidId = 0
    const response = await api.delete(`/api/blogs/${invalidId}`)
    expect(response.statusCode).toBe(400) // HTTP 400 Bad Request
  })
})

describe('In a PUT request to /api/blogs/:id ', () => {

  test('a blog\'s likes is updated', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1
    }
    const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog)
    expect(response.statusCode).toBe(200) // HTTP 200 OK
    expect(response.body.likes).toBe(blogToUpdate.likes + 1) // The likes have been updated
  })

  test('an invalid id is rejected', async () => {
    const invalidId = -1
    const response = await api.put(`/api/blogs/${invalidId}`)
    expect(response.statusCode).toBe(400) // HTTP 400 Bad Request
  })
})
