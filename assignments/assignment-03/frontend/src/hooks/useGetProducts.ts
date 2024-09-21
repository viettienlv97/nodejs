import { useEffect } from 'react'
import useFetch from './useFetch'
import { apiListUrl } from '../utils/apiUrl'
import { useDispatch, useSelector } from 'react-redux'
import { productsListActions } from '../store/productsList'
import { State } from '../store'

const useGetProducts = () => {
  const products = useSelector((state: State) => state.productsList)
  const dispatch = useDispatch()
  const { data, loading, error, fetchData } = useFetch(apiListUrl, [])

  useEffect(() => {
    console.log('data', data)
    console.log('products', products)

    !products?.length &&
      (data?.length
        ? dispatch(productsListActions.setProductsList(data))
        : fetchData())
  }, [data, products])

  return { products, error, loading }
}

export default useGetProducts
