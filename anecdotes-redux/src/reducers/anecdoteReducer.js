import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {

    addAnecdote(state, action) {
      console.log('state', JSON.parse(JSON.stringify(state)))
      console.log('action', action.payload)

      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      return state.concat(newAnecdote)
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
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer