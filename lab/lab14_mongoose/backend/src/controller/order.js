import { responseSuccess, responseFail } from '../utils/response.js'
import Order from '../model/shop/Order.js'

const postOrder = async (req, res) => {
  const order = new Order({ userId: req.user._id, items: req.user.cart.items })
  order
    .save()
    .then(() => req.user.updateOne({ $set: { cart: { items: [] } } }))
    .then(() => responseSuccess(res, 'ok'))
    .catch((err) => responseFail(res, 500, err))
}

const getOrders = async (req, res) => {
  Order.find({ userId: req.user._id })
    .populate('items.productId')
    .then((orders) => {
      const ordersData = orders.map((order) => {
        return {
          _id: order._id,
          products: order.items.map((item) => {
            return {
              _id: item._id,
              quantity: item.quantity,
              title: item.productId.title,
              description: item.productId.description,
              price: item.productId.price,
              imageUrl: item.productId.imageUrl
            }
          })
        }
      })

      responseSuccess(res, ordersData)
    })
}

export default {
  postOrder,
  getOrders
}
