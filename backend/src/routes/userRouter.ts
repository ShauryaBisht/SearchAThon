import { Router } from 'express'
import { verifyJWT } from '../middleware/authmiddleware.js';
import { acceptReq, addTeam, cancelReq, deleteProfilePic, deleteTeam, editProfile, editTeam, getTeamById, getTeams, getUserProfile, joinTeam, rejectReq, uploadProfilePic, uploadTeamPic } from '../controllers/user.Controller.js';
import { upload } from '../middleware/multer.js';

const userRouter=Router();

userRouter.put('/profile/edit',verifyJWT,editProfile)
userRouter.get('/teams',verifyJWT,getTeams)
userRouter.get('/profile/:id', verifyJWT, getUserProfile)
userRouter.post('/add-team',verifyJWT,upload.single("avatar"),addTeam)
userRouter.delete('/team/:teamId',verifyJWT,deleteTeam)
userRouter.get('/team/:teamId',verifyJWT,getTeamById)
userRouter.put('/team/edit/:teamId',verifyJWT,editTeam)
userRouter.post('/avatar/upload',upload.single("image"),uploadProfilePic)
userRouter.delete('/avatar/delete',deleteProfilePic)
userRouter.post('/team/avatar/upload',upload.single("image"),uploadTeamPic)
userRouter.post('/join/:teamId',verifyJWT,joinTeam)
userRouter.post('/join/accept/:teamId/:userId',verifyJWT,acceptReq)
userRouter.post('/join/reject/:teamId/:userId',verifyJWT,rejectReq)
userRouter.post('/join/cancel/:teamId',verifyJWT,cancelReq)
export default userRouter