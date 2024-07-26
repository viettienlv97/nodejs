import { Router } from 'express'
import authController from '../../controller/admin/auth.controller.js'

const router = Router()

router.post('/login', authController.postLogin)

export default router
