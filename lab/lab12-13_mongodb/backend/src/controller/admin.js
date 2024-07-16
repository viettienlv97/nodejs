import Product from '../model/shop/Product.js'
import { responseSuccess, responseFail } from '../utils/response.js'

const getEditProduct = (req, res) => {
  const { isEdit } = req.query
  const { productId } = req.params

  if (!isEdit || !productId) responseFail(res, 404, 'Not allow')
  else {
    Product.findById(productId, (success, result) =>
      success ? responseSuccess(res, result) : responseFail(res, 500, result)
    )
  }
}

const postEditProduct = (req, res) => {
  const { id, title, description, imageUrl, price } = req.body

  Product.update(
    id,
    { title, description, imageUrl, price },
    (success, result) =>
      success ? responseSuccess(res, result) : responseFail(res, 500, result)
  )
}

const deleteProduct = (req, res) => {
  const { productId } = req.params

  if (!productId) return responseFail(res, 400, 'Not found [productId] param')

  Product.delete(productId, (success, result) =>
    success ? responseSuccess(res, result) : responseFail(res, 500, result)
  )

  // Product.destroy({ where: { id: productId } })
  //   .then(() => responseSuccess(res, 'Delete successful!'))
  //   .catch((err) => responseFail(res, 500, err))
}

export default { getEditProduct, postEditProduct, deleteProduct }
