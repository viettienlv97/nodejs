import React, { memo } from 'react'
import { Search } from 'react-feather'
import { Link } from 'react-router-dom'
import BackgroundScroll from './UI/BackgroundScroll'

const Navbar = memo(() => {
  return (
    <nav className='fixed-top'>
      <BackgroundScroll>
        <div className='container-fluid'>
          <div className='d-flex justify-content-between align-items-center'>
            <Link
              to={'/'}
              className='text-red fw-bold fs-4 text-decoration-none'
            >
              Movie App
            </Link>
            <Link
              role='button'
              to={'/search'}
            >
              <Search
                className='text-gray fw-bold fs-4'
                size={32}
              />
            </Link>
          </div>
        </div>
      </BackgroundScroll>
    </nav>
  )
})

export default Navbar
