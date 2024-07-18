import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout.jsx'
import HomeLayout from '../components/layout/HomeLayout.jsx'
import HomePage from '../pages/home/Home.jsx'
import SearchPage from '../pages/search/Search.jsx'
import LoginPage from '../pages/auth/Login.jsx'
import RegisterPage from '../pages/auth/Register.jsx'
import TransactionsPage from '../pages/transactions/Transactions.jsx'
import DetailPage from '../pages/detail/Detail.jsx'
import BookPage from '../pages/book/Book.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <HomePage />
          },
          {
            path: 'search',
            element: <SearchPage />
          },
          {
            path: 'transactions',
            element: <TransactionsPage />
          },
          {
            path: 'hotel/:hotelId',
            element: <DetailPage />
          },
          {
            path: 'book/:hotelId',
            element: <BookPage />
          }
        ]
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      }
    ]
  }
])

export default router
