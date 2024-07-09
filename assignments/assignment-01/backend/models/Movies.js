import { readFromFile } from '../utils/file.js'
import { DATA } from '../constants.js'

class Movie {
  static all() {
    return readFromFile(DATA.MOVIE_LIST)
  }

  static sortTvByPopularity() {
    const movies = readFromFile(DATA.MOVIE_LIST)
    const filtered = movies.filter((m) => m.media_type === 'tv')
    const sorted = filtered.sort((a, b) => b.popularity - a.popularity)
    return sorted
  }

  static sortByPopularity() {
    const movies = readFromFile(DATA.MOVIE_LIST)
    const sorted = movies.sort((a, b) => b.popularity - a.popularity)
    return sorted
  }

  static sortByRating() {
    const movies = readFromFile(DATA.MOVIE_LIST)
    const sorted = movies.sort((a, b) => b.vote_average - a.vote_average)
    return sorted
  }

  static getTotalPages(movies = [], pageSize = this.DEFAULT_PAGE_SIZE) {
    if (movies.length === 0) movies = readFromFile(DATA.MOVIE_LIST)
    return Math.ceil(movies.length / pageSize)
  }

  static filterWithGenres(genreId) {
    const movies = readFromFile(DATA.MOVIE_LIST)
    const filtered = movies.filter((m) => m.genre_ids.includes(genreId))
    return filtered
  }

  static getAllGenres() {
    return readFromFile(DATA.GENRE_LIST)
  }

  static getGenreName(genreId) {
    const genreList = readFromFile(DATA.GENRE_LIST)
    const genreName = genreList.find((g) => g.id === genreId)?.name
    return genreName
  }

  static getMovieVideo(movieId) {
    const videoList = readFromFile(DATA.VIDEO_LIST)
    const movieVideo = videoList.find((v) => v.id === movieId)
    if (!movieVideo) return null
    if (!movieVideo.videos || movieVideo.videos.length === 0) return null
    const videos = movieVideo.videos
    const filtered = videos.filter(
      (v) =>
        (v.type === 'Trailer' || v.type === 'Teaser') &&
        v.site === 'YouTube' &&
        v.official
    )

    if (filtered.length === 0) return null
    const sortWithPublishTime = filtered.sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at)
    )
    const video = sortWithPublishTime.find(
      (v) => v.type === 'Trailer' || v.type === 'Teaser'
    )

    return video ?? null
  }

  static searchMovie(keyword) {
    const search = keyword.toLowerCase()
    const movies = readFromFile(DATA.MOVIE_LIST)
    const filtered = movies.filter(
      (m) =>
        m.overview.toLowerCase().includes(search) ||
        m.name?.toLowerCase().includes(search) ||
        m.title?.toLowerCase().includes(search)
    )
    return filtered
  }

  static DEFAULT_PAGE_SIZE = 20
}

// const readFromFile = (READ_FILE) => {
//   const movies = JSON.parse(
//     fs.readFileSync(path.join(dataPath, READ_FILE)),
//     'utf-8'
//   )
//   return movies
// }

export default Movie
