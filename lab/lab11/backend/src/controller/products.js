import Product from '../model/shop/Product.js'
import { responseSuccess, responseFail } from '../utils/response.js'
import { v4 as uuid } from 'uuid'

const getAllProducts = async (req, res) => {
  const products = await Product.findAll()

  return responseSuccess(res, products)
}

const getProductDetail = (req, res) => {
  const { productId } = req.params
  console.log('productId', productId)
  if (!productId) return responseFail(res, 400, 'Not found [productId] param!')

  Product.findAll({ where: { id: productId } })
    .then(([product]) => responseSuccess(res, product))
    .catch((err) => responseFail(res, 500))
}

const postAddProduct = (req, res) => {
  const { title, description, imageUrl, price } = req.body
  if (!title || !description || !imageUrl || !price)
    responseFail(res, 400, 'Invalid Input')

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
