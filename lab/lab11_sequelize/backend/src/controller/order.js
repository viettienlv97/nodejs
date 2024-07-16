import { v4 } from 'uuid'
import { responseSuccess, responseFail } from '../utils/response.js'

export const postOrder = async (req, res) => {
  const cart = await req.user.getCart()
  const products = await cart.getProducts()
  const order = await req.user.createOrder({ id: v4() })
  order
    .addProducts(
      products.map((product) => {
        product.orderItem = { id: v4(), quantity: product.cartItem.quantity }
        return product
      })
    )
    .then(() => cart.setProducts(null))
    .then((result) => responseSuccess(res, 'ok'))
    .catch((err) => responseFail(res, 500, err))
}

export const getOrders = async (req, res) => {
  const orders = await req.user.getOrders({ include: ['products'] })
  const products = await orders
  responseSuccess(res, orders)
}
