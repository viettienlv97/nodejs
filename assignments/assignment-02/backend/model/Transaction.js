import { Schema, model } from 'mongoose'

const transSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  hotel: {
    type: Schema.ObjectId,
    ref: 'Hotel'
  },
  rooms: [
    {
      type: Schema.ObjectId,
      ref: 'Room'
    }
  ],
  dateStart: String,
  dateEnd: String,
  price: String,
  payment: String,
  status: String
})

const Transaction = model('Transaction', transSchema)

export default Transaction
