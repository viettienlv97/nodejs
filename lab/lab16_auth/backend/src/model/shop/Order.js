import { model, Schema } from 'mongoose'

const orderSchema = new Schema({
  userId: {
    type: String,
    require: true
  },
  items: [
    {
      productId: {
        type: Schema.ObjectId,
        ref: 'Product',
        require: true
      },
      quantity: {
        type: Number,
        require: true
      }
    }
  ]
})

const Order = model('Order', orderSchema)

export default Order
