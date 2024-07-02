import { Router } from 'express'
// import path from 'path'
// import viewDir from '../views'
// import { products } from './admin'
import { getProducts } from '../controllers/products'
const router = Router()

router.get('/', getProducts)

export default router
