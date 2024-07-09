import React, { useEffect, useState } from 'react'

const BackgroundScroll = ({ children }) => {
  const [bgColor, setBgColor] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setBgColor(true)
    } else {
      setBgColor(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`${!bgColor ? 'bg-transparent' : 'bg-dark'}`}
      style={{ transition: 'ease 0.5s' }}
    >
      {children}
    </div>
  )
}

export default BackgroundScroll
