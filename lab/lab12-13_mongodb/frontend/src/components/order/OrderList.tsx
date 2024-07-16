import { useEffect } from 'react'
import useFetch, { FetchOptions } from '../../hooks/useFetch.ts'
import { ProductType } from '../products/Product.tsx'
import ProductTable from '../products/ProductTable.tsx'

type Order = {
  id: string
  _id: string
  products: Array<ProductType>
}

const OrderList = () => {
  const { fetchData, data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}orders`,
    null,
    new FetchOptions('get', null)
  )

  useEffect(() => {
    if (!data) {
      fetchData(null, null)
    }
  }, [data])

  const handleDeleteItem = (_: string) => {}
  return (
    <div>
      {loading && <div>Loading...</div>}

      {!loading &&
        data &&
        data.length &&
        data.map((order: Order) => {
          return (
            <>
              <h4>OrderID: {order._id}</h4>
              <ProductTable
                products={order.products}
                loading={loading}
                isOrder={true}
                handleDeleteCartItem={handleDeleteItem}
              />
            </>
          )
        })}
    </div>
  )
}

export default OrderList
