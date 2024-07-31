import ContentWrapper from '../../layouts/ContentWrapper.jsx'
import { HTTP_METHOD, API_URL } from '../../contants.js'
import { useState, useEffect } from 'react'
import useFetch from '../../hooks/useFetch.js'
import { MultiSelect } from 'react-multi-select-component'
import { useNavigate, useParams } from 'react-router-dom'
import { mapHotelData } from '../../utils/helpers.js'

const HotelType = [
  {
    value: 'hotel',
    title: 'Hotel'
  },
  {
    value: 'apartment',
    title: 'Apartment'
  },
  {
    value: 'resort',
    title: 'Resort'
  },
  {
    value: 'villa',
    title: 'Villa'
  },
  {
    value: 'cabin',
    title: 'Cabin'
  }
]

const HotelFeature = [
  { value: false, title: 'No' },
  { value: true, title: 'Yes' }
]

const EditHotel = () => {
  const { hotelId } = useParams()
  const navigate = useNavigate()
  const { fetchData: updateHotel, data } = useFetch(HTTP_METHOD.POST)
  const [rooms, setRooms] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())
    if (!rooms.length) return alert('Please select rooms')
    mapHotelData(data, rooms)
    updateHotel(`${API_URL}/admin/hotels/edit/${hotelId}`, data)
  }

  useEffect(() => {
    if (data) navigate('/hotels')
  }, [data])

  return (
    <>
      <ContentWrapper>
        <div className='fs-5 fw-bold text-fade'>Edit Hotel</div>
      </ContentWrapper>
      <ContentWrapper>
        <HotelForm
          hotelId={hotelId}
          handleSubmit={handleSubmit}
          rooms={rooms}
          setRooms={setRooms}
        />
      </ContentWrapper>
    </>
  )
}

export default EditHotel

const HotelForm = ({ hotelId, handleSubmit, rooms, setRooms }) => {
  const {
    fetchData: getHotelDetail,
    data: hotelDetail,
    loading,
    error
  } = useFetch(HTTP_METHOD.GET)
  useEffect(() => {
    getHotelDetail(`${API_URL}/admin/hotels/${hotelId}`)
  }, [])

  useEffect(() => {
    if (hotelDetail)
      setRooms(
        hotelDetail.rooms.map((room) => ({
          label: room.title,
          value: room._id
        }))
      )
  }, [hotelDetail])

  if (loading) return <p>Loading...</p>
  if (!loading && error) return <p>Error: {error}</p>
  if (!loading && hotelDetail)
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
              defaultValue={hotelDetail.name}
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
              defaultValue={hotelDetail.type}
            >
              {HotelType.map((type) => {
                return (
                  <option
                    key={type.value}
                    value={type.value}
                  >
                    {type.title}
                  </option>
                )
              })}
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
              defaultValue={hotelDetail.city}
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
              defaultValue={hotelDetail.address}
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
              defaultValue={hotelDetail.distance}
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
              defaultValue={hotelDetail.title}
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
              defaultValue={hotelDetail.desc}
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
              defaultValue={hotelDetail.cheapestPrice}
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
              defaultValue={hotelDetail.photos.join(',\n\n')}
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
              defaultValue={hotelDetail.featured}
            >
              {HotelFeature.map((feature) => {
                return (
                  <option
                    key={feature.title}
                    value={feature.value}
                  >
                    {feature.title}
                  </option>
                )
              })}
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
