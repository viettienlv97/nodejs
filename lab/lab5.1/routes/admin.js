const express = require('express')
const router = express.Router()

const products = []

router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    docTitle: 'Add Product',
    path: '/admin/add-product'
  })
})

router.post('/add-product', (req, res, next) => {
  console.log(req.body)
  products.push(req.body.product)
  res.redirect('/')
})

exports.router = router
exports.products = products
