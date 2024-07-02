import express from 'express'
import cors from 'cors'
import Product from './models/products.js'
import productRoutes from './routes/products.js'

Product.getAllProducts()
//console.log(dirname(fileURLToPath(import.meta.url)))
const app = express()
const PORT = 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use('/api', productRoutes)

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(PORT, () => {
  console.log(`
Server is running on port ${PORT}
http://localhost:${PORT}
    `)
})
