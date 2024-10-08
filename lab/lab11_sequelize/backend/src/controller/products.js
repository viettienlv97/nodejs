import Product from '../model/shop/Product.js'
import { responseSuccess, responseFail } from '../utils/response.js'
import { v4 as uuid } from 'uuid'

const getAllProducts = (_, res) => {
  Product.findAll()
    .then((products) => responseSuccess(res, products))
    .catch((err) => responseFail(res, 500, err))
}

const getProductDetail = (req, res) => {
  const { productId } = req.params
  if (!productId) return responseFail(res, 400, 'Not found [productId] param!')

  Product.findAll({ where: { id: productId } })
    .then(([product]) => responseSuccess(res, product))
    .catch((err) => responseFail(res, 500, err))
}

const postAddProduct = (req, res) => {
  const { title, description, imageUrl, price } = req.body
  if (!title || !description || !imageUrl || !price)
    return responseFail(res, 400, 'Invalid Input')

  Product.create({
    title,
    description,
    imageUrl,
    price: +price,
    id: uuid()
  })
    .then(() => responseSuccess(res, { title, description, price }))
    .catch((err) => responseFail(res, 500, err))
}

export default {
  getProductDetail,
  getAllProducts,
  postAddProduct
}
