import Sequelize from 'sequelize'
import sequelize from '../../db/sequelize.js'

const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

export default CartItem
