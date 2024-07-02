import Product from '../models/products.js'

export const getProducts = (req, res) => {
  const products = Product.getAllProducts()
  if (!products || !products.length)
    res.status(500).send({ success: false, error: '' })
  res.status(200).send({
    success: true,
    data: products
  })
}

export const postAddProduct = (req, res) => {
  const { title, imageUrl, description, price } = req.body

  const product = new Product(title, description, imageUrl, price)
  product.save()

  res.status(200).send({
    success: true,
    data: product
  })
}
