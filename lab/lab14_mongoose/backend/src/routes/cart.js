import { Router } from 'express'
import cartController from '../controller/cart.js'

const router = Router()

router.get('/', cartController.getCart)
router.post('/add-to-cart', cartController.postAddToCart)
router.delete('/delete', cartController.deleteCartItem)

export default router
