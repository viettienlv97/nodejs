import { useState } from 'react'

const useFetch = (method) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = (url, body) => {
    setLoading(true)
    try {
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
      })
        .then((response) => {
          return response.json()
        })
        .then((res) => {
          console.log(res)
          if (!res.success) setError(res.message)
          // setTimeout(() => {
          else setData(res?.data)
          setError(null)
          // }, 1000)
        })
    } catch (error) {
      console.log(error)
    } finally {
      // setTimeout(() => {
      setLoading(false)
      // }, 1000)
    }
  }

  return { fetchData, data, loading, error }
}

export default useFetch
