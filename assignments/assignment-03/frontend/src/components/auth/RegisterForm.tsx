import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getItem, setItem } from '../../utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth'
import Loading from '../UI/Loading'
import { User } from '../../store/interface'
import { State } from '../../store'

const RegisterForm = () => {
  const auth = useSelector((state: State) => state.auth)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const inputFullName = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (auth) navigate('/')
    if (inputFullName.current) inputFullName.current.focus()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const user = Object.fromEntries(formData.entries())
    const users = getItem('userArr', [])
    if (users.find((u: User) => u?.email === user.email)) {
      alert('This email address is already used. Could you please try another?')
      return
    } else {
      users.push(user)
      setItem('userArr', users)
      dispatch(authActions.setAuth(user))
      setItem('user', user)
      setLoading(true)

      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }

  const handleInputPhone = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement
    input.value = input.value.replace(/[^\d\s+\(\)-]/g, '')
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='border-0 rounded-3 shadow p-5 bg-light'
    >
      <h2 className='text-center lato-light-italic text-dark mb-5'>Sign Up</h2>
      <div className=' mb-4'>
        <div className='border border-1'>
          <input
            className='w-100 rounded-0 border-0 bg-light py-4 ps-3'
            ref={inputFullName}
            type='text'
            name='fullName'
            required
            placeholder='Full Name'
          />
        </div>
        <div className='border border-top-0'>
          <input
            className='w-100 rounded-0 border-0 bg-light py-4 ps-3'
            type='email'
            name='email'
            required
            placeholder='Email'
          />
        </div>
        <div className='border border-top-0'>
          <input
            className='w-100 rounded-0 border-0 bg-light py-4 px-3'
            type='password'
            name='password'
            required
            placeholder='Password'
            minLength={8}
            title='Password must be at least 8 characters long.'
          />
        </div>
        <div className='border border-top-0'>
          <input
            className='w-100 rounded-0 border-0 bg-light py-4 ps-3'
            type='tel'
            name='phone'
            required
            placeholder='Phone'
            onChange={handleInputPhone}
          />
        </div>
      </div>

      <div>
        <button className='text-light bg-btn-black border-0 w-100 py-4'>
          {loading ? <Loading /> : 'SIGN UP'}
        </button>
      </div>
      <div className='d-flex justify-content-center mt-5 mb-3'>
        <span className='lato-regular-italic'>
          <span className='text-gray me-2'>Login?</span>
          <Link
            to={'/login'}
            className='text-decoration-none'
          >
            Click
          </Link>
        </span>
      </div>
    </form>
  )
}

export default RegisterForm
