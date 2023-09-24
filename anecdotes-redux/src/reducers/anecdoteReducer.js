import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {

    setAnecdotes(state, action) {
      return action.payload
    },

    addAnecdote(state, action) {
      state.push(action.payload)
    },

    addVote(state, action) {
      console.log('state', JSON.parse(JSON.stringify(state)))
      console.log('action', action.payload)

      const targetAnecdote = state.find(anecdote => anecdote.id === action.payload)
      const changedAnecdote = {
        ...targetAnecdote,
        votes: targetAnecdote.votes + 1
      }

      return state.map(anecdote => anecdote.id !== action.payload ? anecdote : changedAnecdote)
    }
  }
})

export const { addAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions

/*
Action creator function. In the inner function, meaning the asynchronous action, 
the operation first fetches all the notes from the server and then dispatches the 
setAnectodes action, which adds them to the store. This way, The initialization logic 
for the anecdotes is completely separated from the React components.
*/
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// Action creation function
export const createAnecdote = (content) => {
  return async dispatch => {
    console.log('content', content)
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer