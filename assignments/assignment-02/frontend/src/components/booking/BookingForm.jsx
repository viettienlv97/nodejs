import React, { useState } from 'react'
// import DateRange from '../daterange/DateRange.jsx'
import { DateRange } from 'react-date-range'

const BookingForm = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })
  return (
    <div className='row'>
      <div className='col-4'>
        <div>
          <h5 className='fw-bold'>Dates</h5>
          <DateRange
            minDate={new Date()}
            ranges={[selectionRange]}
            disabledDates={[]}
            // scroll={{ enabled: true }}
            onChange={(ranges) => setSelectionRange(ranges.selection)}
            // selectionRange={selectionRange}
            // setSelectionRange={setSelectionRange}
          />
        </div>
      </div>
      <div className='col-8'>
        <div>
          <form action=''>
            <h5 className='fw-bold'>Reserve Info</h5>
            <div className='mt-3'>
              <label
                htmlFor='booking-fullname'
                className='fw-600 mb-2'
              >
                Your Full Name:
              </label>
              <input
                type='text'
                id='booking-fullname'
                className='form-control rounded-1 p-2'
                required
                name='fullName'
                placeholder='Full Name'
              />
            </div>
            <div className='mt-2'>
              <label
                htmlFor='booking-email'
                className='fw-600 mb-2'
              >
                Your Email:
              </label>
              <input
                type='email'
                id='booking-email'
                className='form-control rounded-1 p-2'
                required
                name='email'
                placeholder='Email'
              />
            </div>
            <div className='mt-2'>
              <label
                htmlFor='booking-phone'
                className='fw-600 mb-2'
              >
                Your Phone Number:
              </label>
              <input
                type='text'
                id='booking-phone'
                className='form-control rounded-1 p-2'
                required
                name='phoneNumber'
                placeholder='Phone Number'
              />
            </div>
            <div className='mt-2'>
              <label
                htmlFor='booking-identity'
                className='fw-600 mb-2'
              >
                Your Identity Cart Number:
              </label>
              <input
                type='text'
                id='booking-identity'
                className='form-control rounded-1 p-2'
                required
                name='identity'
                placeholder='Cart Number'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookingForm
