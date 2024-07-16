import { Router } from 'express'
import productController from '../controller/products.js'

const router = Router()

router.get('/', productController.getAllProducts)
router.post('/add-product', productController.postAddProduct)
router.get('/:productId', productController.getProductDetail)

export default router
