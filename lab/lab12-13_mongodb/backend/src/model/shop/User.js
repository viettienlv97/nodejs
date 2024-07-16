import getDb from '../../db/mongodb.js'
import { ObjectId } from 'mongodb'

class User {
  constructor(_id, username, email, cart) {
    this._id = _id
    this.username = username
    this.email = email
    this.cart = cart // {items: []}
  }

  save() {
    const collection = getDb().collection('users')

    return collection.insertOne(this)
  }

  static findById(userId) {
    const collection = getDb().collection('users')
    const objectId = new ObjectId(userId)

    return collection.findOne({ _id: objectId })
  }

  addToCart(product, callback) {
    const collection = getDb().collection('users')
    const objectId = new ObjectId(this._id)

    const productId = new ObjectId(product._id)

    const productInCartIndex = this.cart.items.findIndex((p) => {
      const pId = new ObjectId(p._id)
      return productId.equals(pId)
    })
    if (productInCartIndex === -1) {
      this.cart.items.push({ _id: product._id, quantity: 1 })
    } else {
      this.cart.items[productInCartIndex].quantity += 1
    }

    collection
      .updateOne({ _id: objectId }, { $set: { cart: this.cart } })
      .then((result) => callback(true, result))
      .catch((err) => callback(false, err))
  }

  getCartItems(callback) {
    // const userCollection = getDb().collection('users')
    const productCollection = getDb().collection('products')
    console.log(this.cart)
    const productIds = this.cart.items.map(
      (product) => new ObjectId(product._id)
    )

    productCollection
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        const mapProducts = products.map((p) => {
          const productId = new ObjectId(p._id)
          const quantity = this.cart.items.find((i) =>
            productId.equals(new ObjectId(i._id))
          ).quantity
          return {
            ...p,
            quantity
          }
        })

        callback(true, mapProducts)
      })
      .catch((err) => callback(false, err))
  }

  deleteCart() {
    const userCollection = getDb().collection('users')
    return userCollection.updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: { items: [] } } }
    )
  }
}

export default User
