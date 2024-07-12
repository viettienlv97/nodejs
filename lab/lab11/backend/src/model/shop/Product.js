import Sequelize from 'sequelize'
import sequelize from '../../db/sequelize.js'

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
})

export default Product
