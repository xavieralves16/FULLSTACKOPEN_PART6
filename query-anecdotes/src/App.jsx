import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, addAnecdote, voteAnecdote } from './services/anecdotes'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { useNotification } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [, dispatch] = useNotification()

  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updated) => {
      queryClient.setQueryData(['anecdotes'], (old) =>
        old.map((a) => (a.id === updated.id ? updated : a))
      )

      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `You voted '${updated.content}'`
      })

      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })

  const createMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (old) => [...old, newAnecdote])

      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `You created '${newAnecdote.content}'`
      })

      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })

  if (isLoading) return <div>Loading data...</div>
  if (isError) return <div>Anecdote service not available</div>

  const handleVote = (anecdote) => voteMutation.mutate(anecdote)
  const handleCreate = (content) =>
  createMutation.mutate({ content, votes: 0 })


  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm onCreate={handleCreate} />
      <AnecdoteList anecdotes={anecdotes} onVote={handleVote} />
    </div>
  )
}

export default App

