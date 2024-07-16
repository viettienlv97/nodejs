import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/Home'
import Products from '../pages/Products'
import Cart from '../pages/Cart'
import Orders from '../pages/Orders'
import AddProduct from '../pages/AddProduct'
import EditProduct from '../pages/EditProduct'
import Admin from '../pages/Admin'
import PageNotFound from '../pages/404'
import ProductDetail from '../pages/ProductDetail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'products',
        children: [
          { index: true, element: <Products /> },
          { path: ':productId', element: <ProductDetail /> }
        ]
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
        children: [
          { index: true, element: <Admin /> },
          { path: ':productId', element: <EditProduct /> }
        ]
      }
    ]
  }
])

export default router
