import { FC, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { FetchOptions } from '../../hooks/useFetch'
import Product, { ProductType } from './Product'

const productsUrl = `${import.meta.env.VITE_API_URL}products`
const options = new FetchOptions('get', null)

type Props = {
  isEdit: boolean
}

const ProductsList: FC<Props> = ({ isEdit }) => {
  const { data, fetchData, loading } = useFetch(productsUrl, null, options)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    if (!data) {
      fetchData(signal, null)
    }

    return () => {
      controller.abort()
    }
  }, [data])

  return (
    <div className='grid'>
      {loading && <div>Loading...</div>}
      {!loading && data?.length === 0 && <div>No products</div>}
      {!loading &&
        data?.length > 0 &&
        data.map((product: ProductType) => {
          return (
            <div key={product._id}>
              <Product
                product={product}
                isEdit={isEdit}
              />
            </div>
          )
        })}
    </div>
  )
}

export default ProductsList
