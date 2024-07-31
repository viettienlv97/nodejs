import { useEffect } from 'react'
import { API_URL, HTTP_METHOD } from '../../contants.js'
import useFetch from '../../hooks/useFetch.js'
import { CustomTh, CustomTd } from '../UI/Table.jsx'
import { useNavigate } from 'react-router-dom'

const RoomTable = () => {
  const navigate = useNavigate()
  const {
    fetchData: getAllRooms,
    data: roomsList,
    loading: loadingRoomsList,
    error: errorRoomsList
  } = useFetch(HTTP_METHOD.GET)

  const {
    fetchData: deleteRoom,
    data: deleteResult,
    loading: loadingDelete,
    error: errorDelete,
    setError
  } = useFetch(HTTP_METHOD.DELETE)

  useEffect(() => {
    if (!errorDelete) getAllRooms(`${API_URL}/admin/rooms`)
    if (errorDelete) {
      alert('Delete Room: ' + errorDelete)
      setError(null)
    }
  }, [deleteResult, errorDelete])

  const handleEditRoom = (roomId) => navigate(`/rooms/${roomId}`)

  const handleDeleteRoom = (roomId) => {
    if (!confirm('Delete this room?')) return
    deleteRoom(`${API_URL}/admin/rooms/${roomId}`)
  }

  return (
    <div className='border border-1 rounded-1 p-1 table-responsive-lg mt-3'>
      <table className='table'>
        <TableHead />
        <tbody>
          {loadingRoomsList && (
            <tr>
              <td colSpan={7}>Loading...</td>
            </tr>
          )}
          {!loadingRoomsList && errorRoomsList && (
            <tr>
              <td colSpan={7}>{errorRoomsList}</td>
            </tr>
          )}

          {!loadingRoomsList && roomsList?.length === 0 && (
            <tr>
              <td colSpan={7}>No room</td>
            </tr>
          )}
          {!loadingRoomsList &&
            roomsList?.length > 0 &&
            roomsList.map((room) => {
              return (
                <tr key={room._id}>
                  <td className='text-center align-middle'>
                    <input type='checkbox' />
                  </td>
                  <CustomTd>{room._id}</CustomTd>
                  <CustomTd>{room.title}</CustomTd>
                  <CustomTd>{room.desc}</CustomTd>
                  <CustomTd>{room.price}</CustomTd>
                  <CustomTd>{room.maxPeople}</CustomTd>
                  <CustomTd>
                    <div className='d-flex'>
                      <Button
                        title={'Edit'}
                        className={
                          'bg-warning-subtle border-warning text-warning me-2'
                        }
                        roomId={room._id}
                        handleClick={handleEditRoom}
                      />
                      <Button
                        title={'Delete'}
                        className={'bg-danger-subtle border-danger text-danger'}
                        roomId={room._id}
                        handleClick={handleDeleteRoom}
                      />
                    </div>
                  </CustomTd>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default RoomTable

const Button = ({ roomId, handleClick, className, title }) => {
  return (
    <button
      onClick={() => handleClick(roomId)}
      className={`${className} btn border`}
    >
      {title}
    </button>
  )
}

const TableHead = () => {
  return (
    <thead>
      <tr className='text-gray'>
        <th className='text-center align-middle'>
          <input type='checkbox' />
        </th>
        <CustomTh>ID</CustomTh>
        <CustomTh>Title</CustomTh>
        <CustomTh>Description</CustomTh>
        <CustomTh>Price</CustomTh>
        <CustomTh>Max People</CustomTh>
        <CustomTh>Action</CustomTh>
      </tr>
    </thead>
  )
}
