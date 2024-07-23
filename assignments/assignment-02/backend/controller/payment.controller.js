import PaymentMethod from '../model/PaymentMethod.js'
import { responseSuccess } from '../utils/response.js'

const getPaymentMethods = (_, res) => {
  PaymentMethod.find().then((payments) => responseSuccess(res, payments))
}

export default {
  getPaymentMethods
}
