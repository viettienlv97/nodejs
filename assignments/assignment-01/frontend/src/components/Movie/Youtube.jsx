import React from 'react'

const Youtube = ({ ytKey }) => {
  if (ytKey)
    return (
      <iframe
        src={`https://www.youtube.com/embed/${ytKey}`}
        width='100%'
        height={'500'}
      ></iframe>
    )
}

export default Youtube
