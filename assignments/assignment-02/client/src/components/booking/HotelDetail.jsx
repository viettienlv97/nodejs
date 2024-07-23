import React from 'react'

const HotelDetail = ({ hotel }) => {
  return (
    <div className='row'>
      <div className='col-9'>
        <h4 className='fw-bold mb-3'>{hotel.name}</h4>
        <p className='fw-500'>{hotel.desc}</p>
      </div>
      <div className='col-3'>
        <div className='bg-sky h-100 py-3 px-4'>
          <h3 className='mt-2'>
            <span className='fw-bold'>${hotel.cheapestPrice}</span>{' '}
            <span className='text-gray'>(1 nights)</span>
          </h3>
          <button className='w-100 btn btn-primary mt-3'>
            Reserve or Book Now!
          </button>
        </div>
      </div>
    </div>
  )
}

export default HotelDetail
