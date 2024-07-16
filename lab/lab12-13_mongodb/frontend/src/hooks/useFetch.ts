import { useState } from 'react'

type Headers = {
  'Content-Type': 'application/json'
}

export class FetchOptions {
  method: string = 'get'
  headers = {
    'Content-Type': 'application/json'
  }
  body?: string | null

  constructor(method: string = 'get', headers: Headers | null) {
    this.method = method
    if (headers) this.headers = headers
  }
}
const getUrl = (urlOrFunc: string | (() => string)): string => {
  if (typeof urlOrFunc === 'string') {
    return urlOrFunc
  } else {
    return urlOrFunc()
  }
}

const useFetch = (
  apiUrl: string | (() => string),
  initialState: any,
  options: FetchOptions
) => {
  const [data, setData] = useState<any>(initialState)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const fetchData = async (signal: AbortSignal | null, body: string | null) => {
    setLoading(true)
    try {
      const res = await fetch(getUrl(apiUrl), {
        method: options.method,
        headers: options.headers,
        body,
        signal: signal
      })
      if (!res.ok) throw new Error('Cannot fetch api')
      const data = await res.json()
      setData(data.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  return { data, error, loading, fetchData }
}

export default useFetch
