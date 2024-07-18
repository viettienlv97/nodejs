import detail from '../../../data/detail.json'
import DetailTitle from './DetailTitle'
import DetailImages from './DetailImages'
import DetailDesc from './DetailDesc'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch.js'
import { HTTP_METHOD } from '../../contants.js'
import { useEffect } from 'react'
const API_URL = import.meta.env.VITE_API_URL

const Detail = () => {
  const { hotelId } = useParams()

  const { fetchData, data, loading } = useFetch(HTTP_METHOD.GET)

  useEffect(() => {
    if (!data) fetchData(`${API_URL}/hotel/${hotelId}`)
  }, [])

  const hotel = data ?? null

  return (
    <section id='detail'>
      <div className='container mt-3'>
        {loading && <div>Loading...</div>}
        {!loading && hotel && (
          <>
            <DetailTitle detail={hotel} />
            <DetailImages detail={hotel} />
            <DetailDesc detail={hotel} />
          </>
        )}
      </div>
    </section>
  )
}

export default Detail
