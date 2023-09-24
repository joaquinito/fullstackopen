import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))
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