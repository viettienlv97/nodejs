import { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { FetchOptions } from '../../hooks/useFetch'
import Product, { ProductType } from './Product'

const productsUrl = 'http://localhost:5000/api/products'
const options = new FetchOptions('get', null)

const ProductsList = () => {
  const { data, fetchData, loading } = useFetch(productsUrl, [], options)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    if (!data || !data.length) {
      fetchData(signal, null)
    }

    return () => {
      controller.abort()
    }
  }, [data])
  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && data.length === 0 && <div>No products</div>}
      {!loading &&
        data.length > 0 &&
        data.map((product: ProductType, index: number) => {
          return (
            <div key={index}>
              <Product product={product} />
            </div>
          )
        })}
    </div>
  )
}

export default ProductsList
