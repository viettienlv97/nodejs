import React from 'react'
import { miniImageUrl } from '../../services/apiService'

const ListMovie = ({ movies, handleSelectMovie }) => {
  return (
    <div className='ms-4 d-flex flex-wrap gap-3'>
      {movies.map((movie) => {
        return (
          <div key={movie.id}>
            <div onClick={() => handleSelectMovie(movie)}>
              <img
                src={miniImageUrl + movie.poster_path}
                alt=''
                width={200}
                height={300}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ListMovie
