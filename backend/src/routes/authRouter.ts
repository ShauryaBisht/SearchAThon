import express, { Router } from 'express'
import { loginUser, signinUser ,getMe, logOut,verifyMagicLink} from '../controllers/auth.Controller.js'
import { verifyJWT } from '../middleware/authmiddleware.js'

const authRouter=Router()
authRouter.post('/signup',signinUser)
authRouter.post('/login',loginUser)
authRouter.get('/verify-link',verifyMagicLink)
authRouter.get('/me',verifyJWT,getMe)
authRouter.post('/logout',verifyJWT,logOut)

export default authRouter