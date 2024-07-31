import { useEffect } from 'react'
import { TYPES, HTTP_METHOD } from '../../contants.js'
import useFetch from '../../hooks/useFetch.js'
const API_URL = import.meta.env.VITE_API_URL

const TypeList = () => {
  //hooks
  const { fetchData, data, loading } = useFetch(HTTP_METHOD.GET)

  //useEffect
  useEffect(() => {
    if (!data) fetchData(`${API_URL}/hotel/types`)
  }, [])

  //map data
  const types = data
    ? TYPES.map((type) => {
        return {
          ...type,
          count: data.find((t) => t.type === type.type)?.count ?? 0
        }
      })
    : []

  //render
  return (
    <section id='type-list'>
      <div className='container mb-5'>
        <h3 className='fw-bold mb-3'>Browse by property type</h3>
        <div className='row'>
          {loading && <div className='col-12'>Loading...</div>}
          {!loading &&
            types.length > 0 &&
            types.map((type, index) => {
              return (
                <div
                  key={index}
                  className='col-custom'
                >
                  <div>
                    <div
                      className='rounded-top-3'
                      style={{
                        height: '150px',
                        backgroundImage: `url(${type.image})`,
                        backgroundSize: '100% 150px',
                        backgroundRepeat: 'no-repeat'
                      }}
                    ></div>
                    <div className='fw-bold mt-1'>{type.name}</div>
                    <small className='text-gray'>
                      {type.count} {type.name.toLowerCase()}
                    </small>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default TypeList
