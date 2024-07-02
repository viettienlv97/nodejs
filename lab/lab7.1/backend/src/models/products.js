import { join as pathJoin } from 'path'
import dataPath from '../data/index.js'
import { readFileSync, writeFileSync } from 'fs'

export default class Product {
  constructor(title, description, imageUrl, price) {
    this.title = title
    this.description = description
    this.imageUrl = imageUrl
    this.price = price
  }

  async save() {
    const products = readFromFile()
    products.push(this)
    writeFileSync(productPath, JSON.stringify(products))
  }

  static getAllProducts() {
    const products = readFromFile()
    return products
  }
}

const readFromFile = () => {
  return JSON.parse(readFileSync(productPath, { encoding: 'utf-8' }))
}

const productPath = pathJoin(dataPath, 'products.json')
