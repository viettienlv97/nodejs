import { Link } from 'react-router-dom'

const SearchItem = ({ search }) => {
  return (
    <div className='border border-gray border-2 rounded-2 mb-4 p-2'>
      <div className='d-flex'>
        <Link to={'/hotel/' + search._id}>
          <img
            src={
              search.photos[Math.floor(Math.random() * search.photos.length)]
            }
            alt={search.name}
            width={200}
            height={200}
            className='me-3'
          />
        </Link>

        <div className='row w-100'>
          <div className='col-8'>
            <div className=''>
              <Link
                to={'/hotel/' + search._id}
                className='text-decoration-none'
              >
                <h4 className='fw-bold text-primary'>{search.name}</h4>
              </Link>

              <div className='mt-2'>{search.distance}m from center</div>
              {/* <div className='mt-2'>
                <span className='bg-green p-1 rounded-2 text-light'>
                  {search.tag}
                </span>
              </div> */}
              <div className='fw-bold mt-1'>{search.city}</div>
              <div className='mt-1'>{search.address}</div>

              {search.free_cancel && (
                <>
                  <div className='fw-bold text-green mt-1'>
                    Free cancellation
                  </div>
                  <div className='text-green mb-1'>
                    You can cancel later, so lock in this greate price today!
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='col-4'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <div className='d-flex justify-content-between'>
                <div className='fw-bold'>{search.rate_text}</div>
                <div>
                  <span className='bg-secondary text-light p-1'>
                    {search.rating}
                  </span>
                </div>
              </div>
              <div>
                <div className='text-end'>
                  <span className='fs-5 fw-600'>
                    From ${search.cheapestPrice}
                  </span>
                </div>
                <div className='text-gray text-end fs-7'>
                  Includes tax and fees
                </div>
                <div className='w-100 mt-2'>
                  <Link to={'/hotel/' + search._id}>
                    <button className='w-100 btn bg-primary text-light fw-600 py-2'>
                      See availability
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
