import { User } from "../models/UserSchema.js";
import mongoose from "mongoose";
import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Team } from "../models/TeamSchema.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { redisClient } from "../config/redis.js";


const editProfile=asyncHandler(async(req:Request,res:Response)=>{
   
    
    const user=req.user
    if(!user){
        throw new ApiError(404,"User not Found")
    }
    const {role,experienceLevel,preferredRole,location,bio,skills,linkedin}=req.body
    if(role) user.role=role
    if(experienceLevel) user.experienceLevel=experienceLevel
    if(preferredRole) user.preferredRole=preferredRole
    if(location) user.location=location
    if(bio) user.bio=bio
    if(skills) user.skills=skills
    if(linkedin) user.linkedin=linkedin
      
     await user.save()
    
      await redisClient.del(`user:profile:${user._id}`)

    res.status(200).json(new ApiResponse(200,user,"Profile successfully updated"))
    
})

const addTeam=asyncHandler(async(req:Request,res:Response)=>{
    const {name,description,hackathonName,hackathonLocation,hackathonStartDate,hackathonEndDate,rolesNeeded,membersRequired,avatar,avatarPublicId}=req.body
    if(!name||!hackathonName||!hackathonLocation||!hackathonStartDate||!hackathonEndDate||!rolesNeeded)
          throw new ApiError(400,"Required Field Not Filled")
    const userId = req.user?._id     
  
if (!avatar || !avatarPublicId) {
  throw new ApiError(400, "Avatar is required");
}
  await redisClient.del("teams:feed")
    const team = await Team.create({
    name,
    hackathonDescription:description,
    hackathonName,
    hackathonLocation,
    hackathonStartDate: new Date(hackathonStartDate),
    hackathonEndDate: new Date(hackathonEndDate),
    rolesNeeded,
    membersRequired,
    createdBy: userId,
     avatar,
    avatarPublicId,
    members: [userId], 
  })
    res.status(201).json(new ApiResponse(200,team,"Team created Successfully"))
})

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await User.findById(id).select("-password")

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  res.status(200).json(new ApiResponse(200, user, "Profile fetched"))
})


const getTeams=asyncHandler(async(req:Request,res:Response)=>{

  const search=(req.query.search as string)??""

   const cacheKey ="teams:feed"

  
    if (!search) {
    const cached = await redisClient.get(cacheKey);
    if (cached){
         return res.json(new ApiResponse(200, JSON.parse(cached), "From cache"))
  }}

 let query:any={}

  if(search && search.trim() !== ""){
    query.$or=[
      {name:{$regex:search,$options:"i"}},
      {hackathonName:{$regex:search,$options:"i"}},
      {hackathonLocation:{$regex:search,$options:"i"}},
      {rolesNeeded:{$regex:search,$options:"i"}}
    ]
  }

   const teams=await Team.find(query)
    .populate("createdBy", "fullName role avatar")
    .populate("members", "_id fullName")
    .populate("joinRequests", "_id fullName")
    .sort({ createdAt: -1 })
   if(!search){
    await redisClient.set(cacheKey, JSON.stringify(teams), {
      EX:60
    })
  }
    res.status(200).json(new ApiResponse(200,teams,"Success"))
})

const deleteTeam=asyncHandler(async(req:Request,res:Response)=>{
   const { teamId } = req.params
  const userId = req.user?._id
   if (!teamId) {
    throw new ApiError(400, "Team ID is required")
  }
    const team = await Team.findById(teamId)

  if (!team) {
    throw new ApiError(404, "Team not found")
  }
  if (team.createdBy.toString() !== userId?.toString()) {
    throw new ApiError(403, "Not authorized to delete this team")
  }
   await Team.findByIdAndDelete(teamId)

  res.status(200).json(
    new ApiResponse(200, null, "Team deleted successfully")
  )
  await redisClient.del(`teams:details:${teamId}`)
 await redisClient.del("teams:feed")
})

const getTeamById=asyncHandler(async(req:Request,res:Response)=>{
   const {teamId}=req.params
   const cacheKey=`teams:details:${teamId}`
   const cache= await redisClient.get(cacheKey)
   if(cache){
      return res.status(200).json(new ApiResponse(200,JSON.parse(cache),"Success"))
   }
   const team=await Team.findById(teamId)
   .populate("members", "fullName avatar")
  .populate("createdBy", "fullName avatar role")
  .populate("joinRequests", "fullName avatar")
   if (!team) {
    throw new ApiError(404, "Team not found")
  }
  await redisClient.set(cacheKey,JSON.stringify(team),{
    EX:60
  })
  res.status(200).json(new ApiResponse(200,team,"Success"))
  })

