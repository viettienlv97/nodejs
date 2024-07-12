import sequelize from './sequelize.js'

import Cart from '../model/shop/Cart.js'
import User from '../model/shop/User.js'
import Product from '../model/shop/Product.js'
import CartItem from '../model/shop/CartItem.js'
import Order from '../model/shop/Order.js'
import OrderItem from '../model/shop/OrderItem.js'
import { v4 } from 'uuid'

User.hasOne(Cart)
User.hasMany(Order)
Cart.belongsTo(User)
Order.belongsTo(User)
Product.belongsToMany(Cart, { through: CartItem })
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Order, { through: OrderItem })
Order.belongsToMany(Product, { through: OrderItem })

const syncDataBase = (force, callback) => {
  sequelize
    .sync({ force })
    .then(() => {
      return User.findOrCreate({
        where: { name: 'Viet Tien' },
        defaults: { name: 'Viet Tien', id: v4() }
      })
    })
    .then(([user, created]) => {
      console.log('created', created)
      return callback()
    })
    .catch((err) => console.log(err))
}

export default syncDataBase
