import express from 'express'
import cors from 'cors'

// Database
import { mongoConnect } from './db/mongodb.js'
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

app.use((req, res, next) => {
  User.findById('66953cb164f3eb82f98ce375')
    .then((user) => {
      req.user = new User(user._id, user.username, user.email, user.cart)
      next()
    })
    .catch((err) => {
      console.log('err when find user', err)
    })
})

app.use((error, req, res, next) => {
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
mongoConnect(startServer)
