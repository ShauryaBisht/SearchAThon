import mongoose, { model } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
interface IUser{
    fullname:string,
    email:string,
    password:string,
    refreshToken:string
}


const userSchema=new mongoose.Schema<IUser>({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken: {
            type: String
        }
},{timestamps:true})

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return
      this.password= await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect=async function(password:string){
   return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateRefreshToken=async function(){
      return jwt.sign({
           userId:this._id,
           email:this.email,
           fullName:this.fullName
      },
       process.env.ACCESS_TOKEN_SECRET,{
          expiresIn:process.env.ACCESS_TOKEN_EXPIRY
       }
      )
}
userSchema.methods.generateRefreshToken=function(){
   return jwt.sign({
      userId:this._id,
   },
    process.env.REFRESH_TOKEN_SECRET,{
       expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )}




export const User=model<IUser>("User",userSchema)
