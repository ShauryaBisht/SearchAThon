import { Router } from 'express'
import { verifyJWT } from '../middleware/authmiddleware.js';
import { addTeam, deleteTeam, editProfile, editTeam, getTeamById, getTeams } from '../controllers/user.Controller.js';

const userRouter=Router();

userRouter.put('/profile/edit',verifyJWT,editProfile)
userRouter.get('/teams',verifyJWT,getTeams)
userRouter.post('/add-team',verifyJWT,addTeam)
userRouter.delete('/team/:teamId',verifyJWT,deleteTeam)
userRouter.get('/team/:teamId',verifyJWT,getTeamById)
userRouter.put('/team/edit/:teamId',verifyJWT,editTeam)
export default userRouter