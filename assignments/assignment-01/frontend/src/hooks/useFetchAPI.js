import { useEffect, useState, useCallback } from 'react'
import { requestOptions } from '../services/apiService'

const useFetchAPI = (
  url,
  options = { autoFetch: false, initialData: null }
) => {
  const { autoFetch, initialData } = options
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(url, options.fetchOption ?? requestOptions)
      if (!response.ok) {
        throw new Error(response)
      }

      const data = await response.json()
      setData(data)
    } catch (error) {
      setData(initialData)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [url, autoFetch])

  return { data, loading, error, fetchData }
}

export default useFetchAPI
