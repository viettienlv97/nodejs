import Sequelize from 'sequelize'
import sequelize from '../../db/sequelize.js'
import Captain from './Captain.js'

const Ship = sequelize.define('Ship', {
  id: {
    type: Sequelize.STRING(36),
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  captainId: {
    type: Sequelize.STRING(36),
    references: {
      model: Captain,
      key: 'id'
    }
  }
})

export default Ship
