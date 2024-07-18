import { Router } from 'express'
import userController from '../controller/user.controller.js'

const userRoute = Router()

userRoute.post('/login', userController.postLogin)
userRoute.post('/register', userController.postRegister)
userRoute.post('/create', userController.postCreateUser)

export default userRoute
