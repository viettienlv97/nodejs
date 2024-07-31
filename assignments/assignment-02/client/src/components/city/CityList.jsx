import { useEffect } from 'react'
import { HTTP_METHOD, CITIES } from '../../contants.js'
import useFetch from '../../hooks/useFetch.js'
const API_URL = import.meta.env.VITE_API_URL

const CityList = () => {
  //hooks
  const { fetchData, data, loading } = useFetch(HTTP_METHOD.GET)

  //useEffect
  useEffect(() => {
    if (!data) fetchData(`${API_URL}/hotel/cities`)
  }, [])

  //map data
  const cities = data
    ? CITIES.map((c) => {
        return {
          ...c,
          count: data.find((d) => d.name === c.name)?.count ?? 0
        }
      })
    : []

  //render
  return (
    <section id='city-list'>
      <div className='container mb-4 position-relative'>
        <div className='w-100 m-0 p-0'>
          <div className='row'>
            {loading && <div className='col-12'>Loading...</div>}
            {!loading &&
              cities.length > 0 &&
              cities.map((city, index) => {
                return (
                  <div
                    key={index}
                    className='col-4'
                    style={{ height: '250px' }}
                  >
                    <div
                      className='rounded h-100 position-relative'
                      style={{
                        backgroundImage: `url(${
                          import.meta.env.VITE_IMAGE_URL
                        }/${city.image})`,
                        backgroundSize: '100% 250px',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 0
                      }}
                    >
                      <div
                        className='position-absolute bottom-0 ms-3'
                        style={{ zIndex: 1 }}
                      >
                        <h2 className='text-light fw-bold'>{city.name}</h2>
                        <p className='text-light fw-bold'>
                          {city.count} properties
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CityList
