import { Router } from 'express'
import { getOrders, postOrder } from '../controller/order.js'

const router = Router()
router.get('/', getOrders)
router.post('/create-order', postOrder)

export default router
