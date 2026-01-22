import express, { urlencoded } from 'express';
import dotenv from 'dotenv'
import { connectDB } from './db/db.js';


dotenv.config({path:'./.env'})
const app=express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

connectDB()
.then(
      app.listen(process.env.PORT,()=>{
           console.log(`Server is running on PORT: ${process.env.PORT}`);
      })
).catch((err)=>{
    console.log("Error occured",err);
})

