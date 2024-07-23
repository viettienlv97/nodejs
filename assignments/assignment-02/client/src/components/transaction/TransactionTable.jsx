import useFetch from '../../hooks/useFetch.js'
import { HTTP_METHOD, API_URL, TRANSACTION_STATUS } from '../../contants.js'
import { getDate } from '../../utils/helpers.js'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TransactionTable = () => {
  const authUser = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const { fetchData, data, loading, error } = useFetch(HTTP_METHOD.GET)

  useEffect(() => {
    if (authUser) fetchData(`${API_URL}/transaction/${authUser._id}`)
    else navigate('/login')
  }, [])

  const transactions = data

  return (
    <table className='table table-striped table-bordered border-secondary'>
      <thead>
        <tr className='table-primary table-bordered border-secondary'>
          <th style={{ width: '50px' }}>#</th>
          <th>Hotel</th>
          <th>Rooms</th>
          <th>Date</th>
          <th>Price</th>
          <th>Payment Method</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td colSpan={7}>
              <Skeleton />
            </td>
          </tr>
        )}
        {!loading &&
          transactions &&
          transactions.length > 0 &&
          transactions.map((tran, index) => {
            const rooms = []
            tran.rooms.forEach((r) => {
              if (r.roomNumbers.length) rooms.push(...r.roomNumbers)
            })
            const roomsString = rooms.join(', ')
            return (
              <tr key={tran._id}>
                <td>{index + 1}</td>
                <td>{tran.hotel.name}</td>
                <td>{roomsString}</td>
                <td>{`${getDate(new Date(tran.startDate))} - ${getDate(
                  new Date(tran.endDate)
                )}`}</td>
                <td>${tran.price}</td>
                <td>{tran.payment}</td>
                <td>
                  <span
                    className={`text-success p-1 rounded-1
                    ${getStatusStyle(tran.status)}`}
                  >
                    {tran.status}
                  </span>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default TransactionTable

const getStatusStyle = (status) => {
  switch (status) {
    case TRANSACTION_STATUS.BOOKED:
      return 'bg-warning'
    case TRANSACTION_STATUS.CHECKIN:
      return 'bg-success'
    case TRANSACTION_STATUS.CHECKOUT:
      return 'bg-primary'
    default:
      return ''
  }
}
