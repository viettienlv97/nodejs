import footer from '../../../data/footer.json'

const Footer = () => {
  return (
    <section
      id='footer'
      className='mt-4 mb-5'
    >
      <div className='container'>
        <div className='row'>
          {footer.map((col, i) => {
            return (
              <div
                key={i}
                className='col-custom'
              >
                <div>
                  {col.col_values.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        className='text-primary'
                      >
                        {item}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Footer
