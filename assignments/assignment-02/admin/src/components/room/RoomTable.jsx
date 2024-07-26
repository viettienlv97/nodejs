import { useEffect } from 'react'
import { API_URL, HTTP_METHOD } from '../../contants.js'
import useFetch from '../../hooks/useFetch.js'
import { CustomTh, CustomTd } from '../UI/Table.jsx'

const RoomTable = () => {
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

  const handleDeleteRoom = (roomId) => {
    console.log('delete room ', roomId)
    if (!confirm('Delete this room?')) return
    console.log('deleted')
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
                    <DeleteButton
                      roomId={room._id}
                      handleDeleteRoom={handleDeleteRoom}
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

export default RoomTable

const DeleteButton = ({ roomId, handleDeleteRoom }) => {
  return (
    <button
      onClick={() => handleDeleteRoom(roomId)}
      className='btn bg-danger-subtle border border-danger text-danger'
    >
      Delete
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
