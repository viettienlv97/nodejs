import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeNavbar from '../navbar/HomeNavbar.jsx'

const HomeLayout = () => {
  return (
    <>
      <HomeNavbar />
      <Outlet />
    </>
  )
}

export default HomeLayout
