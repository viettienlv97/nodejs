import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
