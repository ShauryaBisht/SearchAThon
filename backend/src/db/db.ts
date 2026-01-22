import express from 'express'
import mongoose from 'mongoose'



const connectDB=async()=>{
     try{
        const connectionInstance=await mongoose.connect(
            process.env.MONGO_DB_URL||""
        )
        console.log(`MongoDB connected`)
     
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
     console.log("DB NAME:", mongoose.connection.name);
    }
     catch(error){
            console.log(`Error in connecting to DB`,error)
     }
}

export {connectDB}