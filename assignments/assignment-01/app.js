import express from 'express'
import dataPath from './data/index.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

console.log(dataPath)

app.use((req, res) => {
  res.send('404 Page not found')
})

app.listen(5000, () => {
  console.log('server is running on port 5000')
})
