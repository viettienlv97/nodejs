import React, { useEffect } from 'react'
import HotelDetail from './HotelDetail.jsx'
import BookingForm from './BookingForm.jsx'
import BookingRooms from './BookingRooms.jsx'
import useFetch from '../../hooks/useFetch.js'
import { HTTP_METHOD, API_URL } from '../../contants.js'
import { useParams } from 'react-router-dom'

const Booking = () => {
  const { hotelId } = useParams()
  const { fetchData, data, loading } = useFetch(HTTP_METHOD.GET)

  useEffect(() => {
    fetchData(`${API_URL}/hotel/book/${hotelId}`)
  }, [])

  const hotel = data ?? null
  return (
    <section id='booking'>
      <div className='container mt-3'>
        {loading && <div>Loading...</div>}
        {!loading && hotel && (
          <>
            <HotelDetail hotel={hotel} />
            <BookingForm />
            <BookingRooms rooms={hotel.rooms} />
          </>
        )}
      </div>
    </section>
  )
}

export default Booking
