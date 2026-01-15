import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './db/db.js';


dotenv.config({path:'./.env'})
const app=express();


connectDB()
.then(
      app.listen(process.env.PORT,()=>{
           console.log(`Server is running on PORT: ${process.env.PORT}`);
      })
).catch((err)=>{
    console.log("Error occured",err);
})

