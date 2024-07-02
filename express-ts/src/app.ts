import express, { Request, Response, NextFunction } from 'express'
import userRoutes from './routes/users'
import adminRoutes from './routes/admin'
import shopRoutes from './routes/shop'
//import path from 'path'

export const __DIRNAME = __dirname

// Use dotenv
import dotenv from 'dotenv'
import viewsDir from './views'
import path from 'path'
import { engine } from 'express-handlebars'
import { get404 } from './controllers/error'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// app.engine('hbs', engine())
// app.set('view engine', 'hbs')
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
// app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '..', 'public')))

// Example route
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello world!')
// })

app.use(shopRoutes)
app.use('/admin', adminRoutes)

//app.use('/api', userRoutes)

// Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.use(get404)

app.listen(port, () => {
  console.log(`Server is running on port ${port}, http://localhost:${port}`)
})
