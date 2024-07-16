import { Router } from 'express'
import { getCart, postAddToCart, deleteCartItem } from '../controller/cart.js'

const router = Router()
router.get('/', getCart)
router.post('/add-to-cart', postAddToCart)
// router.delete('/delete', deleteCartItem)

export default router
