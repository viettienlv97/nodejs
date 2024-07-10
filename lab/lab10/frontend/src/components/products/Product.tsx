import { useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import './product.css'
import { FC, useEffect, useState } from 'react'
type Props = {
  product: ProductType
  isEdit: boolean
}
export type ProductType = {
  id: string
  title: string
  imageUrl: string
  description: string
  price: string
}

const Product: FC<Props> = ({ product, isEdit }) => {
  const navigate = useNavigate()

  const [deleteId, setDeleteId] = useState<string>('')
  const { loading: loadingDelete, fetchData: fetchDelete } = useFetch(
    `${import.meta.env.VITE_API_URL}admin/${deleteId}`,
    null,
    {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  const { loading, fetchData } = useFetch(
    `${import.meta.env.VITE_API_URL}cart/add-to-cart`,
    null,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  // const {} = useFetch(`${import.meta.env.VITE_API_URL}admin/`)

  const toProductDetail = (id: string) => {
    navigate('/products/' + id)
  }
  const handleAddToCart = (id: string) => {
    console.log('add to cart' + id)
    fetchData(null, JSON.stringify({ productId: id }))
  }

  const handleEditProduct = (id: string) => {
    navigate(`/admin/${id}`)
  }

  const handleDeleteProduct = () => {
    const approve = confirm('Do you want to delete this product?')
    if (!approve) return

    fetchDelete(null, null)
    //navigate('/products')
  }

  useEffect(() => {
    if (deleteId && deleteId.length) {
      handleDeleteProduct()
    }
  }, [deleteId])

  return (
    <div className='product-item card'>
      <div className='card__header'>
        <h1 className='product__title'>{product.title}</h1>
      </div>
      <div className='card__content'>
        <div className='card__image'>
          <img
            src={product.imageUrl}
            alt={product.title}
          />
        </div>
        <h1 className='product__price'>$ {product.price}</h1>
        <p className='product__description'>{product.description}</p>
        {!isEdit && (
          <div className='card__actions'>
            <button
              onClick={() => toProductDetail(product.id)}
              className='btn'
            >
              Detail
            </button>
            <button
              onClick={() => handleAddToCart(product.id)}
              className='btn'
            >
              {!loading && <span>Add to Cart</span>}
              {loading && <span>Adding to Cart...</span>}
            </button>
          </div>
        )}
        {isEdit && (
          <div className='card__actions'>
            <button onClick={() => handleEditProduct(product.id)}>
              Edit Product
            </button>
            <button onClick={() => setDeleteId(product.id)}>
              {!loadingDelete && <span>Delete Product</span>}
              {loadingDelete && <span>Deleting ...</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product
