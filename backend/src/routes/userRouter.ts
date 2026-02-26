import { Router } from 'express'
import { verifyJWT } from '../middleware/authmiddleware.js';
import { addTeam, deleteProfilePic, deleteTeam, editProfile, editTeam, getTeamById, getTeams, uploadProfilePic, uploadTeamPic } from '../controllers/user.Controller.js';
import { upload } from '../middleware/multer.js';

const userRouter=Router();

userRouter.put('/profile/edit',verifyJWT,editProfile)
userRouter.get('/teams',verifyJWT,getTeams)
userRouter.post('/add-team',verifyJWT,addTeam)
userRouter.delete('/team/:teamId',verifyJWT,deleteTeam)
userRouter.get('/team/:teamId',verifyJWT,getTeamById)
userRouter.put('/team/edit/:teamId',verifyJWT,editTeam)
userRouter.post('/avatar/upload',upload.single("image"),uploadProfilePic)
userRouter.delete('/avatar/delete',deleteProfilePic)
userRouter.post('/team/avatar/upload',upload.single("image"),uploadTeamPic)
export default userRouter