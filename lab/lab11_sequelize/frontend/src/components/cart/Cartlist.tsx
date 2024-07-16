import { useEffect } from 'react'
import useFetch, { FetchOptions } from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import ProductTable from '../products/ProductTable.tsx'

type Product = {
  id: string
  title: string
  imageUrl: string
  price: number
  description: string
  qty: number
  cartItem: {
    quantity: number
  }
}

const Cartlist = () => {
  const navigate = useNavigate()

  const { fetchData, data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}cart`,
    {},
    new FetchOptions('get', null)
  )

  const { fetchData: deleteCartItem } = useFetch(
    `${import.meta.env.VITE_API_URL}cart/delete`,
    {},
    new FetchOptions('delete', null)
  )
  const { fetchData: createOrder } = useFetch(
    `${import.meta.env.VITE_API_URL}orders/create-order`,
    null,
    new FetchOptions('post', null)
  )

  useEffect(() => {
    if (!data.products) {
      fetchData(null, null)
    }
  }, [data])

  const handleDeleteCartItem = async (productId: string) => {
    await deleteCartItem(null, JSON.stringify({ productId }))
    fetchData(null, null)
  }

  const handleCheckoutOrder = async () => {
    await createOrder(null, null)
    navigate('/orders')
  }

  if (!data.products || data.products.length === 0) {
    return <div>No Product In Cart</div>
  } else {
    return (
      <>
        <ProductTable
          loading={loading}
          products={data.products}
          isOrder={false}
          handleDeleteCartItem={handleDeleteCartItem}
        />
        <button
          onClick={handleCheckoutOrder}
          className='btn'
        >
          Order Now!
        </button>
      </>
    )
  }
}

export default Cartlist
