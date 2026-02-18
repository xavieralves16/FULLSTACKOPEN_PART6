const AnecdoteList = ({ anecdotes, onVote }) => {
  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id} style={{ marginTop: 10 }}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}{' '}
              <button onClick={() => onVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
