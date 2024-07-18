import express, { urlencoded, json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

//router
import userRoute from './router/user.route.js'
import hotelRoute from './router/hotel.route.js'
import Room from './model/Room.js'
import Hotel from './model/Hotel.js'
import User from './model/User.js'

dotenv.config()
const app = express()
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('./public'))

app.use((error, req, res, next) => {
  console.error('Something wrong: ' + error)
  res.status(500).send('Server has error!')
})

app.use('/api/auth', userRoute)
app.use('/api/hotel', hotelRoute)

app.use((_, res, next) => {
  res.status(404).send('Page not found')
})

mongoose
  .connect(process.env.MONGODB_URI, { dbName: 'assignment_02' })
  .then((result) => {
    // console.log(result)
    app.listen(process.env.PORT, () => {
      console.log(`
Server is running
http://localhost:${process.env.PORT}
`)
    })
  })
  .catch((err) => console.log(err))
