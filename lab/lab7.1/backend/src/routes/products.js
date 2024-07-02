import { Router } from 'express'
import { getProducts, postAddProduct } from '../controllers/products.js'
const router = Router()

router.get('/products', getProducts)

router.post('/products/add-product', postAddProduct)

export default router
