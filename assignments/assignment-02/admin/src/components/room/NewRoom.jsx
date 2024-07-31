import { useEffect } from 'react'
import { API_URL, HTTP_METHOD } from '../../contants.js'
import useFetch from '../../hooks/useFetch.js'
import ContentWrapper from '../../layouts/ContentWrapper.jsx'
import { useNavigate } from 'react-router-dom'
import { mapRoomData } from '../../utils/helpers.js'

const NewRoom = () => {
  const navigate = useNavigate()
  const {
    fetchData: addNewRoom,
    data,
    error,
    loading
  } = useFetch(HTTP_METHOD.POST)

  useEffect(() => {
    if (data) navigate('/rooms')
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())
    mapRoomData(data)
    // data.roomNumbers = data.rooms
    //   .split(',')
    //   .map((number) => (number ? number.trim() : undefined))
    //   .filter((n) => n)
    // data.price = +data.price
    // data.maxPeople = +data.maxPeople
    addNewRoom(`${API_URL}/admin/rooms/add`, data)
  }
  return (
    <>
      <ContentWrapper>
        <div className='fs-5 fw-bold text-fade'>Add New Room</div>
      </ContentWrapper>
      <ContentWrapper>
        <RoomForm handleSubmit={handleSubmit} />
      </ContentWrapper>
    </>
  )
}

export default NewRoom

const RoomForm = ({ handleSubmit }) => {
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
