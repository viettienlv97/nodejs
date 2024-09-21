import Product from '../model/shop/Product.js'
import { responseSuccess, responseFail } from '../utils/response.js'

const getAllProducts = async (_, res) => {
  Product.find()
    .then((result) => responseSuccess(res, result))
    .catch((err) => responseFail(res, 500, err))
}

const getProductDetail = async (req, res) => {
  const { productId } = req.params
  if (!productId) return responseFail(res, 400, 'Not found [productId] param!')

  Product.findOne({ _id: productId })
    .then((result) => responseSuccess(res, result))
    .catch((err) => responseFail(res, 500, err))
}

const postAddProduct = (req, res) => {
  const { title, description, imageUrl, price } = req.body
  if (!title || !description || !imageUrl || !price)
    return responseFail(res, 400, 'Invalid Input')

  const product = new Product({ title, description, price: +price, imageUrl })
  product
    .save()
    .then((result) => responseSuccess(res, result))
    .catch((err) => responseFail(res, 500, err))
}

export default {
  getProductDetail,
  getAllProducts,
  postAddProduct
}
