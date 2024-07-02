import { Response, Request } from 'express'
import { Product } from '../models/products'

export const getAddProduct = (_: Request, res: Response) => {
  res.render('add-product', { docTitle: 'Add product' })
}

export const postAddProduct = (req: Request, res: Response) => {
  if (req.body.product) {
    const product = new Product(req.body.product)
    product.save()
    res.redirect('/')
  } else {
    res.status(404).redirect('/')
  }
}

export const getProducts = (_: Request, res: Response) => {
  const products = Product.getAll()
  console.log('products', products)

  res.render('shop', {
    products,
    docTitle: 'Shop',
    hasProduct: products.length > 0
  })
}
