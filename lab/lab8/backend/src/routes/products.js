import { Router } from 'express'
import { getAllProducts, postAddProduct } from '../controller/products.js'

const router = Router()

router.get('/', getAllProducts)
router.post('/add-product', postAddProduct)

export default router
