import { User } from "../models/UserSchema.js";
import mongoose from "mongoose";
import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



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


export {editProfile}