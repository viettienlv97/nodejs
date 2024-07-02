import { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import UsersList from '../components/UsersList'

const getUsersUrl = 'http://localhost:5000/api/users'

const UsersPage = () => {
  const { fetchData, data } = useFetch(getUsersUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  useEffect(() => {
    if (!data || !data.length) {
      fetchData(null)
    } else {
      console.log(data)
    }
  }, [data])
  return (
    <div>
      <h3>Users</h3>

      {data && data.length > 0 && <UsersList list={data} />}
    </div>
  )
}

export default UsersPage