const editTeam=asyncHandler(async(req:Request,res:Response)=>{
  const {teamId}=req.params
   const userId = req.user?._id

  if (!teamId) {
    throw new ApiError(400, "Team ID is required")
  }
  const team = await Team.findById(teamId)
  if (!team) {
    throw new ApiError(404, "Team not found")
  }
  if (team.createdBy.toString() !== userId?.toString()) {
    throw new ApiError(403, "Not authorized to edit this team")
  }

  const {
    name,
    description,
    hackathonName,
    hackathonLocation,
    hackathonStartDate,
    hackathonEndDate,
    rolesNeeded,
    membersRequired,
  } = req.body

  if (name !== undefined) team.name = name
  if (description !== undefined) team.description = description
  if (hackathonName !== undefined) team.hackathonName = hackathonName
  if (hackathonLocation !== undefined) team.hackathonLocation = hackathonLocation
  if (hackathonStartDate !== undefined)
    team.hackathonStartDate = new Date(hackathonStartDate)
  if (hackathonEndDate !== undefined)
    team.hackathonEndDate = new Date(hackathonEndDate)
  if (rolesNeeded !== undefined) team.rolesNeeded = rolesNeeded
  if (membersRequired !== undefined)
    team.membersRequired = membersRequired

  await team.save()

  res.status(200).json(
    new ApiResponse(200, team, "Team updated successfully")
  )
})
const uploadProfilePic = asyncHandler(
  async (req: Request, res: Response) => {

    if (!req.file) {
      throw new ApiError(400, "File upload unsuccessful");
    }

    const cloudinaryresponse = await uploadOnCloudinary(req.file.path);

    if (!cloudinaryresponse) {
      throw new ApiError(500, "Cloudinary upload failed");
    }

    return res.status(200).json({
      imageUrl: cloudinaryresponse.secure_url,
      publicId:cloudinaryresponse.public_id
    });
  }
);
const deleteProfilePic=asyncHandler(async(req:Request,res:Response)=>{
    const {publicId}=req.body
    if(!publicId)
      throw  new ApiError(400,"Public Id required")
    await cloudinary.uploader.destroy(publicId)
    return res.status(200).json(new ApiResponse(200,"Photo deleted successfully"))
})
const uploadTeamPic = asyncHandler(
  async (req: Request, res: Response) => {

    if (!req.file) {
      throw new ApiError(400, "File upload unsuccessful");
    }

    const cloudinaryresponse = await uploadOnCloudinary(req.file.path);

    if (!cloudinaryresponse) {
      throw new ApiError(500, "Cloudinary upload failed");
    }

    return res.status(200).json({
      imageUrl: cloudinaryresponse.secure_url,
      publicId:cloudinaryresponse.public_id
    });
  }
);

const joinTeam = asyncHandler(async (req: Request, res: Response) => {
  const { teamId } = req.params
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  const team = await Team.findById(teamId)

  if (!team) {
    throw new ApiError(404, "Team not found")
  }

  if (team.members.length >= team.membersRequired) {
    throw new ApiError(400, "Team already full")
  }

  if (team.members.some(id => id.toString() === userId.toString())) {
    throw new ApiError(400, "Already a member")
  }

  if (team.joinRequests.some(id => id.toString() === userId.toString())) {
    throw new ApiError(400, "Already requested")
  }

  team.joinRequests.push(userId)
  await team.save()
  await redisClient.del(`teams:details:${teamId}`)
 await redisClient.del("teams:feed")
  res.status(200).json(new ApiResponse(200, null, "Request sent"))
})

const acceptReq = asyncHandler(async (req: Request, res: Response) => {
  const { teamId } = req.params
  const { userId } = req.params
  const currentUserId = req.user?._id

  const user = await User.findById(userId)
  if (!user) throw new ApiError(400, "User does not exist")

  const team = await Team.findById(teamId)
  if (!team) throw new ApiError(400, "Team does not exist")

  if (team.createdBy.toString() !== currentUserId?.toString())
    throw new ApiError(403, "Not authorized for this")

  if (team.members.length == team.membersRequired)
    throw new ApiError(400, "Team full")

  team.joinRequests = team.joinRequests.filter(
    (id) => id.toString() !== userId.toString()
  )

  team.members.push(user._id)
  await team.save()

  await redisClient.del(`teams:details:${teamId}`)
  await redisClient.del("teams:feed")
  res.status(200).json(new ApiResponse(200, null, "User added to team"))
})


const rejectReq=asyncHandler(async(req:Request,res:Response)=>{
   const {teamId}=req.params
   const {userId}=req.params
   const currentUserId = req.user?._id
    const team=await Team.findById(teamId)
  if(!team) throw new ApiError(400,"Team does not exist")
  if (team.createdBy.toString() !== currentUserId?.toString())
     throw new ApiError(403,"Not authorized for this")

  team.joinRequests = team.joinRequests.filter(
  (id) => id.toString() !== userId.toString()
)
      await team.save()
await redisClient.del(`teams:details:${teamId}`)
await redisClient.del("teams:feed")
res.status(200).json(new ApiResponse(200, null, "Request Rejected"))
})

const cancelReq=asyncHandler(async(req:Request,res:Response)=>{
    const {teamId}=req.params
     const currentUserId=req.user?._id
    const team=await Team.findById(teamId)
    if(!team) throw new ApiError(400,"Team does not exist")
    team.joinRequests=team.joinRequests.filter((re)=>re._id.toString()!==currentUserId.toString())
    await team.save()
    await redisClient.del(`teams:details:${teamId}`)
    await redisClient.del("teams:feed")
    res.status(200).json(new ApiResponse(200,"Request successfully cancelled"))
})
const myTeams=asyncHandler(async(req:Request,res:Response)=>{
   const userId=req.user._id
   const user=await User.findById(userId)
   if(!user) throw new ApiError(400,"User does not exist")
   const createdTeams=await Team.find({createdBy:userId}).populate("createdBy", "fullName avatar role")
  const joinedTeams = await Team.find({ members: userId,createdBy: { $ne: userId } 
  }).populate("createdBy", "fullName avatar role")
   const requestedTeams=await Team.find({joinRequests:userId}).populate("createdBy", "fullName avatar role")
   res.status(200).json(new ApiResponse(200,{createdTeams,joinedTeams,requestedTeams},"Successful"))
})

export {editProfile,addTeam,getTeams,deleteTeam,getTeamById,editTeam,uploadProfilePic,deleteProfilePic,uploadTeamPic,getUserProfile,joinTeam
  ,acceptReq,rejectReq,cancelReq,myTeams
}