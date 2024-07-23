import React, { useEffect } from 'react'
import Booking from '../../components/booking/Booking.jsx'
import Subscribe from '../../components/subcribe/Subscribe.jsx'
import Footer from '../../components/footer/Footer.jsx'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch.js'
import { HTTP_METHOD, API_URL } from '../../contants.js'

const BookingPage = () => {
  const { hotelId } = useParams()
  const { fetchData, data, loading } = useFetch(HTTP_METHOD.GET)

  useEffect(() => {
    fetchData(`${API_URL}/hotel/book/${hotelId}`)
  }, [])

  const hotel = data ?? null
  return (
    <>
      <main>
        <Booking
          hotel={hotel}
          loading={loading}
        />
      </main>
      <Subscribe />
      <Footer />
    </>
  )
}

export default BookingPage
