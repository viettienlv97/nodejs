import { Router } from 'express'
import transactionController from '../controller/transaction.controller.js'

const router = Router()

router.get('/:userId', transactionController.getUserTransactions)
router.post('/create', transactionController.postCreateTransaction)

export default router
