import { Router } from 'express'
import paymentController from '../controller/payment.controller.js'

const route = Router()

route.get('/', paymentController.getPaymentMethods)
export default route
