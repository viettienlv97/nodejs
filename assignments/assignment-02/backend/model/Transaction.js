import { Schema, model } from 'mongoose'

const transSchema = new Schema({
  creater: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  info: {
    fullName: String,
    email: String,
    phoneNumber: String,
    idCard: String
  },
  hotel: {
    type: Schema.ObjectId,
    ref: 'Hotel'
  },
  rooms: [
    {
      roomId: {
        type: Schema.ObjectId,
        ref: 'Room'
      },
      price: Number,
      roomNumbers: [Number]
    }
  ],
  startDate: Date,
  endDate: Date,
  createdAt: Date,
  price: Number,
  payment: String,
  status: String
})

const Transaction = model('Transaction', transSchema)

export default Transaction
