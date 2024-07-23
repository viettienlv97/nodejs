import { useState } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import DateRange from '../daterange/DateRange'
import { getDate } from '../../utils/helpers.js'

const Search = () => {
  const [showDateRange, setShowDateRange] = useState(false)
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  return (
    <div
      className='container'
      style={{ bottom: '0' }}
    >
      <div
        className={`px-4 border bg-light border-warning border-3 rounded ${styles.searchBox}  position-relative`}
        style={{ zIndex: 1 }}
      >
        <div className='my-1 d-flex justify-content-between align-items-center text-dark '>
          <div className='text-gray'>
            <label htmlFor='place-input'>
              <span className='fa fa-bed me-2'></span>
            </label>
            <input
              id='place-input'
              type='text'
              className='input border-none bg-light'
              placeholder='Where are you going?'
            />
          </div>
          <div
            className='text-gray'
            style={{ zIndex: 2 }}
          >
            <span className='fa fa-calendar'></span>
            <span
              onClick={() => setShowDateRange((pre) => !pre)}
              role='button'
            >
              {' '}
              {getDate(selectionRange.startDate)} to{' '}
              {getDate(selectionRange.endDate)}
            </span>
            {showDateRange && (
              <div
                className='position-absolute'
                style={{ zIndex: 2 }}
              >
                <DateRange
                  setShowDateRange={setShowDateRange}
                  selectionRange={selectionRange}
                  setSelectionRange={setSelectionRange}
                />
              </div>
            )}
          </div>
          <div className='text-gray'>
            <span className='fa fa-male'></span>
            <span> 1 adult - 1 children - 1 room</span>
          </div>
          <div>
            <Link to={'/search'}>
              <button className='bg-primary text-light p-2 border-none'>
                Search
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
