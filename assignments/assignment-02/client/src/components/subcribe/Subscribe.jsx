const Subscribe = () => {
  return (
    <section
      id='subcribe'
      className='bg-secondary'
    >
      <div className='container pt-5 pb-4'>
        <div className='d-flex flex-column align-items-center text-light'>
          <h1 className='fw-bold fs-2 mb-4'>Save time, save money!</h1>
          <p>Sign up and we'll send the best deals to you</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className='py-3 d-flex align-items-center'>
              <input
                style={{ width: '400px', height: '60px' }}
                type='email'
                className='input me-3 p-2 rounded-3'
                placeholder='Your Email'
              />
              <button
                style={{ height: '60px' }}
                className='p-2 btn bg-primary text-light'
              >
                Subcribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Subscribe
