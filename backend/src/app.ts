import express from "express"
import dotenv from "dotenv"
dotenv.config({ path: "./.env" })
import cookieParser from "cookie-parser"
import cors from "cors"

import { connectDB } from "./db/db.js"
import authRouter from "./routes/authRouter.js"
import userRouter from "./routes/userRouter.js"



const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use("/api", authRouter)
app.use("/api",userRouter)

const PORT = Number(process.env.PORT) 

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`)
    })
  })
  .catch((err:any) => {
    console.log("Error occurred", err)
  })
