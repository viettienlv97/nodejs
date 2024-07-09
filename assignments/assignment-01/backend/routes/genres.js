import { Router } from 'express'
import { authenticateWithToken } from '../middleware/auth.js'
import genresController from '../controllers/genres.js'

const router = Router()
router.get('/', authenticateWithToken, genresController.getAllGenres)

export default router
