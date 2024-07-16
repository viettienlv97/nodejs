import { MongoClient } from 'mongodb'

let _db

export const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://viettienvu97:viettien@all-database.ou6hp0h.mongodb.net/?retryWrites=true&w=majority&appName=all-database'
  )
    .then((result) => {
      console.log('Connected', result)
      _db = result.db('shop')
      callback()
    })
    .catch((err) => console.log(err))
}

const getDb = () => {
  if (_db) return _db
  throw 'No database found'
}

export default getDb
