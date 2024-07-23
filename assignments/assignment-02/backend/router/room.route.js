import { Router } from 'express'
import roomController from '../controller/room.controller.js'

const router = Router()

router.post('/date-range', roomController.getAvailableRoomsByDate)

export default router
