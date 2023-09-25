import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'], 
    queryFn: getAnecdotes,
    retry: 3
  })

  //  The query has no data yet
  if (anecdotesQuery.isLoading) {
    return <div>Loading data...</div>
  }

  // The query failed after all retries
  if (anecdotesQuery.isError) {
    return <div>Anecdotes service not available due to problems in server</div>
  }

  const anecdotes = anecdotesQuery.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App