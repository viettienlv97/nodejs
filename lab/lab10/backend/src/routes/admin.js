import { Router } from 'express'
import adminController from '../controller/admin.js'

const router = Router()

router.get('/:productId', adminController.getEditProduct)
router.post('/update-product', adminController.postEditProduct)
router.delete('/:productId', adminController.deleteProduct)

export default router
