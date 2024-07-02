import './product.css'
import { FC } from 'react'
type Props = {
  product: ProductType
}
export type ProductType = {
  title: string
  imageUrl: string
  description: string
  price: string
}
const Product: FC<Props> = ({ product }) => {
  return (
    <div className='product-item'>
      <h4 className='product__title'>{product.title}</h4>
      <img
        style={{ width: '100%' }}
        src={product.imageUrl}
        alt={product.title}
      />
      <p className='product__price'>$ {product.price}</p>
      <p className='product__description'>{product.description}</p>
      <div className='product_button'>
        <button>Add to Cart</button>
      </div>
    </div>
  )
}

export default Product
