import Product from '../model/shop/Product.js'
import { responseSuccess, responseFail } from '../utils/response.js'

const getAllProducts = async (_, res) => {
  const products = await Product.fetchAll()
  return responseSuccess(res, products)
}

const getProductDetail = async (req, res) => {
  const { productId } = req.params
  if (!productId) return responseFail(res, 400, 'Not found [productId] param!')

  Product.findById(productId, (success, result) =>
    success ? responseSuccess(res, result) : responseFail(res, 500, result)
  )
}

const postAddProduct = (req, res) => {
  const { title, description, imageUrl, price } = req.body
  if (!title || !description || !imageUrl || !price)
    return responseFail(res, 400, 'Invalid Input')

  const product = new Product(title, description, imageUrl, +price)
  product.save((success, result) => {
    if (success) responseSuccess(res, result)
    else responseFail(res, 500, result)
  })
}

export default {
  getProductDetail,
  getAllProducts,
  postAddProduct
}
