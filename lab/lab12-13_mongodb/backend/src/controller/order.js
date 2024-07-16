import { v4 } from 'uuid'
import { responseSuccess, responseFail } from '../utils/response.js'
import Order from '../model/shop/Order.js'

export const postOrder = async (req, res) => {
  req.user._id
  const order = new Order(null, req.user._id, req.user.cart.items)
  order
    .save()
    .then((result) => {
      req.user.deleteCart().then((deleteCartResult) =>
        responseSuccess(res, {
          result,
          deleteCartResult
        })
      )
    })
    .catch((err) => responseFail(res, 400, err))
  // const cart = await req.user.getCart()
  // const products = await cart.getProducts()
  // const order = await req.user.createOrder({ id: v4() })
  // order
  //   .addProducts(
  //     products.map((product) => {
  //       product.orderItem = { id: v4(), quantity: product.cartItem.quantity }
  //       return product
  //     })
  //   )
  //   .then(() => cart.setProducts(null))
  //   .then((result) => responseSuccess(res, 'ok'))
  //   .catch((err) => responseFail(res, 500, err))
}

export const getOrders = async (req, res) => {
  Order.fetchAll((success, result) =>
    success ? responseSuccess(res, result) : responseFail(res, 500, result)
  )
  // const orders = await req.user.getOrders({ include: ['products'] })
  // const products = await orders
  // responseSuccess(res, orders)
}
