const express = require('express')
const adminRoute = require('./admin')
const router = express.Router()

const products = adminRoute.products

router.get('/', (req, res, next) => {
  console.log(products)
  res.render('index', { prods: products, docTitle: 'Shop', path: '/' })
})

module.exports = router
