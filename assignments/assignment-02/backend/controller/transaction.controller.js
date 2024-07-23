import Transaction from '../model/Transaction.js'
import { responseSuccess, responseFail } from '../utils/response.js'

const postCreateTransaction = (req, res) => {
  const { createrId, transaction } = req.body

  if (!createrId) return responseFail(res, 400, 'Missing creater Id')

  if (!transaction) return responseFail(res, 400, 'Missing transaction info')

  const { info, dateRanges, hotel, hotelRooms, payment, total } = transaction
  if (!info || !dateRanges || !hotel || !hotelRooms || !payment || !total)
    return responseFail(res, 400, 'Missing params')

  const newTran = new Transaction({
    creater: createrId,
    info,
    hotel,
    rooms: hotelRooms,
    startDate: dateRanges.startDate,
    endDate: dateRanges.endDate,
    price: total,
    payment: payment.name,
    status: 'Booked'
  })
  newTran
    .save()
    .then((result) => responseSuccess(res, result))
    .catch((err) => {
      console.log(err)
      responseFail(res, 500, 'Server error')
    })
}

const getUserTransactions = (req, res) => {
  const { userId } = req.params
  if (!userId) return responseFail(res, 400, 'Missing userId param')

  Transaction.find({ creater: userId })
    .sort({ startDate: 1 })
    .populate('hotel')
    .then((transactions) => responseSuccess(res, transactions))
    .catch((err) => {
      console.log(err)
      responseFail(res, 500, 'Server error')
    })
}

export default {
  postCreateTransaction,
  getUserTransactions
}
