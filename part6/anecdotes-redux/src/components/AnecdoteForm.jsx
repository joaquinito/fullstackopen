import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotificationWithTimeout(`You added '${newAnecdote}'`, 5))
  }

  return (
    <form onSubmit={(addNewAnecdote)}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm