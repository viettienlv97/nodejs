import { responseSuccess, responseFail } from '../utils/response.js'
import User from '../model/shop/User.js'

const postAddToCart = async (req, res) => {
  const { productId } = req.body
  if (!productId) return responseFail(res, 400, 'Not found [productId] param')

  const productIndex = req.user.cart.items.findIndex(
    (item) => item.productId.toString() === productId
  )

  if (productIndex === -1) {
    req.user.cart.items.push({ productId, quantity: 1 })
  } else {
    req.user.cart.items[productIndex].quantity += 1
  }
  req.user
    .updateOne({ $set: { cart: req.user.cart } })
    .then((result) => {
      return responseSuccess(res, result)
    })
    .catch((err) => responseFail(res, err))
}

const getCart = async (req, res) => {
  if (req.user?.cart?.items.length === 0)
    return responseSuccess(res, { products: [], total: 0 })

  User.findOne()
    .populate('cart.items.productId')
    .then((result) => {
      const products = result.cart.items.map((item) => {
        return {
          _id: item._id,
          quantity: item.quantity,
          title: item.productId.title,
          price: item.productId.price,
          imageUrl: item.productId.imageUrl
        }
      })

      responseSuccess(res, { products })
    })
    .catch((err) => responseFail(res, 500, err))
}

const deleteCartItem = async (req, res) => {
  const { productId } = req.body
  if (!productId) return responseFail(res, 400, 'Not found [productId] param')

  const updateItemsInCart = req.user.cart.items.filter(
    (i) => i._id.toString() !== productId
  )

  req.user
    .updateOne({ $set: { cart: { items: updateItemsInCart } } })
    .then((result) => responseSuccess(res, result))
    .catch((err) => responseFail(res, 500, err))
}

export default {
  postAddToCart,
  getCart,
  deleteCartItem
}
