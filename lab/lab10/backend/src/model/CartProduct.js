import Sequelize from 'sequelize'
import sequelize from '../db/sequelize.js'

const CartProduct = sequelize.define('cart_product', {
  id: {
    type: Sequelize.STRING(36),
    allowNull: false,
    primaryKey: true
  },
  cartId: {
    type: Sequelize.STRING(36),
    allowNull: false
  },
  productId: {
    type: Sequelize.STRING(36),
    allowNull: false
  },
  productQty: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

export default CartProduct
