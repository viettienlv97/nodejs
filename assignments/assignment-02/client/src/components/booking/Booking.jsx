import { useEffect, useState, memo, useRef } from 'react'
import HotelDetail from './HotelDetail.jsx'
import BookingForm from './BookingForm.jsx'
import BookingRooms from './BookingRooms.jsx'
import Process from './Process.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { bookingActions } from '../../store/booking.js'
import useFetch from '../../hooks/useFetch.js'
import { HTTP_METHOD, API_URL } from '../../contants.js'
import { useNavigate } from 'react-router-dom'

const Booking = ({ hotel, loading }) => {
  const bookingInfo = useSelector((state) => state.booking)
  const user = useSelector((state) => state.auth)
  const formRef = useRef(null)
  const roomForm = useRef(null)
  const dispatch = useDispatch()
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const { fetchData: createTransaction, data } = useFetch(HTTP_METHOD.POST)

  useEffect(() => {
    if (data) navigate('/transactions')
  }, [data])

  useEffect(() => {
    if (hotel) {
      dispatch(bookingActions.setHotel({ _id: hotel._id }))
      const hotelRooms = hotel.rooms.map((room) => ({
        _id: room._id,
        price: room.price,
        roomNumbers: []
      }))
      dispatch(bookingActions.setHotelRooms(hotelRooms))
    }
  }, [hotel])

  useEffect(() => {
    if (bookingInfo && submitting) {
      console.log('submit')
      console.log(bookingInfo)
      const request = {
        createrId: user?._id ?? null,
        transaction: {
          ...bookingInfo
        }
      }
      createTransaction(`${API_URL}/transaction/create`, request)
      setSubmitting(false)
    }
  }, [bookingInfo])

  const handleBooking = () => {
    if (!bookingInfo.payment) return alert('Select payment method')

    if (bookingInfo.total === 0) return alert('Select rooms')

    if (formRef.current) {
      formRef.current.requestSubmit()
    }

    setSubmitting(true)
  }

  return (
    <section id='booking'>
      <div className='container mt-3'>
        {loading && <div>Loading...</div>}
        {!loading && hotel && (
          <>
            <HotelDetail hotel={hotel} />
            <BookingForm
              roomForm={roomForm}
              formRef={formRef}
              hotel={hotel}
            />
            <BookingRooms
              roomForm={roomForm}
              rooms={hotel.rooms}
            />
            <Process handleBooking={handleBooking} />
          </>
        )}
      </div>
    </section>
  )
}

export default Booking
