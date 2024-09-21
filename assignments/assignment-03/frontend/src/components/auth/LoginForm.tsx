import { FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getItem, setItem } from '../../utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth'
import Loading from '../UI/Loading'
import { User } from '../../store/interface'
import { State } from '../../store'

const LoginForm = () => {
  const auth = useSelector((state: State) => state.auth)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputEmail = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (auth) navigate('/')
    if (inputEmail.current) inputEmail.current.focus()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const authUser = Object.fromEntries(formData.entries())
    const users = getItem('userArr', [])
    const user = users.find(
      (u: User) =>
        u?.password === authUser.password && u.email === authUser.email
    )
    if (user) {
      dispatch(authActions.setAuth(user))
      setItem('user', user)
      setLoading(true)

      setTimeout(() => {
        navigate('/')
      }, 1000)
    } else {
      if (users.find((u: User) => u?.email === authUser.email)) {
        alert('Password incorrect, please try again!')
      } else {
        alert('Email is not exist!')
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='border-0 rounded-3 shadow p-5 bg-light'
    >
      <h2 className='text-center lato-light-italic text-dark mb-5'>Sign In</h2>
      <div className=' mb-4'>
        <div className='border border-1'>
          <input
            className='w-100 rounded-0 border-0 bg-light py-4 ps-3'
            type='email'
            ref={inputEmail}
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
      </div>

      <div>
        <button className='text-light bg-btn-black border-0 w-100 py-4 d-flex justify-content-center'>
          {loading ? <Loading /> : 'SIGN IN'}
        </button>
      </div>
      <div className='d-flex justify-content-center mt-5 mb-3'>
        <span className='lato-regular-italic'>
          <span className='text-gray me-2'>Create an account?</span>
          <Link
            to={'/register'}
            className='text-decoration-none'
          >
            Sign up
          </Link>
        </span>
      </div>
    </form>
  )
}

export default LoginForm
