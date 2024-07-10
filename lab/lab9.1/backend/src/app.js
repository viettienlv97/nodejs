import express from 'express'
import cors from 'cors'

// Routes
import productRoutes from './routes/products.js'
import cartRoutes from './routes/cart.js'
import adminRoutes from './routes/admin.js'

const PORT = 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use((error, req, res, next) => {
  console.error('Something wrong: ' + error)
  res.status(500).send('Server has error!')
})

app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/admin', adminRoutes)

app.use((req, res, next) => {
  res.status(404).send('Page not found')
})

app.listen(PORT, () => {
  console.log(`
OK
Server is running on port ${PORT}
http://localhost:5000
    `)
})
