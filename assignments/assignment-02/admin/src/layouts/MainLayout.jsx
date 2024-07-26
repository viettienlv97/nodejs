import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/nav/Navbar.jsx'
import { useSelector } from 'react-redux'

const MainLayout = () => {
  // hooks
  const navigate = useNavigate()
  const authUser = useSelector((state) => state.auth)

  useEffect(() => {
    if (!authUser) navigate('/login')
  }, [])

  return (
    <div className='vh-100'>
      <div className='row g-0 '>
        <div className='col-2 border-1 border-bottom border-end'>
          <div className='text-center py-3 fw-bold text-purple fs-5'>
            Admin Page
          </div>
        </div>
        <div className='col-10 border-1 border-bottom' />
      </div>
      <div className='row g-0 h-100'>
        <div className='col-2 border-1 border-end'>
          <Navbar />
        </div>
        <div className='col-10'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
