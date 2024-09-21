import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './cart'
import { productReducer } from './product'
import { productsListReducer } from './productsList'
import { authReducer } from './auth'
import { Cart, Product, Products, User } from './interface'

export type State = {
  cart: Cart
  product: Product
  productsList: Products
  auth: User
}

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    productsList: productsListReducer,
    auth: authReducer
  }
})

export default store
