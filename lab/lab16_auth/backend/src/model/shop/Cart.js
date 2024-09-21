import { model, Schema } from 'mongoose'

const cartSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  items: 
})
