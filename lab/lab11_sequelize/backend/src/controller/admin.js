import Product from '../model/shop/Product.js'
import { responseSuccess, responseFail } from '../utils/response.js'

const getEditProduct = (req, res) => {
  const { isEdit } = req.query
  const { productId } = req.params

  if (!isEdit || !productId) responseFail(res, 404, 'Not allow')
  else {
    Product.findByPk(productId)
      .then((result) => responseSuccess(res, result))
      .catch((err) => responseFail(res, 404, err))
  }
}

const postEditProduct = (req, res) => {
  const { id, title, description, imageUrl, price } = req.body

  Product.update(
    { title, description, imageUrl, price: +price },
    { where: { id } }
  )
    .then(() => responseSuccess(res, { title, description, price }))
    .catch((err) => responseFail(res, 500, err))
}

const deleteProduct = (req, res) => {
  const { productId } = req.params

  if (!productId) return responseFail(res, 400, 'Not found [productId] param')

  Product.destroy({ where: { id: productId } })
    .then(() => responseSuccess(res, 'Delete successful!'))
    .catch((err) => responseFail(res, 500, err))
}

export default { getEditProduct, postEditProduct, deleteProduct }
