import { Router } from 'express'
import { verifyJWT } from '../middleware/authmiddleware.js';
import { addTeam, deleteTeam, editProfile, getTeamById, getTeams } from '../controllers/user.Controller.js';

const userRouter=Router();

userRouter.put('/profile/edit',verifyJWT,editProfile)
userRouter.get('/teams',verifyJWT,getTeams)
userRouter.post('/add-team',verifyJWT,addTeam)
userRouter.delete('/team/:teamId',verifyJWT,deleteTeam)
userRouter.get('/team/:teamId',verifyJWT,getTeamById)
export default userRouter