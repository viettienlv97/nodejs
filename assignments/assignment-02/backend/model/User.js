import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  // _id: Schema.Types.UUID,
  username: String,
  password: String,
  fullName: String,
  phoneNumber: String,
  email: String,
  isAdmin: Boolean,
  idCard: String
})

const User = model('User', userSchema)
export default User
