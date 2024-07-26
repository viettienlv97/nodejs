import { Router } from 'express'
import transactionController from '../../controller/admin/transaction.controller.js'
const router = Router()

router.get('/latest', transactionController.getLatestTransactions)
router.get('/', transactionController.getAllTransactions)

export default router
