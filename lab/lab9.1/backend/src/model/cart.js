import path from 'path'
import dataPath from '../data/path.js'
import fs, { writeFileSync } from 'fs'
import Product from './products.js'

class Cart {
  constructor(products, total) {
    this.products = products
    this.total = total
  }

  static findProduct(id) {
    const cart = readFromFile()
    const product = cart.products.find((p) => p.id === id)
    if (product) {
      return product
    }
    return null
  }

  static addToCart({ productId, productQuantity, productPrice }) {
    const cart = readFromFile()
    const total = cart.total

    const productInCart = this.findProduct(productId)

    if (!productInCart) {
      cart.products.push({ id: productId, qty: productQuantity })
    } else {
      cart.products.forEach((p) => {
        if (p.id === productId) {
          p.qty = p.qty + +productQuantity
        }
      })
    }
    cart.total = total + +productPrice

    writeToFile(cart)
    return true
  }

  static getAll() {
    const cartInFile = readFromFile()
    const products = cartInFile.products.map((p) => {
      const product = Product.findProductById(p.id)
      return { ...p, ...product }
    })

    return { products, total: cartInFile.total }
  }

  static clearCart() {
    writeToFile({
      products: [],
      total: 0
    })
  }
}

export default Cart

const readFromFile = () => {
  const buffer = fs.readFileSync(path.join(dataPath, 'cart.json'), {
    encoding: 'utf-8'
  })
  return JSON.parse(buffer)
}

const writeToFile = (cart) => {
  writeFileSync(path.join(dataPath, 'cart.json'), JSON.stringify(cart))
}
