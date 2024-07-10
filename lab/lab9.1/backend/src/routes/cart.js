import { Router } from 'express'
import { getCart, postAddToCart } from '../controller/cart.js'

const router = Router()
router.get('/', getCart)
router.post('/add-to-cart', postAddToCart)

export default router
