import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  imageUrl: {
    type: String,
    require: true
  }
})

const Product = mongoose.model('Product', productSchema)

export default Product
