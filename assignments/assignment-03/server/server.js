import { default as express, urlencoded, json } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import mongoose from 'mongoose'

import userRoute from './routers/user.route.js'

config()
const app = express()
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('./public'))

app.use((error, _, res) => {
  console.error('Server error', error)
  res.status(500).send('Server error!')
})

app.use('/api/auth', userRoute)

app.use((_, res) => {
  res.status(404).send('Page not found')
})

mongoose
  .connect(process.env.MONGODB_URI, { dbName: 'assignment-03' })
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log(`
Server is running
http://localhost:${process.env.PORT}      
`)
    })
  })
  .catch(err => console.error(err))