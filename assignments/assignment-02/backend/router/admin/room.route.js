import { Router } from 'express'
import roomController from '../../controller/admin/room.controller.js'

const router = Router()

router.get('/', roomController.getAllRooms)
router.post('/add', roomController.postNewRoom)
router.delete('/:roomId', roomController.deleleRoom)
export default router
