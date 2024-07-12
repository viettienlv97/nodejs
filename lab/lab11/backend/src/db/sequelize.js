import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('lab-11', 'viettien', 'viettien', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log
})

export default sequelize
