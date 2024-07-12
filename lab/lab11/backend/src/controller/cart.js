import Cart from '../model/shop/Cart.js'
import Product from '../model/shop/Product.js'
import { responseSuccess, responseFail } from '../utils/response.js'
import { v4 as uuid } from 'uuid'

export const postAddToCart = async (req, res) => {
  const { productId } = req.body
  if (!productId) return responseFail(res, 400, 'Not found [productId] param')

  try {
    let cart = await req.user.getCart()

    if (!cart) {
      cart = await req.user.createCart({ id: uuid() })
    }
    const products = await cart.getProducts({ where: { id: productId } })
    let product
    if (products.length > 0) {
      product = products[0]
    }
    let newQuantity = 1
    if (product) {
      newQuantity += product.cartItem.quantity
    } else {
      product = await Product.findByPk(productId)
    }

    cart
      .addProduct(product, { through: { quantity: newQuantity, id: uuid() } })
      .then(() => responseSuccess(res, 'added to cart'))
  } catch (error) {
    console.log('error: ==>', error)
    responseFail(res, 500, error)
  }
}
export const getCart = async (_, res) => {
  const cart = await Cart.findOne()
  let products = await cart.getProducts()

  return responseSuccess(res, { products, total: 0 })
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
