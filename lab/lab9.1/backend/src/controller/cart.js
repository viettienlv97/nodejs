import Cart from '../model/cart.js'
import Product from '../model/products.js'

export const postAddToCart = (req, res) => {
  const { productId } = req.body
  if (!productId) {
    res.status(404).send({
      success: false,
      error: 'Invalid input'
    })
  } else {
    const product = Product.findProductById(productId)
    if (product) {
      const result = Cart.addToCart({
        productId: product.id,
        productPrice: product.price,
        productQuantity: 1
      })
      if (result) {
        res.status(200).send({
          success: true
        })
      } else {
        res.status(500).send({
          success: false,
          error: 'Server error'
        })
      }
    }
  }
}
export const getCart = (_, res) => {
  const cart = Cart.getAll()
  if (cart) {
    res.status(200).send({
      success: true,
      data: cart
    })
  }
}
