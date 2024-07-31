import { useEffect } from 'react'
import { HTTP_METHOD, API_URL } from '../../contants.js'
import useFetch from '../../hooks/useFetch.js'
import { CustomTd, CustomTh } from '../UI/Table.jsx'
import { useNavigate } from 'react-router-dom'

const HotelTable = () => {
  const navigate = useNavigate()
  const {
    fetchData: getHotelsList,
    data: hotels,
    loading: loadingHotelsList,
    error: errorGetList
  } = useFetch(HTTP_METHOD.GET)
  const {
    fetchData: deleteHotel,
    data: resultDelete,
    error: errorDelete,
    setError
  } = useFetch(HTTP_METHOD.DELETE)

  useEffect(() => {
    if (!errorDelete) getHotelsList(`${API_URL}/admin/hotels`)
    if (errorDelete) {
      alert('Delete Hotel: ' + errorDelete)
      setError(null)
    }
  }, [resultDelete, errorDelete])

  const handleEditHotel = (hotelId) => {
    navigate('/hotels/' + hotelId)
  }

  const handleDeleteHotel = (hotelId) => {
    const process = confirm('Delete this hotel?')
    if (!process) return

    deleteHotel(`${API_URL}/admin/hotels/${hotelId}`)
  }

  return (
    <div className='border border-1 rounded-1 p-1 table-responsive-lg mt-3'>
      <table className='table'>
        <TableHead />
        <tbody>
          {loadingHotelsList && (
            <tr>
              <td colSpan={7}>Loading...</td>
            </tr>
          )}
          {!loadingHotelsList && errorGetList && (
            <tr>
              <td colSpan={7}>{errorGetList}</td>
            </tr>
          )}
          {!loadingHotelsList && hotels?.length === 0 && (
            <tr>
              <td colSpan={7}>No hotels</td>
            </tr>
          )}
          {!loadingHotelsList &&
            hotels?.length > 0 &&
            hotels.map((hotel) => {
              return (
                <tr key={hotel._id}>
                  <td className='text-center align-middle'>
                    <input type='checkbox' />
                  </td>
                  <CustomTd>{hotel._id}</CustomTd>
                  <CustomTd>{hotel.name}</CustomTd>
                  <CustomTd>{hotel.type}</CustomTd>
                  <CustomTd>{hotel.title}</CustomTd>
                  <CustomTd>{hotel.city}</CustomTd>
                  <CustomTd>
                    <Button
                      className='bg-warning-subtle border-warning text-warning me-2'
                      handleClick={handleEditHotel}
                      hotelId={hotel._id}
                      title={'Edit'}
                    />
                    <Button
                      className={'bg-danger-subtle border-danger text-danger'}
                      handleClick={handleDeleteHotel}
                      hotelId={hotel._id}
                      title={'Delete'}
                    />
                  </CustomTd>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ hotelId, handleClick, className, title }) => {
  return (
    <button
      onClick={() => handleClick(hotelId)}
      className={`${className} btn border`}
    >
      {title}
    </button>
  )
}

export default HotelTable

const TableHead = () => {
  return (
    <thead>
      <tr className='text-gray'>
        <th className='text-center align-middle'>
          <input type='checkbox' />
        </th>
        <CustomTh>ID</CustomTh>
        <CustomTh>Name</CustomTh>
        <CustomTh>Type</CustomTh>
        <CustomTh>Title</CustomTh>
        <CustomTh>City</CustomTh>
        <CustomTh>Action</CustomTh>
      </tr>
    </thead>
  )
}
