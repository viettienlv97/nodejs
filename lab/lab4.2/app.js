import express from 'express'
import path from 'path'
import rootRoutes from './routes/root.js'
import userRoutes from './routes/users.js'
const app = express()
const __dirname = path.resolve()

console.log('app.js -> ', __dirname)

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', rootRoutes)
app.use('/', userRoutes)

app.listen(3000, () => {
  console.log(`Server is running on port 3000, http://localhost:3000`)
})
