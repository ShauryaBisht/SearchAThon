import express, { Router } from 'express'
import { loginUser, signinUser ,getMe} from '../controllers/auth.Controller.js'
import { verifyJWT } from '../middleware/authmiddleware.js'

const authRouter=Router()
authRouter.post('/signup',signinUser)
authRouter.post('/login',loginUser)
authRouter.get('/me',verifyJWT,getMe)

export default authRouter