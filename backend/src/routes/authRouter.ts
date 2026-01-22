import express, { Router } from 'express'
import { signinUser } from '../controllers/auth.Controller.js'
const authRouter=Router()


authRouter.post('/signup',signinUser)


export default authRouter