import { Schema, model } from 'mongoose'

const userShema = new Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          require: true
        },
        quantity: {
          type: Number,
          require: true
        }
      }
    ]
  }
})

const User = model('User', userShema)
export default User
