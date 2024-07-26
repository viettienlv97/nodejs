import LoginForm from './LoginForm.jsx'

const Login = () => {
  return (
    <section
      id='login'
      className='vh-100'
    >
      <div className='row justify-content-center'>
        <div className='col-4'>
          <LoginForm />
        </div>
      </div>
    </section>
  )
}

export default Login
