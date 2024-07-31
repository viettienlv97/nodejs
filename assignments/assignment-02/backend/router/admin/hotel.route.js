import { Router } from 'express'
import hotelController from '../../controller/admin/hotel.controller.js'

const router = Router()

router.get('/', hotelController.getHotels)
router.get('/:hotelId', hotelController.getDetail)
router.post('/add', hotelController.postAddHotel)
router.post('/edit/:hotelId', hotelController.postUpdateHotel)
router.delete('/:hotelId', hotelController.deleteById)

export default router
