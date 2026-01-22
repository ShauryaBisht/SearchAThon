import { User } from "../models/UserSchema.js";
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {Request,Response} from 'express'

const generateAccessAndRefreshTokens=async(userId:string)=>{
    try {
        const user=await User.findById(userId)
       const accessToken= user?.generateAccessToken()
       const refreshToken= user?.generateRefreshToken()
       if(!user) throw new ApiError(404,"User not found");
       user.refreshToken=refreshToken
       await user?.save({validateBeforeSave:false})
       return {accessToken,refreshToken}
    } catch (error) {
        throw error
    }
}

const signinUser=asyncHandler(async(req:Request,res:Response)=>{
    const {fullName,email,password} =req.body
    if(!fullName||!email||!password){
        throw new ApiError(400,"All fields are required")
    }
     const existingUser = await User.findOne({ email });
              if (existingUser) {
                 throw new ApiError(409,"User already exists");
              }
    const user=await User.create({fullName:fullName,email:email,password})
    if(!user) 
        throw new ApiError(400,"User not created")

    return res.status(200).json(new ApiResponse(200,user,"User created successfully"))

})

export {signinUser}