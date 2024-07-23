import { Link } from 'react-router-dom'

const DetailDesc = ({ detail }) => {
  return (
    <div className='row mb-5'>
      <div className='col-9'>
        <h4 className='fw-bold my-3'>{detail.title}</h4>
        <p>{detail.desc}</p>
      </div>
      <div className='col-3'>
        <div className='bg-sky h-100 p-3'>
          {/* <div className='fw-bold text-gray fs-5'>
            Perfect for a 9-night stay!
          </div>
          <div className='mt-4'>
            Located in the real heart of Krakow, this property has an excellent
            location score of 9.8!
          </div> */}
          <div className='fs-5 mt-4'>
            <span className='fw-bold'>${detail.cheapestPrice} </span>
            <span className='text-gray'>(1 nights)</span>
          </div>
          <div>
            <Link to={'/book/' + detail._id}>
              <button className='btn bg-primary fw-bold text-light w-100 mt-4'>
                Reserve or Book Now!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailDesc
