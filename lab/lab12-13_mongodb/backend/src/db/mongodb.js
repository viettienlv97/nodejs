import { MongoClient } from 'mongodb'

let _db

export const mongoConnect = (callback) => {
  console.log(process.env)
  MongoClient.connect(process.env.MONGO_DB)
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
