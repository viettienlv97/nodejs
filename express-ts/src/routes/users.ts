import { Router, Request, Response } from 'express'

const router = Router()

router.get('/users', (req: Request, res: Response) => {
  res.send('User list')
})

router.post('/users', (req, res) => {
  console.log(req.body)
  const { user } = req.body

  res.send('User list')
})

router.get('/users/add', (req, res) => {
  res.send(`
    <form action="/api/users" method="POST">
      <input type="text" 
        placeholder="Input user"
        name="user"
      >
      <button type="submit">Submit</button>
    </form>
    `)
})

export default router
