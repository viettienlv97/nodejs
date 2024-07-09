// const bearerToken =
//   'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjA0MWQyOWQyMTgzMmQ1NGExMmRmNzM3YzMxMTYxNyIsInN1YiI6IjY2NTgyZGZkNDQ0NmVlZjlmYTc0ZGVjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5KPt2ggn1ELMDzSdtvS56Pzl6KgaQoHbg875gORQBDQ'
// export const apiUrl = 'https://api.themoviedb.org/3'
export const imageUrl = 'https://image.tmdb.org/t/p/original/'
export const miniImageUrl = 'https://image.tmdb.org/t/p/w500/'
export const TOKEN = '8qlOkxz4wq'

// export const requests = {
//   fetchTrending: `/trending/all/week?language=en-US`,
//   fetchNetflixOriginals: `/discover/tv?with_network=123`,
//   fetchTopRated: `/movie/top_rated?language=en-US`,
//   fetchActionMovies: `/discover/movie?with_genres=28`,
//   fetchComedyMovies: `/discover/movie?with_genres=35`,
//   fetchHorrorMovies: `/discover/movie?with_genres=27`,
//   fetchRomanceMovies: `/discover/movie?with_genres=10749`,
//   fetchDocumentaries: `/discover/movie?with_genres=99`,
//   fetchSearch: `/search/movie?language=en-US`
// }

export const API_URL = import.meta.env.VITE_API_URL
export const REQUEST = {
  TRENDING_TV: `/movies/trending/tv`,
  TRENDING: `/movies/trending`,
  TOP_RATE: `/movies/top-rate`,
  ACTION_MOVIES: `/movies/discover?with_genres=28`,
  COMEDY_MOVIES: `/movies/discover?with_genres=35`,
  HORROR_MOVIES: `/movies/discover?with_genres=27`,
  ROMANCE_MOVIES: `/movies/discover?with_genres=10749`,
  DOCUMENTARY_MOVIES: `/movies/discover?with_genres=99`,
  VIDEO: `/movies/video`,
  SEARCH: `/movies/search`,
  GENRES: '/movies/genres'
}

export const requestOptions = {
  method: 'GET',
  headers: {
    // Authorization: `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
    Token: TOKEN
  }
}
