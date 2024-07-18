import React from 'react'

const DestinationInput = ({ destination, setDestination }) => {
  return (
    <div className='mb-3 d-flex flex-column'>
      <label
        htmlFor='destination-input'
        className='fs-5 mb-2'
      >
        Destination
      </label>
      <input
        type='text'
        className='p-2 fw-600'
        value={destination}
        id='destination-input'
        onChange={(e) => setDestination(e.target.value)}
        required={true}
      />
    </div>
  )
}

export default DestinationInput
