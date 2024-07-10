import Product from '../model/Product.js'

const getEditProduct = (req, res) => {
  const { isEdit } = req.query
  const { productId } = req.params
  if (!isEdit || !productId) {
    res.status(404).send({
      success: false,
      error: 'Not allow'
    })
  } else {
    Product.findByPk(productId)
      .then((result) => {
        res.status(200).send({ success: true, data: result })
      })
      .catch((err) => {
        return res.status(404).send({
          success: false,
          err
        })
      })
  }
}

const postEditProduct = (req, res) => {
  const { id, title, description, imageUrl, price } = req.body
  Product.update(
    { title, description, imageUrl, price: +price },
    { where: { id } }
  )
    .then(() => {
      return res.status(200).send({
        success: true,
        data: { title, description, price }
      })
    })
    .catch((err) => {
      return res.status(500).send({
        success: false,
        err
      })
    })
}

const deleteProduct = (req, res) => {
  const { productId } = req.params
  console.log(productId)
  if (!productId)
    return res.status(400).send({
      success: false,
      error: 'Not found [productId] param'
    })

  Product.destroy({ where: { id: productId } })
    .then(() =>
      res.status(200).send({
        success: true,
        message: 'Delete successful!'
      })
    )
    .catch((err) =>
      res.status(500).send({
        success: false,
        error: err
      })
    )
}

export default { getEditProduct, postEditProduct, deleteProduct }
