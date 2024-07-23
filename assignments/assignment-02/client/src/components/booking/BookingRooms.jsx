import React, { memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bookingActions } from '../../store/booking.js'

const BookingRooms = memo(({ rooms, roomForm }) => {
  const hotelRooms = useSelector((state) => state.booking?.hotelRooms)
  const bookedRooms = useSelector((state) => state.bookedRooms)
  const dispatch = useDispatch()

  const handleSelectRoom = (roomId, roomNumber, selected) => {
    const selectedRooms = hotelRooms.map((r) => ({ ...r }))
    const room = selectedRooms.find((r) => r._id === roomId)
    let clone = [...room.roomNumbers]
    if (selected) {
      clone.push(roomNumber)
    } else {
      clone = clone.filter((n) => n !== roomNumber)
    }
    room.roomNumbers = clone

    dispatch(bookingActions.setHotelRooms(selectedRooms))
    dispatch(bookingActions.countTotal())
  }

  const filterBooked = rooms.map((room) => {
    const booked = bookedRooms.find((r) => r._id === room._id)?.roomNumbers
    return { ...room, booked }
  })
  console.log('filterBooked', filterBooked)

  return (
    <form ref={roomForm}>
      <h5 className='fw-bold mb-3'>Select Rooms</h5>
      <div className='row'>
        {filterBooked.map((room) => {
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
                    const unavailable = room.booked?.includes(number)
                    return (
                      <div
                        className='form-check form-check-inline'
                        key={`${room._id}_${number}`}
                      >
                        <label
                          htmlFor={`room_${room._id}_${number}`}
                          role='button'
                          className={`fw-bold ${
                            unavailable ? 'text-fade' : undefined
                          }`}
                        >
                          {number}
                        </label>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          disabled={unavailable}
                          name={number}
                          onChange={(e) => {
                            const { checked } = e.target
                            handleSelectRoom(room._id, number, checked)
                          }}
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
    </form>
  )
})

export default BookingRooms
