import { FormEvent, useEffect, useRef } from 'react'
import './forms.css'
import useFetch, { FetchOptions } from '../../hooks/useFetch'
import { useNavigate, useParams } from 'react-router-dom'

const url = (id: string) =>
  `${import.meta.env.VITE_API_URL}admin/${id}?isEdit=true`
const option = new FetchOptions('get', null)

const EditProductForm = () => {
  const { productId } = useParams()
  const navigate = useNavigate()

  const { data, fetchData: getProductDetail } = useFetch(
    url(productId ?? ''),
    null,
    option
  )
  const { fetchData: updateProduct } = useFetch(
    `${import.meta.env.VITE_API_URL}admin/update-product`,
    null,
    new FetchOptions('post', null)
  )

  useEffect(() => {
    if (!data) {
      getProductDetail(null, null)
    }

    if (data) {
      console.log(data)

      if (titleRef.current) titleRef.current.value = data.title
      if (imageUrlRef.current) imageUrlRef.current.value = data.imageUrl
      if (priceRef.current) priceRef.current.value = data.price
      if (descRef.current) descRef.current.value = data.description
    }
  }, [data])

  const titleRef = useRef<HTMLInputElement>(null),
    imageUrlRef = useRef<HTMLInputElement>(null),
    priceRef = useRef<HTMLInputElement>(null),
    descRef = useRef<HTMLTextAreaElement>(null)

  const handleEditProduct = async (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const fd = new FormData(target)
    const data = Object.fromEntries(fd.entries())

    await updateProduct(null, JSON.stringify({ id: productId, ...data }))
    navigate('/products')
  }

  return (
    <form
      className='form-wrapper'
      onSubmit={handleEditProduct}
    >
      <div className='form-control'>
        <label htmlFor='title'>Title</label>
        <input
          ref={titleRef}
          type='text'
          id='title'
          name='title'
          required
        />
      </div>
      <div className='form-control'>
        <label htmlFor='img-url'>Image Url</label>
        <input
          ref={imageUrlRef}
          type='text'
          id='img-url'
          name='imageUrl'
          required
        />
      </div>
      <div className='form-control'>
        <label htmlFor='price'>Price</label>
        <input
          ref={priceRef}
          type='number'
          name='price'
          step={0.01}
          required
          id='price'
        />
      </div>
      <div className='form-control'>
        <label htmlFor='desc'>Description</label>
        <textarea
          ref={descRef}
          name='description'
          id='desc'
          required
        ></textarea>
      </div>
      <div className='form-control'>
        <button className='btn'>Save</button>
      </div>
    </form>
  )
}

export default EditProductForm
