import express, { urlencoded, json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

//router
// client
import userRoute from './router/user.route.js'
import hotelRoute from './router/hotel.route.js'
import paymentRoute from './router/payment.route.js'
import transactionRoute from './router/transaction.route.js'
import roomRouter from './router/room.route.js'
// admin
import authRoute from './router/admin/auth.router.js'
import adminTransRoute from './router/admin/transaction.route.js'
import adminHotelsRoute from './router/admin/hotel.route.js'
import adminRoomsRoute from './router/admin/room.route.js'

// model
import Room from './model/Room.js'
import Hotel from './model/Hotel.js'
import User from './model/User.js'
import PaymentMethod from './model/PaymentMethod.js'
import Transaction from './model/Transaction.js'

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
app.use('/api/payment', paymentRoute)
app.use('/api/transaction', transactionRoute)
app.use('/api/room', roomRouter)
app.use('/api/admin', authRoute)
app.use('/api/admin/transactions', adminTransRoute)
app.use('/api/admin/hotels', adminHotelsRoute)
app.use('/api/admin/rooms', adminRoomsRoute)

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
      // Transaction.updateMany({ $set: { createdAt: new Date() } }).then(
      //   (result) => console.log(result)
      // )
    })
  })
  .catch((err) => console.log(err))
