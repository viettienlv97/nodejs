import React from 'react'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker } from 'react-date-range'

const DateRange = ({ setShowDateRange, selectionRange, setSelectionRange }) => {
  const handleChange = (ranges) => {
    setSelectionRange(ranges.selection)
  }
  const closeDateRange = () => {
    setShowDateRange(false)
  }

  return (
    <div className='border border-dark bg-light'>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleChange}
        color='red'
        direction='horizontal'
      />
      <div className='d-flex justify-content-end'>
        <button
          onClick={closeDateRange}
          className='btn'
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default DateRange
