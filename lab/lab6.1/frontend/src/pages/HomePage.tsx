// type Props = {}

import { FormEvent, useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

const addUserUrl = 'http://localhost:5000/api/users/add-user'

const HomePage = () => {
  const navigate = useNavigate()
  const { fetchData, data } = useFetch(addUserUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
  })
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    const fd = new FormData(target)
    const { user } = Object.fromEntries(fd.entries())
    console.log(user)

    fetchData({ user })
  }

  useEffect(() => {
    if (data) navigate('/users')
  }, [data])
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='user'
        required
      />
      <button>Add User</button>
    </form>
  )
}

export default HomePage
