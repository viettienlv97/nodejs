import React from 'react'

const UserForm = ({
  title,
  button,
  handleSubmitForm,
  loading,
  isLogin,
  children,
  error
}) => {
  return (
    <div className='border border-1 rounded-2 p-3'>
      <form onSubmit={handleSubmitForm}>
        <h3 className='fw-bold text-center mb-3'>{title}</h3>
        <div className='mb-3'>
          <input
            type={isLogin ? 'text' : 'email'}
            className='form-control'
            placeholder={isLogin ? 'Email / Username / Phone Number' : 'Email'}
            required
            autoComplete='nope'
            name='user'
          />
          {error && <span className='text-danger'>{error}</span>}
        </div>
        {isLogin && (
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
        )}

        {children}
        <div className='form-action'>
          <button className='btn btn-primary w-100 fw-bold'>
            {!loading ? button : 'Loading...'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserForm
