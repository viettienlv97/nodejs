const http = require('http')

const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log('This always run - Use as middleware!');
  next()
})

app.use((req, res, next) => {
  console.log('In another middleware!');
  res.send("hello")
})

app.listen(3000)