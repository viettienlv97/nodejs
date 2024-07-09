import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import moviesRoutes from './routes/movies.js'
import genresRoutes from './routes/genres.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/movies', moviesRoutes)
app.use('/api/genres', genresRoutes)

app.use((_, res) => {
  res.status(404).send({
    message: 'Route not found'
  })
})

app.listen(PORT, () => {
  console.log('server is running on port ' + PORT)
  console.log(`http://localhost:${PORT}`)
})
