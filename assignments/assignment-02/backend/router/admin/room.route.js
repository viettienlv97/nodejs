import { Router } from 'express'
import roomController from '../../controller/admin/room.controller.js'

const router = Router()

router.get('/', roomController.getAllRooms)
router.get('/:roomId', roomController.getRoomDetail)
router.post('/add', roomController.postNewRoom)
router.post('/edit/:roomId', roomController.postUpdateRoom)
router.delete('/:roomId', roomController.deleleRoom)
export default router
