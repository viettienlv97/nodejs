import { createBrowserRouter } from 'react-router-dom'

// auth
import LoginPage from '../pages/auth/Login.jsx'
// layout
import MainLayout from '../layouts/MainLayout.jsx'
// main
import DashboardPage from '../pages/main/Dashboard.jsx'
// lists
import UserPage from '../pages/lists/User.jsx'
import HotelPage from '../pages/lists/Hotel.jsx'
import RoomPage from '../pages/lists/Room.jsx'
import TransactionPage from '../pages/lists/Transaction.jsx'
// new
import NewHotelPage from '../pages/new/NewHotel.jsx'
import NewRoomPage from '../pages/new/NewRoom.jsx'
//detail
import DetailHotelPage from '../pages/detail/Hotel.jsx'
import DetailRoomPage from '../pages/detail/Room.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'users',
        element: <UserPage />
      },
      {
        path: 'hotels',
        children: [
          {
            index: true,
            element: <HotelPage />
          },
          {
            path: ':hotelId',
            element: <DetailHotelPage />
          }
        ]
      },
      {
        path: 'new-hotel',
        element: <NewHotelPage />
      },
      {
        path: 'rooms',
        children: [
          {
            index: true,
            element: <RoomPage />
          },
          {
            path: ':roomId',
            element: <DetailRoomPage />
          }
        ]
      },
      {
        path: 'new-room',
        element: <NewRoomPage />
      },
      {
        path: 'transactions',
        element: <TransactionPage />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])

export default router
