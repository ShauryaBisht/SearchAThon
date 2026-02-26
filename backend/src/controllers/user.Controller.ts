import { User } from "../models/UserSchema.js";
import mongoose from "mongoose";
import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Team } from "../models/TeamSchema.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { v2 as cloudinary } from "cloudinary";


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
    
    res.status(200).json(new ApiResponse(200,user,"Profile successfully updated"))
    
})

const addTeam=asyncHandler(async(req:Request,res:Response)=>{
    const {name,description,hackathonName,hackathonLocation,hackathonStartDate,hackathonEndDate,rolesNeeded,membersRequired,avatar,avatarPublicId}=req.body
    if(!name||!hackathonName||!hackathonLocation||!hackathonStartDate||!hackathonEndDate||!rolesNeeded)
          throw new ApiError(400,"Required Field Not Filled")
    const userId = req.user?._id     
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

const getTeams=asyncHandler(async(req:Request,res:Response)=>{
    const teams=await Team.find()
    .populate("createdBy", "userId fullName role avatar")
    .sort({ createdAt: -1 })
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
   await Team.findByIdAndDelete(teamId)

  res.status(200).json(
    new ApiResponse(200, null, "Team deleted successfully")
  )
})

const getTeamById=asyncHandler(async(req:Request,res:Response)=>{
   const {teamId}=req.params
   const team=await Team.findById(teamId)
   .populate("members", "fullName avatar")
  .populate("createdBy", "fullName avatar role")
   if (!team) {
    throw new ApiError(404, "Team not found")
  }
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

export {editProfile,addTeam,getTeams,deleteTeam,getTeamById,editTeam,uploadProfilePic,deleteProfilePic,uploadTeamPic}