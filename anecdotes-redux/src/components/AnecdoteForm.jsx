import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNewAnecdote = (event) => {
    event.preventDefault()
    console.log('addAnecdote', event.target.anecdote.value)
    dispatch(addAnecdote(event.target.anecdote.value))
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