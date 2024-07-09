import User from '../models/Auth.js'

export const authenticateWithToken = (req, res, next) => {
  const { token } = req.headers
  if (!token)
    return res.status(401).send({
      success: false,
      message: 'Unauthorized'
    })

  const user = User.getAuth(token)
  if (!user) {
    return res.status(401).send({
      success: false,
      message: 'Unauthorized'
    })
  }

  next()
}
