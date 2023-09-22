import { createSlice } from '@reduxjs/toolkit'

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
export default anecdoteSlice.reducer