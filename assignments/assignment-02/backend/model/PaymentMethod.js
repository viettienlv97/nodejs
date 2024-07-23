import { Schema, model } from 'mongoose'

const paymentMethodSchema = new Schema({
  name: String
})

const PaymentMethod = model('PaymentMethod', paymentMethodSchema)

export default PaymentMethod
