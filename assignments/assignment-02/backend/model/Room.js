import { Schema, model } from 'mongoose'

const roomSchema = new Schema({
  desc: String,
  maxPeople: Number,
  price: Number,
  roomNumbers: [Number],
  title: String,
  createdAt: Date,
  updatedAt: Date
})

const Room = model('Room', roomSchema)

export default Room
