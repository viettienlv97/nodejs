import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch.js'
import { HTTP_METHOD, API_URL } from '../../contants.js'
import { useDispatch, useSelector } from 'react-redux'
import { bookingActions } from '../../store/booking.js'

const Process = ({ handleBooking }) => {
  const { fetchData, data, loading } = useFetch(HTTP_METHOD.GET)
  const total = useSelector((state) => state.booking.total)
  const selectedPayment = useSelector((state) => state.booking.payment)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchData(`${API_URL}/payment`)
  }, [])

  const payments = data

  return (
    <div className='mb-4'>
      <h4 className='fw-bold'>Total Bill: ${total}</h4>
      <div className='row'>
        <div className='col-4'>
          <div className='dropdown'>
            <button
              className='btn btn-secondary dropdown-toggle w-75 bg-light text-dark py-2'
              type='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              {selectedPayment ? selectedPayment.name : 'Select Payment Method'}
            </button>
            <ul className='dropdown-menu'>
              {loading && (
                <li>
                  <div className='dropdown-item'>Loading payment...</div>
                </li>
              )}

              {!loading &&
                payments &&
                payments.map((p) => {
                  return (
                    <li
                      key={p._id}
                      onClick={() => dispatch(bookingActions.setPayment(p))}
                    >
                      <div
                        role='button'
                        className={`dropdown-item ${
                          selectedPayment?._id === p._id ? 'active' : undefined
                        }`}
                      >
                        {p.name}
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
        <div className='col-4'>
          <button
            onClick={handleBooking}
            className='btn btn-primary w-50 fw-bold py-2'
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Process
