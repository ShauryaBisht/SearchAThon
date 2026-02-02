import { Router } from 'express'
import { verifyJWT } from '../middleware/authmiddleware.js';
import { addTeam, editProfile, getTeams } from '../controllers/user.Controller.js';

const userRouter=Router();

userRouter.put('/profile/edit',verifyJWT,editProfile)
userRouter.get('/teams',verifyJWT,getTeams)
userRouter.post('/add-team',verifyJWT,addTeam)

export default userRouter