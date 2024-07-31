import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HTTP_METHOD } from '../../contants.js'
import useFetch from '../../hooks/useFetch.js'
const API_URL = import.meta.env.VITE_API_URL

const HotelList = () => {
  //hooks
  const { fetchData, data, loading } = useFetch(HTTP_METHOD.GET)

  //useEffect
  useEffect(() => {
    if (!data) fetchData(`${API_URL}/hotel/featured`)
  }, [])

  //map data
  const featured = data ? data : []

  //render
  return (
    <section id='hotel-list'>
      <div className='container mb-5'>
        <h3 className='fw-bold mb-3'>Homes guests love</h3>
        <div className='row'>
          {loading && <div>Loading...</div>}

          {!loading &&
            featured.length > 0 &&
            featured.map((hotel, index) => {
              return (
                <div
                  key={index}
                  className='col-4'
                >
                  <div className='h-100'>
                    <Link to={'/hotel/' + hotel._id}>
                      <img
                        src={hotel.photos[0]}
                        style={{
                          height: '250px',
                          width: '100%',
                          objectPosition: 'center',
                          objectFit: 'cover'
                        }}
                      />
                    </Link>

                    <Link to={'/hotel/' + hotel._id}>
                      <div className='fw-bold mt-1'>
                        <u>{hotel.name}</u>
                      </div>
                    </Link>
                    <div className='text-gray'>{hotel.city}</div>
                    <div className='fw-bold'>
                      Starting from ${hotel.cheapestPrice}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default HotelList
