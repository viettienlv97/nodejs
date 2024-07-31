import { useEffect, useState } from 'react'
import { API_URL, HTTP_METHOD } from '../../contants.js'
import useFetch from '../../hooks/useFetch.js'
import ContentWrapper from '../../layouts/ContentWrapper.jsx'
import { MultiSelect } from 'react-multi-select-component'
import { useNavigate } from 'react-router-dom'
import { mapHotelData } from '../../utils/helpers.js'

const NewHotel = () => {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])
  const { fetchData, data, loading } = useFetch(HTTP_METHOD.POST)

  useEffect(() => {
    if (data) {
      navigate('/hotels')
    }
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())
    if (!rooms.length) return alert('Please select rooms')
    mapHotelData(data, rooms)
    fetchData(`${API_URL}/admin/hotels/add`, data)
  }
  return (
    <>
      <ContentWrapper>
        <div className='fs-5 fw-bold text-fade'>Add New Hotel</div>
      </ContentWrapper>
      <ContentWrapper>
        <HotelForm
          handleSubmit={handleSubmit}
          rooms={rooms}
          setRooms={setRooms}
        />
      </ContentWrapper>
    </>
  )
}

export default NewHotel

const HotelForm = ({ handleSubmit, rooms, setRooms }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <Col>
          <label
            htmlFor='add-hotel-name'
            className='fw-500'
          >
            Name
          </label>
          <input
            id='add-hotel-name'
            type='text'
            name='name'
            className='form-control border-0 border-bottom rounded-0'
            placeholder='My Hotel'
            required
          />
        </Col>
        <Col>
          <label
            htmlFor='add-hotel-type'
            className='fw-500'
          >
            Type
          </label>
          <select
            name='type'
            className='form-select w-50'
            aria-label='Type'
          >
            <option value='hotel'>Hotel</option>
            <option value='apartment'>Apartment</option>
            <option value='resort'>Resort</option>
            <option value='villa'>Villa</option>
            <option value='cabin'>Cabin</option>
          </select>
        </Col>
        <Col>
          <label
            htmlFor='add-hotel-city'
            className='fw-500'
          >
            City
          </label>
          <input
            id='add-hotel-city'
            type='text'
            name='city'
            placeholder='New York'
            className='form-control border-0 border-bottom rounded-0'
            required
          />
        </Col>
        <Col>
          <label
            htmlFor='add-hotel-address'
            className='fw-500'
          >
            Address
          </label>
          <input
            id='add-hotel-type'
            type='text'
            name='address'
            placeholder='elton st, 216'
            className='form-control border-0 border-bottom rounded-0'
            required
          />
        </Col>
        <Col>
          <label
            htmlFor='add-hotel-distance'
            className='fw-500'
          >
            Distance from City Center
          </label>
          <input
            id='add-hotel-distance'
            type='number'
            name='distance'
            min={0}
            placeholder='500'
            className='form-control border-0 border-bottom rounded-0'
            required
          />
        </Col>
        <Col>
          <label
            htmlFor='add-hotel-title'
            className='fw-500'
          >
            Title
          </label>
          <input
            id='add-hotel-title'
            type='text'
            name='title'
            placeholder='The best Hotel'
            className='form-control border-0 border-bottom rounded-0'
            required
          />
        </Col>
        <Col>
          <label
            htmlFor='add-hotel-desc'
            className='fw-500'
          >
            Description
          </label>
          <input
            id='add-hotel-desc'
            name='description'
            type='text'
            placeholder='description'
            className='form-control border-0 border-bottom rounded-0'
            required
          />
        </Col>
        <Col>
          <label
            htmlFor='add-hotel-price'
            className='fw-500'
          >
            Price
          </label>
          <input
            id='add-hotel-price'
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
            htmlFor='add-hotel-images'
            className='fw-500'
          >
            Images
          </label>
          <textarea
            name='images'
            required
            placeholder='give comma between each image link'
            id='add-hotel-images'
            className='form-control border-0 border-bottom rounded-0'
          />
        </Col>
        <Col>
          <label
            htmlFor='add-hotel-images'
            className='fw-500'
          >
            Feature
          </label>
          <select
            name='feature'
            className='form-select w-25'
            aria-label='Default select example'
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </Col>
        <Col className='col-6'>
          <label className='fw-500'>Rooms</label>
          <RoomsSelect
            rooms={rooms}
            setRooms={setRooms}
          />
        </Col>
      </div>
      <div>
        <button className='btn btn-primary'>Send</button>
      </div>
    </form>
  )
}

const RoomsSelect = ({ rooms, setRooms }) => {
  // const [rooms, setRooms] = useState([])
  const { fetchData, data } = useFetch(HTTP_METHOD.GET)

  useEffect(() => {
    fetchData(`${API_URL}/room`)
  }, [])

  const options =
    data && data?.length
      ? data.map((room) => ({ label: room.title, value: room._id }))
      : []

  return (
    <MultiSelect
      className='w-100'
      options={options}
      value={rooms}
      onChange={setRooms}
      labelledBy='Select'
      hasSelectAll={false}
    />
  )
}

const Col = ({ children }) => {
  return <div className='col-6 mb-3'>{children}</div>
}
