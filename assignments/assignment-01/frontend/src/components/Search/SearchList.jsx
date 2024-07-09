import React, { useState } from 'react'
import MovieDetail from '../Movie/MovieDetail'
import ListMovie from './ListMovie'

const SearchList = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const filtered = movies.filter((movie) => movie.poster_path)

  const handleSelectMovie = (movie) => {
    if (!selectedMovie || movie.id !== selectedMovie.id) {
      setSelectedMovie(movie)
    } else if (movie.id === selectedMovie.id) {
      setSelectedMovie(null)
    }
  }

  return (
    <section id='search-list'>
      <div className='container-fluid'>
        <h3 className='text-light mb-4'>Search Result</h3>
        {selectedMovie && (
          <div className='me-5 mb-5'>
            <MovieDetail movie={selectedMovie} />
          </div>
        )}

        <ListMovie
          movies={filtered}
          handleSelectMovie={handleSelectMovie}
        />
      </div>
    </section>
  )
}

export default SearchList
