import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// HTTP GET 
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// HTTP GET
const getObject = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

// HTTP POST
const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

// HTTP PUT
const updateObject = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return response.data
}

export default { getAll, getObject, createNew, updateObject }