import useFetch from '../../hooks/useFetch.js'
import { HTTP_METHOD, API_URL } from '../../contants.js'
import { getDate } from '../../utils/helpers.js'
import { useEffect } from 'react'

const TransactionTable = ({ url }) => {
  const {
    fetchData,
    data: transactions,
    loading,
    error
  } = useFetch(HTTP_METHOD.GET)

  useEffect(() => {
    fetchData(url)
  }, [])

  return (
    <div className='border border-1 rounded-1 p-1 table-responsive-lg'>
      <table className='table'>
        <TableHead />
        <tbody>
          {loading && (
            <tr>
              <td
                className='fw-bold'
                colSpan={9}
              >
                Loading...
              </td>
            </tr>
          )}
          {!loading && error && (
            <tr>
              <td
                className='fw-bold'
                colSpan={9}
              >
                {error}
              </td>
            </tr>
          )}
          {!loading && transactions?.length === 0 && (
            <tr>
              <td
                className='fw-bold'
                colSpan={9}
              >
                No Transaction
              </td>
            </tr>
          )}
          {!loading &&
            transactions?.length &&
            transactions.map((tran) => {
              return (
                <TableBodyRow
                  key={tran._id}
                  tran={tran}
                />
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable

const TableHead = () => {
  return (
    <thead>
      <tr className='text-gray'>
        <th className='text-center align-middle'>
          <input type='checkbox' />
        </th>
        <th className='text-gray align-middle'>ID</th>
        <th className='text-gray align-middle'>User</th>
        <th className='text-gray align-middle'>Hotel</th>
        <th className='text-gray align-middle'>Room</th>
        <th className='text-gray align-middle'>Date</th>
        <th className='text-gray align-middle'>Price</th>
        <th className='text-gray align-middle'>Payment Method</th>
        <th className='text-gray align-middle'>Status </th>
      </tr>
    </thead>
  )
}

const TableBodyRow = ({ tran }) => {
  return (
    <tr>
      <td className='text-center align-middle'>
        <input type='checkbox' />
      </td>
      <CustomTd>{tran._id}</CustomTd>
      <CustomTd>{tran.creater.fullName}</CustomTd>
      <CustomTd>{tran.hotel.name}</CustomTd>
      <CustomTd>Room</CustomTd>
      <CustomTd>{`${getDate(new Date(tran.startDate))} - ${getDate(
        new Date(tran.endDate)
      )}`}</CustomTd>
      <CustomTd>$ {tran.price}</CustomTd>
      <CustomTd>{tran.payment}</CustomTd>
      <CustomTd>{tran.status}</CustomTd>
    </tr>
  )
}

const CustomTd = ({ children }) => {
  return <td className='align-middle'>{children}</td>
}
