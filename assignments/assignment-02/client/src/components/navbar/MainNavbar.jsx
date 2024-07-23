import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../../store/auth.js'
import { removeItem } from '../../utils/storage.js'

const MainNavbar = () => {
  const authUser = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    const process = confirm('Logout?')
    if (!process) return

    removeItem('user')
    dispatch(authActions.clearAuth())
    navigate('/')
  }
  return (
    <nav className='bg-secondary'>
      <div className='container text-light pt-3 pb-4'>
        <div className='d-flex justify-content-between'>
          <Link
            to={'/'}
            className='text-light text-decoration-none'
          >
            Booking Website
          </Link>
          {!authUser && (
            <div className='d-flex'>
              <Link to={'/register'}>
                <button className='border-none me-2'>Register</button>
              </Link>
              <Link to={'/login'}>
                <button className='border-none'>Login</button>
              </Link>
            </div>
          )}
          {authUser && (
            <div className='d-flex'>
              <span className='me-4'>{authUser.email}</span>
              <Link
                to={'/transactions'}
                className='me-3'
              >
                <button className='border-none me-2'>Transactions</button>
              </Link>
              <button
                className='border-none'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default MainNavbar
