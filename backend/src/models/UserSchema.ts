import mongoose, { Document,Model,Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import  jwt from 'jsonwebtoken'
export interface IUser{
    fullName:string,
    email:string,
    password:string,
    refreshToken?:string,
    role:string,
    experienceLevel:string,
    preferredRole:string,
    location:string,
    bio:string,
    skills:string[],
    github:string,
    linkedin:string,
    twitter:string
}
export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}
type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema=new Schema<IUser, UserModel, IUserMethods>({
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
    },
   role: {
    type: String,
  },

  experienceLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  preferredRole: {
    type: String,
  },

  location: {
    type: String,
  },

  bio: {
    type: String,
    maxlength: 300,
  },

  skills: [
    {
      type: String,
    },
  ],

  github: {
    type: String,
  },

  linkedin: {
    type: String,
  },

  twitter: {
    type: String,
  },
},{timestamps:true})

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return
      this.password= await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect=async function(password:string){
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken =  function() {

  return jwt.sign(
    {
      userId: this._id.toString(),
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn:process.env.ACCESS_TOKEN_EXPIRY as any}
  );
};

userSchema.methods.generateRefreshToken =  function (){
 

  return jwt.sign(
    { userId: this._id.toString() },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn:process.env.REFRESH_TOKEN_EXPIRY as any}
  );
};

export const User = mongoose.model<IUser, UserModel>("User", userSchema);

