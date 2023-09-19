const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// Action creator for the 'VOTE' action
export const addVote = (selectedId) => {
  return {
    type: 'VOTE',
    payload: { id: selectedId }
  }
}

// Action creator for the 'ADD_ANECDOTE' action
export const addAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    payload: { content }
  }
}

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {

    // Action 'VOTE' will increment the vote counter of the anecdote with the given id by 1
    case 'VOTE': {
      const anecdote = state.find(n => n.id === action.payload.id)
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : changedAnecdote)
    }

    // Action 'ADD_ANECDOTE' will add a new anecdote with the given content
    case 'ADD_ANECDOTE': {
      const newAnecdote = {
        content: action.payload.content,
        id: getId(),
        votes: 0
      }
      console.log('newAnecdote', newAnecdote)
      return state.concat(newAnecdote)
    }
  }

  return state
}

export default anecdoteReducer