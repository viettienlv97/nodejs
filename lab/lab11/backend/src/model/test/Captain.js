import Sequelize from 'sequelize'
import sequelize from '../../db/sequelize.js'
const Captain = sequelize.define('Captain', {
  id: {
    type: Sequelize.STRING(36),
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

export default Captain
