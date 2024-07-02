import express from 'express'

const app = express()
const port = 3000

app.use('/users', (req, res, next) => {
  res.send('<p>The Middleware that handles just /users</p>')
})
app.use('/', (req, res, next) => {
  res.send('<p>The Middleware that handles just /</p>')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
