import { Router } from 'express'
import hotelController from '../../controller/admin/hotel.controller.js'

const router = Router()

router.get('/', hotelController.getHotels)
router.post('/add', hotelController.postAddHotel)
router.delete('/:hotelId', hotelController.deleteById)

export default router
