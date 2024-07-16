import Product from '../model/shop/Product.js'
import { responseSuccess, responseFail } from '../utils/response.js'
import { v4 as uuid } from 'uuid'
import User from '../model/shop/User.js'
import products from './products.js'

export const postAddToCart = async (req, res) => {
  const { productId } = req.body
  if (!productId) return responseFail(res, 400, 'Not found [productId] param')

  Product.findById(productId, (success, result) => {
    if (!success) {
      console.log(result)
      return responseFail(res, 404, 'Product not found')
    }

    const { _id, price } = result

    req.user.addToCart({ _id, price }, (success, result) => {
      if (success) responseSuccess(res, result)
      else responseFail(res, 500, err)
    })
  })
}

export const getCart = async (req, res) => {
  req.user.getCartItems((success, result) =>
    responseSuccess(res, { products: result, total: 0 })
  )

  // const cart = await Cart.findOne()
  // const products = await cart.getProducts()

  // return responseSuccess(res, { products, total: 0 })
}

export const deleteCartItem = async (req, res) => {
  const { productId } = req.body
  if (!productId) return responseFail(res, 400, 'Not found [productId] param')

  const cart = await req.user.getCart()
  cart
    .getProducts({ where: { id: productId } })
    .then((products) => products[0])
    .then((product) => product.cartItem.destroy())
    .then((result) => responseSuccess(res, result))
    .catch((err) => responseFail(res, 500, err))
}
