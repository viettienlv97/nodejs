import mysql from 'mysql2'

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'viettien',
  password: 'viettien',
  database: 'lab-9.1'
})

export default pool.promise()
