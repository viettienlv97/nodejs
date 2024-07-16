import Sequelize from 'sequelize'
import sequelize from '../../db/sequelize.js'

const OrderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

export default OrderItem
