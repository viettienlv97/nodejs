import { ObjectId } from 'mongodb'
import getDb from '../../db/mongodb.js'

class Product {
  constructor(title, description, imageUrl, price) {
    this.title = title
    this.description = description
    this.price = price
    this.imageUrl = imageUrl
  }

  save(callback) {
    const db = getDb()
    db.collection('products')
      .insertOne(this)
      .then((result) => callback(true, result))
      .catch((err) => callback(false, err))
  }

  static async fetchAll() {
    const collection = getDb().collection('products')
    const products = await collection.find().toArray()
    return products
  }

  static findById(_id, callback) {
    const objectId = new ObjectId(_id)
    const collection = getDb().collection('products')

    collection
      .findOne({ _id: objectId })
      .then((product) => callback(true, product))
      .catch((err) => callback(false, err))
  }

  static update(productId, updateProps, callback) {
    const objectId = new ObjectId(productId)
    const collection = getDb().collection('products')

    collection
      .updateOne({ _id: objectId }, { $set: { ...updateProps } })
      .then((result) => callback(true, result))
      .catch((err) => callback(false, err))
  }

  static delete(productId, callback) {
    const objectId = new ObjectId(productId)
    const collection = getDb().collection('products')

    collection
      .deleteOne({ _id: objectId })
      .then((result) => callback(true, result))
      .catch((err) => callback(false, err))
  }
}

export default Product
