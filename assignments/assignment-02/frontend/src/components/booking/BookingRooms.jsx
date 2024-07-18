import React from 'react'

const BookingRooms = ({ rooms }) => {
  console.log(rooms)
  return (
    <div>
      <h5 className='fw-bold mb-3'>Select Rooms</h5>
      <div className='row'>
        {rooms.map((room) => {
          return (
            <div
              className='col-6'
              key={room._id}
            >
              <div className='row mb-4'>
                <div className='col-7'>
                  <div className='fw-bold'>{room.title}</div>
                  <div className='text-dark'>{room.desc}</div>
                  <div className='fs-7'>
                    Max people:{' '}
                    <span className='fw-bold'>{room.maxPeople}</span>
                  </div>
                  <div className='fw-bold'>${room.price}</div>
                </div>
                <div className='col-5'>
                  {room.roomNumbers.map((number) => {
                    return (
                      <div className='form-check form-check-inline'>
                        <label
                          htmlFor={`room_${room._id}_${number}`}
                          role='button'
                        >
                          {number}
                        </label>
                        <input
                          role='button'
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id={`room_${room._id}_${number}`}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookingRooms
