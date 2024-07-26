import { useNavigate } from 'react-router-dom'
import ContentWrapper from '../../layouts/ContentWrapper.jsx'
import RoomTable from './RoomTable.jsx'

const RoomList = () => {
  const navigate = useNavigate()
  return (
    <ContentWrapper>
      <div className='d-flex justify-content-between'>
        <h4 className='text-gray'>Rooms List</h4>
        <button
          onClick={() => navigate('/new-room')}
          className='btn bg-success-subtle text-success border border-success'
        >
          Add Room
        </button>
      </div>
      <RoomTable />
    </ContentWrapper>
  )
}

export default RoomList
