import Sequelize from 'sequelize'
import sequelize from '../../db/sequelize.js'

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  }
})

export default Cart
