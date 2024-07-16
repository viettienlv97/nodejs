import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('lab-10', 'viettien', 'viettien', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log
})

export default sequelize
