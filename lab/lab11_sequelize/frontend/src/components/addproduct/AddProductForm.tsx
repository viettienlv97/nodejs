import { FormEvent, useRef } from 'react'
import './forms.css'
import useFetch, { FetchOptions } from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

const url = `${import.meta.env.VITE_API_URL}products/add-product`
const option = new FetchOptions('post', null)

const AddProductForm = () => {
  const navigate = useNavigate()

  const { fetchData } = useFetch(url, null, option)
  const form = useRef<HTMLFormElement>(null)
  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const fd = new FormData(target)
    const data = Object.fromEntries(fd.entries())

    await fetchData(null, JSON.stringify(data))
    navigate('/products')
  }

  return (
    <form
      ref={form}
      className='form-wrapper'
      onSubmit={handleAddProduct}
    >
      <div className='form-control'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          name='title'
          required
        />
      </div>
      <div className='form-control'>
        <label htmlFor='img-url'>Image Url</label>
        <input
          type='text'
          id='img-url'
          name='imageUrl'
          required
        />
      </div>
      <div className='form-control'>
        <label htmlFor='price'>Price</label>
        <input
          type='number'
          name='price'
          required
          id='price'
          step={0.01}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='desc'>Description</label>
        <textarea
          name='description'
          id='desc'
          required
        ></textarea>
      </div>
      <div className='form-control'>
        <button>Add Product</button>
      </div>
    </form>
  )
}

export default AddProductForm
