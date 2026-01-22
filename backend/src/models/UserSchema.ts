import mongoose, { model,Document } from "mongoose";
import bcrypt from 'bcryptjs'
import  jwt from 'jsonwebtoken'
export interface IUser{
    fullName:string,
    email:string,
    password:string,
    refreshToken?:string
}
export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}
export type UserDocument = IUser & Document & IUserMethods;
const userSchema=new mongoose.Schema<UserDocument>({
    fullName:{
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

userSchema.methods.generateAccessToken = async function() {

  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn:process.env.ACCESS_TOKEN_EXPIRY as any}
  );
};

userSchema.methods.generateRefreshToken = async function (){
 

  return jwt.sign(
    { userId: this._id.toString() },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn:process.env.REFRESH_TOKEN_EXPIRY as any}
  );
};





export const User=model<UserDocument>("User",userSchema)
