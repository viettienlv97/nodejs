import { Router } from 'express'
import moviesController from '../controllers/movies.js'
import { authenticateWithToken } from '../middleware/auth.js'

const router = Router()

router.get(
  '/trending/tv',
  authenticateWithToken,
  moviesController.getTvSortByPopularity
)
router.get(
  '/trending',
  authenticateWithToken,
  moviesController.getSortByPopularity
)
router.get('/top-rate', authenticateWithToken, moviesController.getSortByRating)
router.get(
  '/discover',
  authenticateWithToken,
  moviesController.getMoviesWithGenres
)
router.post('/video', authenticateWithToken, moviesController.postMovieTrailer)
router.post('/search', authenticateWithToken, moviesController.postSearchMovie)
export default router
