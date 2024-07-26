import { useEffect } from 'react'
import { HTTP_METHOD, API_URL } from '../../contants.js'
import useFetch from '../../hooks/useFetch.js'
import { useDispatch } from 'react-redux'
import { setAuth } from '../../store/auth.js'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { fetchData, data, error, loading } = useFetch(HTTP_METHOD.POST)

  const handleLogin = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const { user, password } = Object.fromEntries(fd.entries())
    fetchData(`${API_URL}/admin/login`, { user, password })
  }

  useEffect(() => {
    if (data) {
      dispatch(setAuth(data))
      navigate('/')
    }
  }, [data])

  return (
    <form
      onSubmit={handleLogin}
      className='border mt-5 p-4 rounded-3'
    >
      <div className='mb-4'>
        <h3>Login</h3>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control'
          id='floatingInput'
          placeholder='name@example.com'
          name='user'
          required
        />
        <label htmlFor='floatingInput'>Username / Email / Phone number</label>
      </div>
      <div className='form-floating'>
        <input
          type='password'
          className='form-control'
          id='floatingPassword'
          placeholder='Password'
          name='password'
          required
        />
        <label htmlFor='floatingPassword'>Password</label>
      </div>
      {!loading && error && <div className='text-danger'>* {error}</div>}
      <div className='mt-4'>
        <button
          disabled={loading}
          className='btn btn-primary'
        >
          {loading ? 'Processing' : 'Login'}
        </button>
      </div>
    </form>
  )
}

export default LoginForm
