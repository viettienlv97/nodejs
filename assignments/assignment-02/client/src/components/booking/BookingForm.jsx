import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { countDate } from '../../utils/helpers.js'
import { bookingActions } from '../../store/booking.js'
import useFetch from '../../hooks/useFetch.js'
import { HTTP_METHOD, API_URL } from '../../contants.js'
import { bookedRoomsActions } from '../../store/bookedRooms.js'

const BookingForm = ({ formRef, hotel, roomForm }) => {
  const { hotelId } = useParams()
  const { fetchData: getAvailableRooms, data: bookedRooms } = useFetch(
    HTTP_METHOD.POST
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authUser = useSelector((state) => state.auth)
  if (!authUser) return navigate('/login')

  const [bookingInfo, setBookingInfo] = useState({
    fullName: authUser.fullName ?? '',
    email: authUser.email ?? '',
    phoneNumber: authUser.phoneNumber ?? '',
    idCard: authUser.idCard ?? ''
  })
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  useEffect(() => {
    if (bookedRooms) {
      const mergedRooms = bookedRooms.reduce((acc, room) => {
        const existingRoom = acc.find((r) => r._id === room._id)
        if (existingRoom) {
          existingRoom.roomNumbers = Array.from(
            new Set([...existingRoom.roomNumbers, ...room.roomNumbers])
          )
        } else {
          acc.push({ ...room })
        }
        return acc
      }, [])
      dispatch(bookedRoomsActions.setBookedRooms(mergedRooms))
    }
  }, [bookedRooms])

  useEffect(() => {
    const count = countDate(selectionRange)
    dispatch(bookingActions.setDateCount(count))
    dispatch(
      bookingActions.setDateRanges({
        startDate: selectionRange.startDate.toDateString(),
        endDate: selectionRange.endDate.toDateString()
      })
    )
    const hotelRooms = hotel.rooms.map((room) => ({
      _id: room._id,
      price: room.price,
      roomNumbers: []
    }))
    dispatch(bookingActions.setHotelRooms(hotelRooms))
    dispatch(bookingActions.countTotal())
    if (roomForm.current) roomForm.current.reset()

    getAvailableRooms(`${API_URL}/room/date-range`, {
      hotelId,
      startDate: selectionRange.startDate.toDateString(),
      endDate: selectionRange.endDate.toDateString()
    })
  }, [selectionRange])

  const handleChange = (e) => {
    setBookingInfo((prev) => {
      const info = { ...prev }
      info[e.target.name] = e.target.value
      return info
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const { email, fullName, phoneNumber, idCard } = Object.fromEntries(
      fd.entries()
    )
    dispatch(bookingActions.addInfo({ fullName, email, phoneNumber, idCard }))
  }

  return (
    <div className='row'>
      <div className='col-4'>
        <div>
          <h5 className='fw-bold'>Dates</h5>
          <DateRange
            minDate={new Date()}
            ranges={[selectionRange]}
            disabledDates={[]}
            onChange={(ranges) => setSelectionRange(ranges.selection)}
          />
        </div>
      </div>
      <div className='col-8'>
        <div>
          <form
            ref={formRef}
            onSubmit={handleSubmitForm}
          >
            <h5 className='fw-bold'>Reserve Info</h5>
            <div className='mt-3'>
              <label
                htmlFor='booking-fullname'
                className='fw-600 mb-2'
              >
                Your Full Name:
              </label>
              <input
                type='text'
                id='booking-fullname'
                className='form-control rounded-1 p-2'
                required
                name='fullName'
                placeholder='Full Name'
                value={bookingInfo.fullName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='mt-2'>
              <label
                htmlFor='booking-email'
                className='fw-600 mb-2'
              >
                Your Email:
              </label>
              <input
                type='email'
                id='booking-email'
                className='form-control rounded-1 p-2'
                required
                name='email'
                placeholder='Email'
                value={bookingInfo.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='mt-2'>
              <label
                htmlFor='booking-phone'
                className='fw-600 mb-2'
              >
                Your Phone Number:
              </label>
              <input
                type='text'
                id='booking-phone'
                className='form-control rounded-1 p-2'
                required
                name='phoneNumber'
                placeholder='Phone Number'
                value={bookingInfo.phoneNumber}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='mt-2'>
              <label
                htmlFor='booking-identity'
                className='fw-600 mb-2'
              >
                Your Identity Cart Number:
              </label>
              <input
                type='text'
                id='booking-identity'
                className='form-control rounded-1 p-2'
                required
                name='idCard'
                placeholder='Cart Number'
                value={bookingInfo.idCard}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookingForm
