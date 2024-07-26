import { useNavigate } from 'react-router-dom'
import ContentWrapper from '../../layouts/ContentWrapper.jsx'
import HotelTable from './HotelTable.jsx'

const HotelList = () => {
  const navigate = useNavigate()
  return (
    <ContentWrapper>
      <div className='d-flex justify-content-between'>
        <h4 className='text-gray'>Hotels List</h4>
        <button
          onClick={() => navigate('/new-hotel')}
          className='btn bg-success-subtle text-success border border-success'
        >
          Add Hotel
        </button>
      </div>
      <HotelTable />
    </ContentWrapper>
  )
}

export default HotelList
