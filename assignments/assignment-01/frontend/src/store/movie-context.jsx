import { createContext } from 'react'

const MovieContext = createContext({
  movie: null,
  listId: null,
  selectMovie: () => {}
})

export default MovieContext
