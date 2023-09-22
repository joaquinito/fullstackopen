import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    console.log('addAnecdote', event.target.anecdote.value)
    const newAnecdote = await anecdoteService.createNew(event.target.anecdote.value)
    dispatch(addAnecdote(newAnecdote))

    dispatch(setNotification(`You added '${event.target.anecdote.value}'`))
    setTimeout(() => dispatch(clearNotification()),5000)
  }

  return (
    <form onSubmit={(addNewAnecdote)}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm