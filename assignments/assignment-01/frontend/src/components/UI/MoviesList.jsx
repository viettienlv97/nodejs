import React, { useContext } from 'react'
import useFetchAPI from '../../hooks/useFetchAPI'
import SwiperCarousel from '../Swiper/SwiperCarousel'
import MovieContext from '../../store/movie-context'
import MovieDetail from '../Movie/MovieDetail'

const MoviesList = ({ imgType, title, id, url }) => {
  // sử dụng MovieContext để lấy ra movie đã chọn và listId
  const { movie, listId } = useContext(MovieContext)

  // sử dụng custom hook useFetchAPI để lấy danh sách các phim theo thể loại
  const { data, loading, error } = useFetchAPI(url, {
    autoFetch: true,
    initialData: []
  })
  const movies = data?.results
  if (loading) return <div>Loading ...</div>
  if (error) return <div>Error: {error.message}</div>

  // render ra SwiperCarousel là tập hợp các phim
  if (movies && movies.length) {
    return (
      <div className={`container-fluid py-2 ${id !== 8 ? 'mb-5' : ''}`}>
        {title && <div className='text-light fw-bold'>{title}</div>}
        <SwiperCarousel
          slider={movies}
          imgType={imgType}
          listId={id}
        />
        {/* render ra MovieDetail khi chọn phim */}
        {movie && id === listId && <MovieDetail movie={movie} />}
      </div>
    )
  }
}

export default MoviesList
