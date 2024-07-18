import { Schema, model } from 'mongoose'

const hotelSchema = new Schema({
  address: String,
  cheapestPrice: Number,
  city: String,
  desc: String,
  distance: String,
  featured: Boolean,
  name: String,
  photos: [String],
  rooms: [{ type: Schema.ObjectId, ref: 'Room' }],
  title: String,
  type: String,
  rating: Number
})

const Hotel = model('Hotel', hotelSchema)

export default Hotel
