import React from 'react'
import navbar from '../../../data/navBar.json'

const HomeNavbar = () => {
  const navList = [...navbar]
  return (
    <nav className='bg-secondary'>
      <div className='container text-light pt-2 pb-4'>
        <div className='d-flex'>
          {navList.map((item, index) => {
            return (
              <div
                key={index}
                className={`py-1 px-2  me-4 ${
                  item.active ? 'rounded-pill border' : ''
                }`}
              >
                <span className={`fa ${item.icon} me-2`}></span>
                <span>{item.type}</span>
              </div>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default HomeNavbar
