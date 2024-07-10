import Product from '../model/products.js'

const getEditProduct = (req, res) => {
  const { isEdit } = req.query
  const { productId } = req.params
  if (!isEdit || !productId) {
    res.status(404).send({
      success: false,
      error: 'Not allow'
    })
  } else {
    Product.findById(productId, (product) => {
      if (!product) {
        res.status(404).send({
          success: false,
          error: 'No product'
        })
      } else {
        res.status(200).send({
          success: true,
          data: product
        })
      }
    })
  }
}

const postEditProduct = (req, res) => {
  const { id, title, description, imageUrl, price } = req.body

  const newProduct = new Product({ id, title, description, imageUrl, price })
  newProduct.saveEdit((success, err) => {
    if (success) {
      return res.status(200).send({
        success,
        data: { title, description, price, imageUrl }
      })
    }

    return res.status(500).send({
      success,
      err
    })
  })
}

export default { getEditProduct, postEditProduct }
