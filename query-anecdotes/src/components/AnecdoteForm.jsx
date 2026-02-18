const AnecdoteForm = ({ onCreate }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    onCreate(content)
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm


