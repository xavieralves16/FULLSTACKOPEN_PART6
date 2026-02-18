import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, addAnecdote, voteAnecdote } from './services/anecdotes'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, setNotification] = useState('')

  // Query para obter as anecdotes
  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  // Mutation para votar numa anecdote
  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updated) => {
      queryClient.setQueryData(['anecdotes'], (old) =>
        old.map((a) => (a.id === updated.id ? updated : a))
      )
      setNotification(`You voted '${updated.content}'`)
      setTimeout(() => setNotification(''), 5000)
    }
  })

  // Mutation para criar nova anecdote
  const createMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (old) => [...old, newAnecdote])
      setNotification(`You created '${newAnecdote.content}'`)
      setTimeout(() => setNotification(''), 5000)
    }
  })

  // Loading / Error
  if (isLoading) return <div>Loading data...</div>
  if (isError) return <div>Anecdote service not available due to problems in server</div>

  // Handlers
  const handleVote = (anecdote) => voteMutation.mutate(anecdote)


  const handleCreate = (content) =>
    createMutation.mutate({ content, votes: 0 })

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification message={notification} />
      <AnecdoteForm onCreate={handleCreate} />
      <AnecdoteList anecdotes={anecdotes} onVote={handleVote} />
    </div>
  )
}

export default App
