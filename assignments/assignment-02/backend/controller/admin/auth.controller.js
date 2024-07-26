import { responseSuccess, responseFail } from '../../utils/response.js'
import User from '../../model/User.js'

const postLogin = (req, res) => {
  const { user, password } = req.body
  if (!user) return responseFail(res, 400, 'Missing user param')
  if (!password) return responseFail(res, 400, 'Missing password param')

  User.findOne({
    $or: [{ email: user }, { username: user }, { phoneNumber: user }]
  })
    .then((user) => {
      if (!user) return responseFail(res, 404, 'Not found user')

      if (!user.isAdmin) return responseFail(res, 404, 'Not found user')

      if (password !== user.password)
        return responseFail(res, 400, 'Wrong password')

      return responseSuccess(res, user)
    })
    .catch((err) => {
      console.log('24', err)
      responseFail(res, 400, 'Error')
    })
}

export default {
  postLogin
}
