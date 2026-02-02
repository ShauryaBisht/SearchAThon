import { User } from "../models/UserSchema.js";
import mongoose from "mongoose";
import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Team } from "../models/TeamSchema.js";



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
    const {name,description,hackathonName,hackathonLocation,hackathonStartDate,hackathonEndDate,rolesNeeded}=req.body
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
    createdBy: userId,
    members: [userId], 
  })
    res.status(201).json(new ApiResponse(200,team,"Team created Successfully"))
})

const getTeams=asyncHandler(async(req:Request,res:Response)=>{
    const team=await Team.find();
    res.status(200).json(new ApiResponse(200,team,"Success"))
})

export {editProfile,addTeam,getTeams}