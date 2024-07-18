import { Outlet } from 'react-router-dom'
import MainNavbar from '../navbar/MainNavbar.jsx'

const MainLayout = () => {
  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  )
}

export default MainLayout
