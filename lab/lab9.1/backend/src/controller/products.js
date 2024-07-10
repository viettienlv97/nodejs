import Product from '../model/products.js'
import { v4 } from 'uuid'
// import db from '../db/mysql.js'

export const getAllProducts = async (req, res) => {
  const products = await Product.fetchAll()

  res.status(200).send({
    success: true,
    data: products
  })
}

export const postAddProduct = (req, res) => {
  const { title, description, imageUrl, price } = req.body
  if (!title || !description || !imageUrl || !price) {
    res.status(400).send({
      success: false,
      error: 'Invalid input'
    })
  }
  const newId = v4()

  const newProd = new Product({
    id: newId,
    title,
    description,
    price,
    imageUrl
  })
  newProd.save((success, err) => {
    if (success) {
      return res.status(200).send({
        success: true,
        data: { title, price }
      })
    }
    return res.status(500).send({
      success: false,
      err
    })
  })
}
