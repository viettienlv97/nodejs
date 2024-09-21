import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: String,
  password: String,
  fullName: String,
  phoneNumber: String,
  email: String,
  isAdmin: Boolean,
  idCard: String
})

const User = model('user', userSchema)
export default User