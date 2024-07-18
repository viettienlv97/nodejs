import { Router } from 'express'
import hotelController from '../controller/hotel.controller.js'

const route = Router()

route.get('/', hotelController.getAllHotel)
route.get('/cities', hotelController.getCities)
route.get('/types', hotelController.getTypes)
route.get('/featured', hotelController.getFeatured)
route.get('/:hotelId', hotelController.getHotelDetail)
route.get('/book/:hotelId', hotelController.getHotelDetailWithRoom)
route.post('/search', hotelController.postSearchHotel)

export default route
