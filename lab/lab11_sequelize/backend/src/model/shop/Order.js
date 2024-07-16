import Sequelize from 'sequelize'
import sequelize from '../../db/sequelize.js'

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    allowNull: false
  }
})
export default Order
