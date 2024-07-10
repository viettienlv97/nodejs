import Cart from './cart.js'
import db from '../db/mysql.js'

class Product {
  constructor({ id, title, description, price, imageUrl }) {
    this.id = id
    this.title = title
    this.description = description
    this.price = price
    this.imageUrl = imageUrl
  }

  save(callback) {
    db.execute(
      'INSERT INTO products (id, title, description, imageUrl, price) values (?,?,?,?,?)',
      [this.id, this.title, this.description, this.imageUrl, +this.price]
    )
      .then(() => callback(true))
      .catch((err) => callback(false, err))
  }

  // findProductById() {
  //   const products = readFromFile()
  //   const product = products.find((p) => p.id === this.id)
  //   if (product) return product
  //   return null
  // }

  // static findProductById(id, callback) {
  //   const products = readFromFile()
  //   const product = products.find((p) => p.id === id)
  //   callback(product)
  // }

  static async findById(id, callback) {
    const [products] = await db.execute(
      'SELECT * FROM products where products.id = ?',
      [id]
    )
    callback(products[0])
  }

  // static AlterId() {
  //   db.execute('SELECT id from products').then(([rows]) => {
  //     for (let row of rows) {
  //       const newId = uuid()
  //       db.execute('UPDATE products SET id = ? WHERE id = ?', [
  //         newId,
  //         row.id
  //       ]).then((result) => console.log(result))
  //     }
  //   })
  // }

  // static getAllProducts() {
  //   return readFromFile()
  // }

  static async fetchAll() {
    const [products] = await db.execute('SELECT * FROM products')
    return products
  }

  addToCart(quantity) {
    Cart.addToCart(this.id, quantity, this.price)
  }

  saveEdit(callback) {
    db.execute(
      'UPDATE products SET title = ?, description = ?, imageUrl = ?, price = ? WHERE id = ?',
      [this.title, this.description, this.imageUrl, +this.price, this.id]
    )
      .then(() => callback(true))
      .catch((err) => callback(false, err))
  }
}

export default Product

// const readFromFile = () =>
//   JSON.parse(
//     fs.readFileSync(path.join(dataPath, 'products.json'), {
//       encoding: 'utf-8'
//     })
//   )

// const writeToFile = (data) => {
//   fs.writeFileSync(path.join(dataPath, 'products.json'), JSON.stringify(data))
// }
