import { Router } from 'express'
import path from 'path'
const router = Router()
const __dirname = path.resolve()

console.log('users.js -> ', __dirname)
router.get('/users', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'users.html'))
})

export default router
