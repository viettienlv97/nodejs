import { Router } from 'express'
import path from 'path'
const router = Router()
const __dirname = path.resolve()

console.log('root.js -> ', __dirname)
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

export default router
