import { Router } from 'express'
import { verifyJWT } from '../middleware/authmiddleware.js';
import { editProfile } from '../controllers/user.Controller.js';

const userRouter=Router();

userRouter.put('/profile/edit',verifyJWT,editProfile)

export default userRouter