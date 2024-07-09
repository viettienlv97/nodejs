import Movie from '../models/Movies.js'

const getAllGenres = (req, res) => {
  const genresList = Movie.getAllGenres()
  return res.status(200).send({
    success: true,
    data: genresList
  })
}

export default {
  getAllGenres
}
