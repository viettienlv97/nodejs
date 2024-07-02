import express from 'express'
import cors from 'cors'
import userRoutes from './routes/users.js'

const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api', userRoutes)

// Middleware
// app.use((err, req, res, next) => {
//   console.log(err.stack)
//   res.status(500).send('<h3>Something broke!</h3>')
// })

// 404
// app.use((req, res, next) => {
//   res.status(404).send('<h3>Page Not Found!</h3>')
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}, http://localhost:${port}`)
})
