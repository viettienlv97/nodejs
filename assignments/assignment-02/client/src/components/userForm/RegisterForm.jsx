import React, { useEffect, useState } from 'react'
import UserForm from './UserForm.jsx'
import useFetch from '../../hooks/useFetch.js'
import { HTTP_METHOD } from '../../contants.js'
import { useNavigate } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL

const RegisterForm = () => {
  const [isRegister, setIsRegister] = useState(false)
  const { fetchData, data, loading, error } = useFetch(HTTP_METHOD.POST)
  const navigate = useNavigate()
  useEffect(() => {
    if (error) {
      console.log(error)
    }
  }, [error])

  useEffect(() => {
    if (data && !isRegister) {
      console.log('have data')
      setIsRegister(true)
    }

    if (data && isRegister) {
      navigate('/login')
    }
  }, [data])
  const handlerSubmit = (e) => {
    e.preventDefault()
    if (!isRegister) {
      handleRegister(e)
    } else {
      handleCreateAccount(e)
    }
  }

  const handleRegister = (e) => {
    const fd = new FormData(e.target)
    const { user } = Object.fromEntries(fd.entries())
    if (!user) return

    console.log('register')

    fetchData(`${API_URL}/auth/register`, { user })
  }
  const handleCreateAccount = (e) => {
    const fd = new FormData(e.target)
    const { user, username, fullName, password, phoneNumber } =
      Object.fromEntries(fd.entries())
    if (!user || !username || !fullName || !password || !phoneNumber) return

    console.log(user, username, fullName, password, phoneNumber)

    console.log('create account')
    fetchData(`${API_URL}/auth/create`, {
      user,
      username,
      fullName,
      password,
      phoneNumber
    })
  }
  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-4'>
          <UserForm
            title={'Register'}
            button={isRegister ? 'Create Account' : 'Register'}
            handleSubmitForm={handlerSubmit}
            isLogin={false}
            error={error}
            loading={loading}
          >
            {isRegister && !error && (
              <>
                <h6 className='fw-bold mt-4 mb-3 text-center'>Addition info</h6>
                <div className='mb-3'>
                  <input
                    className='form-control'
                    type='text'
                    name='fullName'
                    placeholder='Full Name'
                  />
                </div>
                <div className='mb-3'>
                  <input
                    className='form-control'
                    type='text'
                    name='username'
                    placeholder='Username'
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Password'
                    required
                    autoComplete='new-password'
                    name='password'
                  />
                </div>
                <div className='mb-3'>
                  <input
                    className='form-control'
                    type='text'
                    name='phoneNumber'
                    placeholder='Phone Number'
                    minLength={10}
                    maxLength={10}
                  />
                </div>
              </>
            )}
          </UserForm>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
