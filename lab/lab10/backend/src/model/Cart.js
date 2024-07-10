import Sequelize from 'sequelize'
import sequelize from '../db/sequelize.js'

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  total: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0
  }
})

export default Cart
