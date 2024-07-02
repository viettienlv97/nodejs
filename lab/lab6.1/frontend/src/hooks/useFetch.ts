import { useState } from 'react'

type FetchOption = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers: {
    'Content-Type': 'application/json'
    Accept: 'application/json'
  }
}

const useFetch = (url: string, option: FetchOption) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const fetchData = async (payload: any) => {
    setLoading(true)
    setData(null)
    setError(null)
    try {
      const res: Response = await fetch(url, {
        method: option.method ?? 'get',
        headers: option.headers,
        body: payload ? JSON.stringify(payload) : null
      })
      if (!res.ok) throw new Error('Cannot fetch data')

      const resData = await res.json()

      setData(resData.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  return { data, fetchData, loading, error }
}

export default useFetch
