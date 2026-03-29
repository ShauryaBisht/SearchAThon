import { Router } from 'express'
import { verifyJWT } from '../middleware/authmiddleware.js';
import { readLimiter,actionLimiter,uploadLimiter } from '../middleware/rateLimiter.js';
import { acceptReq, addTeam, cancelReq, deleteProfilePic, deleteTeam, editProfile, editTeam, getTeamById, getTeams, getUserProfile, joinTeam, myTeams, rejectReq, uploadProfilePic, uploadTeamPic } from '../controllers/user.Controller.js';
import { upload } from '../middleware/multer.js';

const userRouter=Router();

userRouter.put('/profile/edit',verifyJWT,actionLimiter,editProfile)
userRouter.get('/teams',verifyJWT,readLimiter,getTeams)
userRouter.get('/profile/:id', verifyJWT,readLimiter, getUserProfile)
userRouter.post('/add-team',verifyJWT,upload.single("avatar"),uploadLimiter,addTeam)
userRouter.delete('/team/:teamId',verifyJWT,actionLimiter,deleteTeam)
userRouter.get('/team/:teamId',verifyJWT,readLimiter,getTeamById)
userRouter.put('/team/edit/:teamId',verifyJWT,actionLimiter,editTeam)
userRouter.post('/avatar/upload',upload.single("image"),uploadLimiter,uploadProfilePic)
userRouter.delete('/avatar/delete',actionLimiter,deleteProfilePic)
userRouter.post('/team/avatar/upload',upload.single("image"),uploadLimiter,uploadTeamPic)
userRouter.post('/join/:teamId',verifyJWT,actionLimiter,joinTeam)
userRouter.post('/join/accept/:teamId/:userId',verifyJWT,actionLimiter,acceptReq)
userRouter.post('/join/reject/:teamId/:userId',verifyJWT,actionLimiter,rejectReq)
userRouter.post('/join/cancel/:teamId',verifyJWT,actionLimiter,cancelReq)
userRouter.get('/my-teams',verifyJWT,readLimiter,myTeams)
export default userRouter