import { createSlice } from '@reduxjs/toolkit'
import * as anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    voteAnecdote(state, action) {
      const id = action.payload.id
      const anecdote = state.find(a => a.id === id)
      if (anecdote) {
        anecdote.votes = action.payload.votes
      }
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, voteAnecdote, createAnecdote } = anecdoteSlice.actions

// Thunks
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteAnecdoteAsync = (anecdote) => {
  return async dispatch => {
    const updated = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(voteAnecdote(updated))
  }
}

export const createAnecdoteAsync = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
