import ContentWrapper from '../../layouts/ContentWrapper.jsx'
import { HTTP_METHOD, API_URL } from '../../contants.js'
import useFetch from '../../hooks/useFetch.js'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { mapRoomData } from '../../utils/helpers.js'

const EditRoom = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { fetchData: updateRoom, data } = useFetch(HTTP_METHOD.POST)

  useEffect(() => {
    if (data) navigate('/rooms')
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())
    mapRoomData(data)
    updateRoom(`${API_URL}/admin/rooms/edit/${roomId}`, data)
  }

  return (
    <>
      <ContentWrapper>
        <div className='fs-5 fw-bold text-fade'>Edit Room</div>
      </ContentWrapper>
      <ContentWrapper>
        <RoomForm
          roomId={roomId}
          handleSubmit={handleSubmit}
        />
      </ContentWrapper>
    </>
  )
}

export default EditRoom

const RoomForm = ({ roomId, handleSubmit }) => {
  const {
    fetchData: getRoomDetail,
    data: roomDetail,
    loading,
    error
  } = useFetch(HTTP_METHOD.GET)

  useEffect(() => {
    getRoomDetail(`${API_URL}/admin/rooms/${roomId}`)
  }, [])

  if (loading) return <p>Loading...</p>
  if (!loading && error) return <p>Error: {error}</p>
  if (!loading && roomDetail)
    return (
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <Col>
            <label
              htmlFor='add-room-title'
              className='fw-500'
            >
              Title
            </label>
            <input
              id='add-room-title'
              type='text'
              name='title'
              defaultValue={roomDetail.title}
              className='form-control border-0 border-bottom rounded-0'
              placeholder='2 bed room'
              required
            />
          </Col>
          <Col>
            <label
              htmlFor='add-room-desc'
              className='fw-500'
            >
              Description
            </label>
            <input
              id='add-room-desc'
              name='description'
              type='text'
              defaultValue={roomDetail.desc}
              placeholder='description'
              className='form-control border-0 border-bottom rounded-0'
              required
            />
          </Col>
          <Col>
            <label
              htmlFor='add-room-price'
              className='fw-500'
            >
              Price
            </label>
            <input
              id='add-room-price'
              name='price'
              type='number'
              placeholder='100'
              defaultValue={roomDetail.price}
              min={1}
              className='form-control border-0 border-bottom rounded-0'
              required
            />
          </Col>
          <Col>
            <label
              htmlFor='add-room-max-people'
              className='fw-500'
            >
              Max people
            </label>
            <input
              id='add-room-max-people'
              name='maxPeople'
              type='number'
              placeholder='2'
              defaultValue={roomDetail.maxPeople}
              min={1}
              className='form-control border-0 border-bottom rounded-0'
              required
            />
          </Col>
          <Col>
            <label
              htmlFor='add-room-number'
              className='fw-500'
            >
              Rooms
            </label>
            <textarea
              name='rooms'
              required
              defaultValue={roomDetail.roomNumbers}
              placeholder='give comma between room numbers'
              id='add-room-number'
              className='form-control border-1 rounded-0'
            />
          </Col>
        </div>
        <div>
          <button className='btn btn-primary'>Send</button>
        </div>
      </form>
    )
}

const Col = ({ children }) => {
  return <div className='col-6 mb-3'>{children}</div>
}
