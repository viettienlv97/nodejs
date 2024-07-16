import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const timeoutMiliSec = 3000
const PageNotFound = () => {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true })
    }, timeoutMiliSec)
  })
  return (
    <div>
      <h1>Page Not Found - 404</h1>
      <p>You'll be direct to Homepage in {timeoutMiliSec / 1000}s...</p>
    </div>
  )
}

export default PageNotFound
