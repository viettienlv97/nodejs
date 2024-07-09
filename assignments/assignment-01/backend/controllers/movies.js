import Movie from '../models/Movies.js'

const getTvSortByPopularity = (req, res) => {
  const tvshows = Movie.sortTvByPopularity()
  let { pageIndex, pageSize } = req.query
  if (!pageIndex || isNaN(+pageIndex)) pageIndex = 1
  if (!pageSize || isNaN(+pageSize)) pageSize = Movie.DEFAULT_PAGE_SIZE

  const totalPages = Movie.getTotalPages(tvshows, pageSize)
  const startIndex = (+pageIndex - 1) * pageSize
  const endIndex = +pageIndex * pageSize
  const filtered = tvshows.slice(startIndex, endIndex)

  return res.status(200).send({
    success: true,
    results: filtered,
    page: +pageIndex,
    total_pages: totalPages
  })
}

const getSortByPopularity = (req, res) => {
  const movies = Movie.sortByPopularity()
  let { pageIndex, pageSize } = req.query
  if (!pageIndex || isNaN(+pageIndex)) pageIndex = 1
  if (!pageSize || isNaN(+pageSize)) pageSize = Movie.DEFAULT_PAGE_SIZE

  const totalPages = Movie.getTotalPages(pageSize)
  const startIndex = (+pageIndex - 1) * pageSize
  const endIndex = +pageIndex * pageSize
  const filtered = movies.slice(startIndex, endIndex)

  return res.status(200).send({
    success: true,
    results: filtered,
    page: +pageIndex,
    total_pages: totalPages
  })
}

const getSortByRating = (req, res) => {
  const movies = Movie.sortByRating()
  let { pageIndex, pageSize } = req.query
  if (!pageIndex || isNaN(+pageIndex)) pageIndex = 1
  if (!pageSize || isNaN(+pageSize)) pageSize = Movie.DEFAULT_PAGE_SIZE

  const totalPages = Movie.getTotalPages(pageSize)
  const startIndex = (+pageIndex - 1) * pageSize
  const endIndex = +pageIndex * pageSize
  const filtered = movies.slice(startIndex, endIndex)

  return res.status(200).send({
    success: true,
    results: filtered,
    page: +pageIndex,
    total_pages: totalPages
  })
}

const getMoviesWithGenres = (req, res) => {
  const { with_genres } = req.query
  if (!with_genres || isNaN(+with_genres))
    return res.status(400).send({
      success: false,
      error: 'Not found genre parram'
    })

  const genreName = Movie.getGenreName(+with_genres)
  if (!genreName) {
    return res.status(400).send({
      success: false,
      error: 'Not found that genre id'
    })
  }

  const movies = Movie.filterWithGenres(+with_genres)
  let { pageIndex, pageSize } = req.query
  if (!pageIndex || isNaN(+pageIndex)) pageIndex = 1
  if (!pageSize || isNaN(+pageSize)) pageSize = Movie.DEFAULT_PAGE_SIZE

  const totalPages = Movie.getTotalPages(pageSize)
  const startIndex = (+pageIndex - 1) * pageSize
  const endIndex = +pageIndex * pageSize
  const filtered = movies.slice(startIndex, endIndex)

  return res.status(200).send({
    success: true,
    results: filtered,
    page: +pageIndex,
    total_pages: totalPages,
    genre_name: genreName
  })
}

const postMovieTrailer = (req, res) => {
  const { movieId } = req.body
  if (!movieId) {
    return res.status(400).send({
      success: false,
      error: 'Not found movie_id parram'
    })
  }
  const video = Movie.getMovieVideo(movieId)
  if (!video) {
    return res.status(404).send({
      success: false,
      error: 'Not found video'
    })
  }

  return res.status(200).send({
    success: true,
    data: video
  })
}

const postSearchMovie = (req, res) => {
  const { keyword, mediaType, languages, year, genres } = req.body
  if (!keyword) {
    return res.status(400).send({
      success: false,
      error: 'Not found keyword parram'
    })
  }

  let movies = Movie.searchMovie(keyword)
  if (year) {
    movies = movies.filter(
      (m) => new Date(m.release_date).getFullYear() === year
    )
  }
  if (mediaType !== 'all') {
    movies = movies.filter((m) => m.media_type === mediaType)
  }
  if (languages.length !== 0) {
    movies = movies.filter((m) => languages.includes(m.original_language))
  }
  if (genres.length !== 0) {
    movies = movies.filter((m) =>
      m.genre_ids.some((genre) => genres.includes(genre))
    )
  }

  let { pageIndex, pageSize } = req.query
  if (!pageIndex || isNaN(+pageIndex)) pageIndex = 1
  if (!pageSize || isNaN(+pageSize)) pageSize = Movie.DEFAULT_PAGE_SIZE

  const totalPages = Movie.getTotalPages(movies, pageSize)
  const startIndex = (+pageIndex - 1) * pageSize
  const endIndex = +pageIndex * pageSize
  const filtered = movies.slice(startIndex, endIndex)

  return res.status(200).send({
    success: true,
    results: filtered,
    page: +pageIndex,
    total_pages: totalPages
  })
}

export default {
  getTvSortByPopularity,
  getSortByPopularity,
  getSortByRating,
  getMoviesWithGenres,
  postMovieTrailer,
  postSearchMovie
}
