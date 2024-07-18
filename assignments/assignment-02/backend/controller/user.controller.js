import User from '../model/User.js'
import { responseSuccess, responseFail } from '../utils/response.js'

const postLogin = (req, res) => {
  const { user, password } = req.body
  if (!user || !password)
    return responseFail(res, 400, 'Not found email or password')

  User.findOne({
    $or: [{ email: user }, { username: user }, { phoneNumber: user }]
  })
    // .select('username email fullName password isAdmin phoneNumber')
    .then((user) => {
      // console.log(user)
      if (!user) return responseFail(res, 404, 'User not found')

      if (user.password !== password)
        return responseFail(res, 400, 'Password not correct')

      // const data = {
      //   username: user.username,
      //   fullName: user.fullName,
      //   email: user.email,
      //   isAdmin: user.isAdmin
      // }

      return responseSuccess(res, user)
    })
    .catch((err) => {
      console.log(err)
      responseFail(res, 500, 'Server error')
    })
}

const postRegister = (req, res) => {
  const { user } = req.body
  if (!user) return responseFail(res, 400, 'Not found email')

  User.findOne({ email: user })
    .then((u) => {
      if (u) responseFail(res, 406, 'Email already used')
      else responseSuccess(res, user)
    })
    .catch((err) => {
      console.log(err)
      responseFail(res, 500, 'Server error')
    })
}

const postCreateUser = (req, res) => {
  const { user, fullName, username, password, phoneNumber } = req.body
  if (!user || !fullName || !username || !password || !phoneNumber)
    return responseFail(res, 400, 'Invalid Input')

  const newUser = new User({
    email: user,
    username,
    fullName,
    password,
    phoneNumber,
    isAdmin: false
  })
  newUser
    .save()
    .then(() => {
      responseSuccess(res, { username, fullName, phoneNumber, email: user })
    })
    .catch((err) => {
      console.log(err)
      responseFail(res, 500, 'Server error')
    })
}

export default {
  postLogin,
  postRegister,
  postCreateUser
}
