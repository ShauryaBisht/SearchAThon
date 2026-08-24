import { User } from "../models/UserSchema.js";
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {Request,Response} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { redisClient } from "../config/redis.js";
import crypto from "crypto"
import { sendEmail } from "../utils/sendEmail.js";
import validator from "validator"
import dns from "dns/promises"


interface DecodedToken extends JwtPayload {
    userId: string;
    email: string;
}

const validateEmail=async(email:string):Promise<{isValid:boolean; message?:string}>=>{
   if(!validator.isEmail(email)){
        return {isValid:false,message:"Please provide a valid email format"}
   }
   const domain=email.split('@')[1];
   try{
     const mxRecords=await dns.resolveMx(domain)
     if(!mxRecords||mxRecords.length===0){
       return {isValid:false,message:"Email domain is invalid"}
     }
   }catch(err){
      return {isValid:false,message:"Email domain does not exist"}
   }
   return {isValid:true}
}
const generateAccessAndRefreshTokens=async(userId:any)=>{
    try {
        const user=await User.findById(userId)
        if(!user) throw new ApiError(404,"User not found");
       const accessToken= user.generateAccessToken()
       const refreshToken= user.generateRefreshToken()
         user.refreshToken=refreshToken
       await user.save({validateBeforeSave:false})
       return {accessToken,refreshToken}
    } catch (error) {
        throw error
    }
}

const signinUser=asyncHandler(async(req:Request,res:Response)=>{
    const {fullName,email,password,confirmPassword} =req.body
    if(!fullName||!email||!password||!confirmPassword){
        throw new ApiError(400,"All fields are required")
    }
    
    if(password!=confirmPassword)
         throw new ApiError(400,"The password does not match")

    const normalizedEmail = validator.normalizeEmail(email) || email.trim().toLowerCase()

    const emailValidation = await validateEmail(normalizedEmail);
    if (!emailValidation.isValid) {
    throw new ApiError(400, emailValidation.message || "Invalid email address");
    }
     const existingUser = await User.findOne({ email:normalizedEmail })
              if (existingUser) {
                 throw new ApiError(409,"User already exists")
              }
    const user=await User.create({fullName:fullName.trim(),email:normalizedEmail,password,isVerified:false})
    if(!user) 
        throw new ApiError(400,"User not created")
   const verificationToken = crypto.randomBytes(32).toString("hex")

    await redisClient.set(`verify_token:${verificationToken}`, normalizedEmail, {
    EX: 3600 
    })
    const verificationUrl = `http://localhost:5173/verify?token=${verificationToken}`
  try{
     await sendEmail(normalizedEmail,verificationUrl)
  }
  catch(err:any){
    console.log("Email service error:", err)
  }
   const createdUser = await User.findById(user._id).select("-password -refreshToken")

    return res.status(201).json(new ApiResponse(201,createdUser,"User created successfully, Please check your mail to verify your account"))

})
const loginUser=asyncHandler(async(req:Request,res:Response)=>{
    const {email,password}=req.body

    if(!email || !password)
         throw new ApiError(400,"All fields is required")
    const normalizedEmail = validator.normalizeEmail(email) || email.trim().toLowerCase()
    const user=await User.findOne({email:normalizedEmail})
    if(!user)
         throw new ApiError(404,"User not Found")
    
if (!user.isVerified) {
        throw new ApiError(403, "Please verify your email before logging in")
    }

    const correctPassword= await user.isPasswordCorrect(password)
       if(!correctPassword)
          throw new ApiError(400,"Incorrect password")
     
    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)

    const loggedInUser= await User.findById(user._id).select("-password -refreshToken")

    const options={
               httpOnly:true,
               secure:false,
               sameSite: "lax" as const
           }
           return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options)
           .json(
               new ApiResponse(200,{
                   user:loggedInUser,accessToken,refreshToken
               },"User logged in successfully")
           )
})

const refreshAccessToken = asyncHandler(async (req:Request, res:Response) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }
  let decodedToken
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    )as DecodedToken;
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

 
  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Refresh token has been revoked");
  }
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);
  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax" as const
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken },
        "Access token refreshed successfully"
      )
    );
});

const getMe=asyncHandler(async(req:Request,res:Response)=>{
    const user=req.user
    console.log("User found in request:", req.user)
     const cacheKey = `user:profile:${user._id}`
    const cachedUser = await redisClient.get(cacheKey)
    if (cachedUser) {
        console.log("Cache hit")
        return res.status(200).json(
            new ApiResponse(200, JSON.parse(cachedUser), "User fetched from cache")
        )
    }
    console.log("Cache miss")
  await redisClient.set(
        cacheKey,
        JSON.stringify(user),
        { EX: 3600 }
    )

    res.status(200).json(new ApiResponse(200,user,"User found successfully"))
})

const logOut=asyncHandler(async(req:Request,res:Response)=>{
   await  User.findByIdAndUpdate(req.user._id,
          {
              $set:{refreshToken:undefined}
          },
          {
              new:true
          }
        )
        await redisClient.del(`user:profile:${req.user._id}`)
        const options={
          httpOnly:true,
          secure:false
      }
      return res.status(200).clearCookie("accessToken",options)
      .clearCookie("refreshToken",options)
      .json(new ApiResponse(200,{},"User logged out"))
  })

  const verifyMagicLink = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query

    if (!token) throw new ApiError(400, "Token is missing")

  
    const email = await redisClient.get(`verify_token:${token}`)

    if (!email) {
        throw new ApiError(400, "Link is invalid or has expired")
    }

  
    const user = await User.findOneAndUpdate(
        { email },
        { $set: { isVerified: true } },
        { new: true }
    )

    if (!user) throw new ApiError(404, "User no longer exists")
    await redisClient.del(`verify_token:${token}`)

    return res.status(200).json(
        new ApiResponse(200, null, "Email verified successfully! You can now log in.")
    )
})

export {signinUser,loginUser,getMe,logOut,verifyMagicLink,refreshAccessToken}