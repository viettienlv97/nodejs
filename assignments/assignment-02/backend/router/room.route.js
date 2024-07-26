import { Router } from 'express'
import roomController from '../controller/room.controller.js'

const router = Router()

router.get('/', roomController.getAllRooms)
router.post('/date-range', roomController.getAvailableRoomsByDate)

export default router
