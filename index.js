
// Get environment variables from the .env file
require('dotenv').config()

// Port for the backend server
const PORT = process.env.PORT || 3001
console.log('Env variable PORT: ', process.env.PORT)

//Import libraries
const express = require('express') // Express web server framework
const morgan = require('morgan') // HTTP request logger middleware for node.js
const cors = require('cors') // Cross-Origin Resource Sharing

//Import models
const Person = require('./models/person')

// Create an express app
const app = express()

// Use the express.json middleware to parse JSON data sent to the server
app.use(express.json())
// Use the cors middleware to allow requests from different URL
app.use(cors())
// Use the build middleware to serve static files from the 'build' directory
app.use(express.static('build'))

// Define a custom token for logging request data
morgan.token('data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body) // Assuming you're using JSON data
  }
  return ''
})

// Custom log message format used in morgan
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.data(req, res)
  ].join(' ')
}))

// Persons data - not used since we are using MongoDB
let persons = [
  {
    'id': 1,
    'name': 'Arto Hellas',
    'number': '040-123456'
  },
  {
    'id': 2,
    'name': 'Ada Lovelace',
    'number': '39-44-5323523'
  },
  {
    'id': 3,
    'name': 'Dan Abramov',
    'number': '12-43-234345'
  },
  {
    'id': 4,
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122'
  }
]

// HTTP GET request handler for the root path
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// HTTP GET request handler for /info
app.get('/info', (request, response) => {
  const date = new Date()
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
  })
})

// HTTP GET request handler for /api/persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// HTTP GET request handler for /api/persons/:id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    }
    else {
      response.status(404).end() // id not found
    }
  }).catch(error => next(error))
})

// HTTP POST request handler for /api/persons
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number is missing'
    })
  } else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

// HTTP PUT request handler for /api/persons/:id
app.put('/api/persons/:id', (request, response, next) => {

  const person = {
    name: request.body.name,
    number: request.body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// HTTP DELETE request handler for /api/persons/:id
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end()
  })
    .catch(error => next(error))
})

// Express server listening on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Middleware for unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

// Error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// This has to be the last loaded middleware
app.use(errorHandler)