import { useContext} from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const [notificationText, notificationDispatch] = useContext(NotificationContext)

  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 3
  })

  const anecdotes = anecdotesQuery.data

  const newAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  //  The query has no data yet
  if (anecdotesQuery.isLoading) {
    return <div>Loading data...</div>
  }

  // The query failed after all retries
  if (anecdotesQuery.isError) {
    return <div>Anecdotes service not available due to problems in server</div>
  }

  const handleVote = (anecdote) => {
    console.log('vote for', anecdote)
    newAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    notificationDispatch({ type: 'SET_NOTIFICATION', data: `You voted for '${anecdote.content}'` })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION', data: '' })} , 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <br />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} &nbsp;
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App