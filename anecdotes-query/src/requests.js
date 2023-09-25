import axios from 'axios'

export const getAnecdotes = () =>
  axios.get('http://localhost:3001/anecdotes')
    .then(res => res.data)


export const createAnecdote = anecdote => {
  if (anecdote.content.length < 5) {
    throw new Error('Anecdote must be at least 5 characters long')
  }
  axios.post('http://localhost:3001/anecdotes', anecdote)
    .then(res => res.data)
  return anecdote
}


export const updateAnecdote = anecdote =>
  axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote)
    .then(res => res.data)

