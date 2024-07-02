import fs from 'fs'
import path from 'path'
import rootDir from '../utils/path'

const getProductsFromFile = async () => {
  const p = path.join(rootDir, 'data', 'products.json')
  const fileContent = fs.readFileSync(p, {
    encoding: 'utf-8'
  })

  return JSON.parse(fileContent)
}

export class Product {
  name: string

  constructor(name: string) {
    this.name = name
  }

  save() {
    const p = path.join(rootDir, 'data', 'products.json')

    fs.readFile(p, 'utf-8', (err, fileContent) => {
      let products: Array<Product> = []
      if (!err) {
        products = JSON.parse(fileContent)
      }
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
      console.log(fileContent)
    })
  }

  static async getAll() {
    const products = await getProductsFromFile()
    return products
  }
}
