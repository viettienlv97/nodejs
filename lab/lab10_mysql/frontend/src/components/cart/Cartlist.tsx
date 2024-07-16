import { useEffect } from 'react'
import useFetch, { FetchOptions } from '../../hooks/useFetch'

type Product = {
  id: string
  title: string
  imageUrl: string
  price: number
  description: string
  qty: number
}

const Cartlist = () => {
  const { fetchData, data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}cart`,
    {},
    new FetchOptions('get', null)
  )

  useEffect(() => {
    if (!data.products) {
      fetchData(null, null)
    }
  }, [data])

  if (!data.products || data.products.length === 0) {
    return <div>No Product In Cart</div>
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Img</th>
            <th>Title</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr>Loading...</tr>}
          {!loading &&
            data.products.map((product: Product, index: number) => {
              return (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={product.imageUrl}
                      alt=''
                      width={100}
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>{product.qty}</td>
                  <td>{product.price}</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    )
  }
}

export default Cartlist
