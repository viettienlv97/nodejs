import Product from '../model/shop/Product.js'
import { responseSuccess, responseFail } from '../utils/response.js'

const getEditProduct = (req, res) => {
  const { isEdit } = req.query
  const { productId } = req.params

  if (!isEdit || !productId) responseFail(res, 404, 'Not allow')
  else {
    Product.findById({ _id: productId })
      .then((result) => responseSuccess(res, result))
      .catch((err) => responseFail(res, 500, err))
  }
}

const postEditProduct = (req, res) => {
  const { id, title, description, imageUrl, price } = req.body

  Product.updateOne(
    { _id: id },
    { $set: { title, description, imageUrl, price } }
  )
    .then((result) => responseSuccess(res, result))
    .catch((err) => responseFail(res, 500, err))
}

const deleteProduct = (req, res) => {
  const { productId } = req.params

  if (!productId) return responseFail(res, 400, 'Not found [productId] param')

  Product.deleteOne({ _id: productId })
    .then((result) => responseSuccess(res, result))
    .catch((err) => responseFail(res, 500, err))
}

export default { getEditProduct, postEditProduct, deleteProduct }
