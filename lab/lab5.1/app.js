const express = require('express')
const path = require('path')
const adminRoute = require('./routes/admin')
const shopRoute = require('./routes/shop')

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', shopRoute)
app.use('/admin', adminRoute.router)

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(3000, () => {
  //console.log(__dirname)
  console.log('Server running on port 3000')
})
