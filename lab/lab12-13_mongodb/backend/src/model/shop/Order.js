import getDb from '../../db/mongodb.js'
import { ObjectId } from 'mongodb'

class Order {
  constructor(_id, userId, items) {
    this._id = _id
    this.userId = userId
    this.items = items
  }

  save() {
    const orderCollection = getDb().collection('orders')
    return orderCollection.insertOne(this)
  }

  static async fetchAll(callback) {
    const orderCollection = getDb().collection('orders')
    const productCollection = getDb().collection('products')

    orderCollection
      .find()
      .toArray()
      .then((orders) => {
        let productIds = []
        orders.forEach((order) => {
          order.items.forEach((p) => productIds.push(new ObjectId(p._id)))
        })

        console.log('productsId before set', productIds)

        productIds = [...new Set(productIds)]
        productCollection
          .find({ _id: { $in: productIds } })
          .toArray()
          .then((result) => {
            console.log('products', result)
            const mapOrders = orders.map((order) => {
              const products = []
              order.items.forEach((item) => {
                const itemId = new ObjectId(item._id)
                const product = result.find((p) =>
                  itemId.equals(new ObjectId(p._id))
                )
                if (product)
                  products.push({
                    ...item,
                    ...product
                  })
              })

              return {
                ...order,
                products
              }
            })
            callback(true, mapOrders)
          })
      })
      .catch((err) => callback(false, err))

    // orderCollection
    //   .aggregate([
    //     {
    //       $lookup: {
    //         from: 'products',
    //         localField: 'items',
    //         foreignField: '_id',
    //         as: 'items'
    //       }
    //     }
    //   ])
    //   .then((result) => {
    //     console.log('result', result)
    //     callback(true, result)
    //   })
    //   .catch((err) => callback(false, err))
  }
}

export default Order
