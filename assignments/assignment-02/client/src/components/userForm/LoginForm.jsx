import React, { useEffect } from 'react'
import UserForm from './UserForm.jsx'
import useFetch from '../../hooks/useFetch.js'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth.js'
import { setItem } from '../../utils/storage.js'
import { useNavigate } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL

const LoginForm = () => {
  const { fetchData, data, loading, error } = useFetch('post')
  const authUser = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setItem('user', data)
      dispatch(authActions.setAuth(data))
      navigate('/')
    }
  }, [data])

  const handleLogin = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const { user, password } = Object.fromEntries(fd.entries())
    if (!user || !password) return alert('Invalid input')

    fetchData(`${API_URL}/auth/login`, { user, password })
  }
  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-4'>
          <UserForm
            title={'Login'}
            button={'Login'}
            loading={loading}
            handleSubmitForm={handleLogin}
            isLogin={true}
            error={error}
          />
        </div>
      </div>
    </div>
  )
}

export default LoginForm
