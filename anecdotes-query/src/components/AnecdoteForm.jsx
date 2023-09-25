import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  /* In React Query, mutations are typically used to create/update/delete data or 
   perform server side effects.
   In order to render a new note as well, we need to tell React Query that the old 
   result of the query whose key is the string anecdotes should be invalidated. This in turn 
   causes React Query to automatically update a query with the key anecdotes, i.e. fetch the 
   anecdotes from the server. As a result, the application renders the up-to-date state on the 
   server, i.e. the added note is also rendered.
   */
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length < 5) {
      throw new Error('Anecdote must be at least 5 characters long')
    }
    newAnecdoteMutation.mutate({
      content,
      votes: 0
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm