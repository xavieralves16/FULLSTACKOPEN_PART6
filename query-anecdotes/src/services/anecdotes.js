const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  return response.json()
}

export const addAnecdote = async (content) => {
  const anecdote = { content, votes: 0 }
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  })
  return response.json()
}

export const voteAnecdote = async (anecdote) => {
  const updated = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated),
  })
  return response.json()
}