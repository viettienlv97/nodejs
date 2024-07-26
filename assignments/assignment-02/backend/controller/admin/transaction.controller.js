import { responseFail, responseSuccess } from '../../utils/response.js'
import Transaction from '../../model/Transaction.js'

const getLatestTransactions = (req, res) => {
  Transaction.find()
    .populate(['hotel', 'creater'])
    .sort({ createdAt: -1 })
    .limit(8)
    .then((trans) => responseSuccess(res, trans))
    .catch((err) => {
      console.log(6, err)
      responseFail(res, 404, 'Fail')
    })
}

const getAllTransactions = (req, res) => {
  Transaction.find()
    .populate(['hotel', 'creater'])
    .sort({ createdAt: -1 })
    .then((trans) => responseSuccess(res, trans))
    .catch((err) => {
      console.log(6, err)
      responseFail(res, 404, 'Fail')
    })
}

export default { getLatestTransactions, getAllTransactions }
