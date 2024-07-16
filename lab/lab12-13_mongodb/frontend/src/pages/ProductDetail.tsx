import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch.ts'

const ProductDetail = () => {
  const { productId } = useParams()
  const { fetchData, data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}products/${productId}`,
    null,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  useEffect(() => {
    if (productId) fetchData(null, null)
  }, [productId])
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && data && (
        <div>
          <h3>{data.title}</h3>
          <div>
            <img
              src={data.imageUrl}
              alt=''
              width={300}
            />
          </div>
          <h4>Price: ${data.price}</h4>
          <p>{data.description}</p>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
