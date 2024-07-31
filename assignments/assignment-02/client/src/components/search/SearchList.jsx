import { useDispatch, useSelector } from 'react-redux'
import SearchItem from './SearchItem'
import { useEffect } from 'react'
import useFetch from '../../hooks/useFetch.js'
import { HTTP_METHOD, API_URL } from '../../contants.js'
import { hotelListActions } from '../../store/searchedList.js'

const SearchList = () => {
  //hooks
  const hotelList = useSelector((state) => state.hotelList)
  const dispatch = useDispatch()
  const { fetchData, data } = useFetch(HTTP_METHOD.GET)

  //useEffect
  useEffect(() => {
    if (!data && !hotelList) {
      fetchData(`${API_URL}/hotel/featured`)
    }
    if (data) {
      dispatch(hotelListActions.setAuth(data))
    }
  }, [data])

  //render
  return (
    <div>
      {hotelList?.length > 0 &&
        hotelList.map((search, idx) => {
          return (
            <SearchItem
              search={search}
              key={search._id}
            />
          )
        })}
    </div>
  )
}

export default SearchList
