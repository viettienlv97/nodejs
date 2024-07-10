import Product from '../model/Product.js'
import { v4 as uuid } from 'uuid'

const getAllProducts = async (req, res) => {
  const products = await Product.findAll()

  res.status(200).send({
    success: true,
    data: products
  })
}

const getProductDetail = (req, res) => {
  const { productId } = req.params
  console.log('productId', productId)
  if (!productId)
    return res.status(400).send({
      success: false,
      error: 'Not found [productId] param!'
    })

  Product.findAll({ where: { id: productId } })
    .then(([product]) =>
      res.status(200).send({
        success: true,
        data: product
      })
    )
    .catch((err) => res.status(500).send({ success: false, err }))
}

const postAddProduct = (req, res) => {
  const { title, description, imageUrl, price } = req.body
  if (!title || !description || !imageUrl || !price) {
    res.status(400).send({
      success: false,
      error: 'Invalid input'
    })
  }
  const newId = uuid()
  Product.create({
    title,
    description,
    imageUrl,
    price: +price,
    id: newId
  })
    .then(() => {
      return res.status(200).send({
        success: true,
        data: { title, description, price: +price }
      })
    })
    .catch((err) => {
      return res.status(500).send({
        success: false,
        err
      })
    })
}

export default {
  getProductDetail,
  getAllProducts,
  postAddProduct
}
