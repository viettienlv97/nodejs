import React, { useReducer } from 'react'
import MovieContext from './movie-context'

const defaultMovieState = {
  movie: null,
  listId: null
}
const movieReducer = (state, action) => {
  if (action.type === 'SELECT') {
    return action.payload
  }
  return defaultMovieState
}

const MovieProvider = ({ children }) => {
  const [movieState, dispatchMovieAction] = useReducer(
    movieReducer,
    defaultMovieState
  )
  const handleSelectMovie = (payload) => {
    dispatchMovieAction({ type: 'SELECT', payload })
  }

  const movieContext = {
    movie: movieState.movie,
    listId: movieState.listId,
    selectMovie: handleSelectMovie
  }
  return (
    <MovieContext.Provider value={movieContext}>
      {children}
    </MovieContext.Provider>
  )
}

export default MovieProvider
