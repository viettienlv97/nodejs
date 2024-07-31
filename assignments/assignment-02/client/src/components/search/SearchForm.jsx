import { useEffect, useState } from 'react'
import OptionInput from './OptionInput'
import DestinationInput from './DestinationInput'
import DateRange from '../daterange/DateRange'
import { getDate } from '../../utils/helpers.js'
import useFetch from '../../hooks/useFetch.js'
import { HTTP_METHOD } from '../../contants.js'
import { useDispatch } from 'react-redux'
import { hotelListActions } from '../../store/searchedList.js'

const SearchForm = () => {
  //hooks
  const dispatch = useDispatch()
  const { fetchData: searchHotel, data, loading } = useFetch(HTTP_METHOD.POST)

  //state
  const [showDateRange, setShowDateRange] = useState(false)
  const [searchOption, setSearchOption] = useState({
    minPrice: '',
    maxPrice: '',
    adult: '',
    children: '',
    room: 1
  })
  const [destination, setDestination] = useState('')
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  //useEffect
  useEffect(() => {
    if (data) {
      dispatch(hotelListActions.setAuth(data))
    }
    if (loading) {
      dispatch(hotelListActions.clearAuth())
    }
  }, [data, loading])

  //methods
  const handleSearchHotels = (e) => {
    e.preventDefault()

    searchHotel(`${import.meta.env.VITE_API_URL}/hotel/search`, {
      destination,
      searchOption: {
        minPrice:
          +searchOption.minPrice > 0 ? +searchOption.minPrice : undefined,
        maxPrice:
          +searchOption.maxPrice > 0 ? +searchOption.maxPrice : undefined,
        adult: +searchOption.adult > 0 ? +searchOption.adult : undefined,
        children:
          +searchOption.children > 0 ? +searchOption.children : undefined,
        room: searchOption.room
      }
    })
  }

  //render
  return (
    <form onSubmit={handleSearchHotels}>
      <h1 className='text-dark fw-bold'>Search</h1>
      <DestinationInput
        destination={destination}
        setDestination={setDestination}
      />
      <div className='mb-3 d-flex flex-column position-relative'>
        <label
          htmlFor='checkin-input'
          className='fs-5 mb-2'
          onClick={() => setShowDateRange((pre) => !pre)}
        >
          Check-in Date
        </label>
        <div
          role='button'
          className='bg-light border border-dark p-2'
          onClick={() => setShowDateRange((pre) => !pre)}
        >
          <span className='fw-600'>
            {getDate(selectionRange.startDate) +
              ' to ' +
              getDate(selectionRange.endDate)}
          </span>
        </div>
        {showDateRange && (
          <div className='position-absolute top-100'>
            <DateRange
              setShowDateRange={setShowDateRange}
              selectionRange={selectionRange}
              setSelectionRange={setSelectionRange}
            />
          </div>
        )}
      </div>
      <div className='mb-3 '>
        <label className='fs-5 mb-2'>Option</label>
        <OptionInput
          id='min-price-input'
          title='Min price per night'
          type={'number'}
          value={searchOption.minPrice}
          changeValue={(minPrice) =>
            setSearchOption({ ...searchOption, minPrice })
          }
        />
        <OptionInput
          id='max-price-input'
          title='Max price per night'
          type={'number'}
          value={searchOption.maxPrice}
          changeValue={(maxPrice) =>
            setSearchOption({ ...searchOption, maxPrice })
          }
        />
        <OptionInput
          id='adult-input'
          title='Adult'
          type={'number'}
          value={searchOption.adult}
          changeValue={(adult) => setSearchOption({ ...searchOption, adult })}
        />

        <OptionInput
          id='children-input'
          title='Children'
          type={'number'}
          value={searchOption.children}
          changeValue={(children) =>
            setSearchOption({ ...searchOption, children })
          }
        />

        <OptionInput
          id='room-input'
          title='Room'
          type={'number'}
          value={searchOption.room}
          changeValue={(room) => setSearchOption({ ...searchOption, room })}
          required={true}
        />
      </div>
      <div className='mt-3'>
        <button className='border-none bg-primary w-100 text-light py-2'>
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchForm
