import { Router, Request, Response } from 'express'
// import path from 'path'
// import viewsDir from '../views'
import { getAddProduct, postAddProduct } from '../controllers/products'

const router = Router()
export const products: Array<string> = []

router.get('/add-product', getAddProduct)

router.post('/add-product', postAddProduct)

export default router
