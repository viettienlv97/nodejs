import fs from 'fs'
import dataPath from '../data/path.js'
import path from 'path'
import Cart from './cart.js'

class Product {
  constructor({ id, title, description, price, imageUrl }) {
    this.id = id
    this.title = title
    this.description = description
    this.price = price
    this.imageUrl = imageUrl
  }

  save() {
    const products = readFromFile()
    products.push(this)
    writeToFile(products)
  }

  findProductById() {
    const products = readFromFile()
    const product = products.find((p) => p.id === this.id)
    if (product) return product
    return null
  }

  static findProductById(id, callback) {
    const products = readFromFile()
    const product = products.find((p) => p.id === id)
    callback(product)
  }

  static getAllProducts() {
    return readFromFile()
  }

  addToCart(quantity) {
    Cart.addToCart(this.id, quantity, this.price)
  }

  saveEdit() {
    const products = readFromFile()
    const productIndex = products.findIndex((p) => p.id === this.id)
    products[productIndex] = this
    writeToFile(products)
  }
}

export default Product

const readFromFile = () =>
  JSON.parse(
    fs.readFileSync(path.join(dataPath, 'products.json'), {
      encoding: 'utf-8'
    })
  )

const writeToFile = (data) => {
  fs.writeFileSync(path.join(dataPath, 'products.json'), JSON.stringify(data))
}
