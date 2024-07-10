import Cart from '../model/cart.js'
import Product from '../model/Product.js'
import CartProduct from '../model/CartProduct.js'
import { v4 as uuid } from 'uuid'
import { Op } from 'sequelize'

export const postAddToCart = async (req, res) => {
  const { productId } = req.body
  if (!productId) {
    return res.status(404).send({
      success: false,
      error: 'Invalid input'
    })
  } else {
    let productPrice
    try {
      const { price } = await Product.findByPk(productId)
      if (!price) throw new Error('Cannot get Product.price')
      productPrice = price

      const [cart, created] = await Cart.findOrCreate({
        where: {}, // TODO userId
        defaults: {
          id: uuid(),
          total: productPrice
        }
      })

      if (created) {
        await CartProduct.create({
          id: uuid(),
          productId,
          productQty: 1,
          cartId: cart.id
        })

        return res.status(200).send({
          success: true,
          message: 'Add to cart successful!'
        })
      } else {
        const cartProduct = await CartProduct.findOne({
          where: { cartId: cart.id, productId }
        })
        if (!cartProduct) {
          CartProduct.create({
            id: uuid(),
            productId,
            productQty: 1,
            cartId: cart.id
          })

          return res.status(200).send({
            success: true,
            message: 'Add to cart successful!'
          })
        }

        CartProduct.update(
          { productQty: +cartProduct.productQty + 1 },
          { where: { productId, cartId: cart.id } }
        )
          .then(() =>
            Cart.update(
              { total: cart.total + productPrice },
              { where: { id: cart.id } }
            )
          )
          .then(() =>
            res.status(200).send({
              success: true,
              message: 'Add to cart successful!'
            })
          )
          .catch((err) => {
            return res.status(500).send({
              success: false,
              err
            })
          })
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        error
      })
    }
  }
}
export const getCart = async (_, res) => {
  const { id: cartId, total } = await Cart.findOne()
  const products = await Product.findAll()
  const cartProducts = await CartProduct.findAll({
    where: { cartId }
  })

  const data = products.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    imageUrl: product.imageUrl,
    qty: cartProducts.find((p) => p.productId === product.id).productQty
  }))

  res.status(200).send({
    success: true,
    data: {
      products: data,
      total
    }
  })
}
