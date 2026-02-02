import mongoose from "mongoose";
import { Types} from "mongoose";


interface Team {
    name: string,
    description?:string,
    members: Types.ObjectId[],
    createdBy: Types.ObjectId,
    hackathonName: string,
    hackathonLocation: string,
    hackathonStartDate: Date,
    hackathonEndDate: Date,
    hackathonDescription?: string,
    rolesNeeded: string[],
    joinRequests: Types.ObjectId[]
}

const teamSchema= new mongoose.Schema<Team>({
     name:{
        required:true,
        type:String
     },
     createdBy:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     },
     members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     }],
     description:{
        required:false,
        type:String
     },
     hackathonName:{
        required:true,
        type:String
     },
     hackathonDescription:{
        required:false,
        type:String
     },
     hackathonLocation:{
        required:true,
        type:String
     },
     hackathonStartDate:{
        required:true,
        type:Date
     },
     hackathonEndDate:{
        required:true,
        type:Date
     },
     rolesNeeded:[{
        required:true,
        type:String
     }],
     joinRequests:[{
        required:false,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     }]
})

export  const Team= mongoose.model<Team>("Team",teamSchema)