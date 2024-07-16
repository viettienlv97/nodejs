import { Router } from 'express'
import orderController from '../controller/order.js'

const router = Router()

router.get('/', orderController.getOrders)
router.post('/create-order', orderController.postOrder)

export default router
