import React from 'react'

const ButtonTransparent = ({ children, className }) => {
  return (
    <button
      className={`position-relative border-none px-4 py-2 rounded-1 ${className}`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className='text-light fw-bold'>{children}</div>
    </button>
  )
}

export default ButtonTransparent
