import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// Database
import User from './model/shop/User.js'

// Routes
import productRoutes from './routes/products.js'
import cartRoutes from './routes/cart.js'
import adminRoutes from './routes/admin.js'
import orderRoutes from './routes/orders.js'

const PORT = 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// app.use((req, res, next) => {
//   User.findOne()
//     .then((user) => {
//       req.user = user
//       next()
//     })
//     .catch((err) => console.log(err))
// })

app.use((error, _, res) => {
  console.error('Something wrong: ' + error)
  res.status(500).send('Server has error!')
})

app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/orders', orderRoutes)

app.use((_, res, next) => {
  res.status(404).send('Page not found')
})

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`
OK
Server is running on port ${PORT}
http://localhost:5000
`)
  })
}
mongoose
  .connect(process.env.MONGO_DB, { dbName: 'lab16' })
  .then(() => {
    startServer()
  })
  .catch((err) => console.log(err))
