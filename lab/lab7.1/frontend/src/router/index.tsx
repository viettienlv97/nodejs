import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/Home'
import Products from '../pages/Products'
import Cart from '../pages/Cart'
import Orders from '../pages/Orders'
import AddProduct from '../pages/AddProduct'
import Admin from '../pages/Admin'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'add-product',
        element: <AddProduct />
      },
      {
        path: 'admin',
        element: <Admin />
      }
    ]
  }
])

export default router
