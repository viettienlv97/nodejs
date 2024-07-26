import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Grid, User, Home, CreditCard, Truck, LogOut } from 'react-feather'
import { useDispatch } from 'react-redux'
import { clearAuth } from '../../store/auth.js'

const list = [
  {
    id: 'l-0',
    name: 'Main',
    nav: [
      {
        id: 'main-1',
        name: 'Dashboard',
        path: '/',
        icon: (
          <Grid
            size={16}
            className='me-1'
          />
        )
      }
    ]
  },
  {
    id: 'l-1',
    name: 'Lists',
    nav: [
      {
        id: 'lists-01',
        name: 'Users',
        path: '/users',
        icon: (
          <User
            size={16}
            className='me-1'
          />
        )
      },
      {
        id: 'lists-02',
        name: 'Hotels',
        path: '/hotels',
        icon: (
          <Home
            size={16}
            className='me-1'
          />
        )
      },
      {
        id: 'lists-03',
        name: 'Rooms',
        path: '/rooms',
        icon: (
          <CreditCard
            size={16}
            className='me-1'
          />
        )
      },
      {
        id: 'lists-04',
        name: 'Transactions',
        path: '/transactions',
        icon: (
          <Truck
            size={16}
            className='me-1'
          />
        )
      }
    ]
  },
  {
    id: 'l-2',
    name: 'New',
    nav: [
      {
        id: 'new-01',
        name: 'New Hotel',
        path: '/new-hotel',
        icon: (
          <Home
            size={16}
            className='me-1'
          />
        )
      },
      {
        id: 'new-02',
        name: 'New Room',
        path: '/new-room',
        icon: (
          <CreditCard
            size={16}
            className='me-1'
          />
        )
      }
    ]
  },
  {
    id: 'l-3',
    name: 'User',
    button: {
      name: 'Logout',
      icon: (
        <LogOut
          size={16}
          className='me-1'
        />
      )
    }
  }
]

const Navbar = () => {
  // hooks
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // function
  const handleLogout = () => {
    const process = confirm('Logout?')
    if (process) {
      dispatch(clearAuth())
      navigate('/login')
    }
  }

  return (
    <nav className='p-2'>
      {list.map((item) => {
        return (
          <div key={item.id}>
            <div className='mb-2 upper fw-bold text-gray fs-7'>{item.name}</div>
            {item.nav &&
              item.nav.map((nav) => {
                return (
                  <div
                    key={nav.id}
                    className='ps-3 mb-2'
                  >
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? 'text-purple text-decoration-none fw-bold fs-7 d-block'
                          : 'text-dark text-decoration-none fw-bold fs-7 d-block'
                      }
                      to={nav.path}
                    >
                      <span className='w-100 d-flex align-items-center'>
                        {nav.icon}
                        {nav.name}
                      </span>
                    </NavLink>
                  </div>
                )
              })}
            {item.button && (
              <button
                className='btn p-0 ms-3 fs-7 fw-bold'
                onClick={handleLogout}
              >
                <span className='d-flex align-items-center'>
                  {item.button.icon}
                  {item.button.name}
                </span>
              </button>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default Navbar
