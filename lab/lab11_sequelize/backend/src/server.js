import express from 'express'
import cors from 'cors'
// import { v4 as uuid } from 'uuid'
// Database
import syncDataBase from './db/sync.js'
import User from './model/shop/User.js'
// import sequelize from './db/sequelize.js'
// import Captain from './model/test/Captain.js'
// import Ship from './model/test/Ship.js'

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

app.use((req, _, next) => {
  User.findOne()
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => console.log(err))
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

syncDataBase(false, startServer)
