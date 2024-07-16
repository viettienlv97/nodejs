import { FC } from 'react'
import { ProductType } from './Product.tsx'

type Props = {
  loading: boolean
  products: Array<ProductType>
  isOrder: boolean
  handleDeleteCartItem: (productId: string) => void
}

const ProductTable: FC<Props> = ({
  loading,
  products,
  isOrder,
  handleDeleteCartItem
}) => {
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
          products.map((product, index: number) => {
            return (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.imageUrl}
                    alt=''
                    width={100}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.quantity || product.quantity}</td>
                <td>{product.price}</td>
                <td>
                  {!isOrder && (
                    <button
                      className='btn'
                      onClick={() => handleDeleteCartItem(product.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default ProductTable
