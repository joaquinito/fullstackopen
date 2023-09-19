import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNewAnecdote = (event) => {
    event.preventDefault()
    console.log('addAnecdote', event.target.anecdote.value)
    dispatch(addAnecdote(event.target.anecdote.value))
  }

  return (
    <form onSubmit={(addNewAnecdote)}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm