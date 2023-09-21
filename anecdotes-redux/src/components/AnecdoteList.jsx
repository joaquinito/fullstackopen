import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const anecdotes = useSelector(state => {

    console.log('state', state)

    if (filter === '' || filter === undefined) {
      return state.anecdotes
    }
    else {
      return state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }
  })

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  return (
    <div>
      {anecdotes
        .slice() // Create a copy of the anecdotes array
        .sort((a, b) => b.votes - a.votes) // Sort by votes in descending order
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList