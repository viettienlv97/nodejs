import Sequelize from 'sequelize'
import sequelize from '../../db/sequelize.js'

const User = sequelize.define('user', {
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

export default User
