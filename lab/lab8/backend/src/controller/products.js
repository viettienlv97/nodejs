import Product from '../model/products.js'
import { v4 } from 'uuid'

export const getAllProducts = (req, res) => {
  const products = Product.getAllProducts()
  res.status(200).send({
    success: true,
    data: products
  })
}

export const postAddProduct = (req, res) => {
  const { title, description, imageUrl, price } = req.body
  if (!title || !description || !imageUrl || !price) {
    res.status(404).send({
      success: false,
      error: 'Invalid input'
    })
  }

  const id = v4()
  console.log(id)
  const newProd = new Product({ id, title, description, price, imageUrl })
  newProd.save()

  res.status(200).send({
    success: true,
    data: { title, price }
  })
}
