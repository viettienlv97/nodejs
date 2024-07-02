import { Router } from 'express'

const router = Router()
const users = []

router.get('/users', (req, res) => {
  res.status(200).send({
    ok: true,
    data: users
  })
})

router.post('/users/add-user', (req, res) => {
  const { user } = req.body
  console.log(req.body)
  console.log(user)

  if (user) {
    users.push(user)
    res.status(200).send({
      ok: true,
      data: users
    })
  } else {
    res.status(404).send({
      ok: false,
      error: 'User data is missing'
    })
  }
})

export default router
