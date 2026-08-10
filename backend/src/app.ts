import express from "express"
import dotenv from "dotenv"
import http from 'http'
import { Server } from "socket.io"
import { Socket } from "socket.io";
dotenv.config({ path: "./.env" })

import cookieParser from "cookie-parser"
import cors from "cors"

import { connectRedis } from "./config/redis.js"
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
const server = http.createServer(app)
const io=new Server(server,{
  cors:{
    origin:process.env.CORS_ORIGIN,
    credentials:true
  },
})

app.use("/api", authRouter)
app.use("/api", userRouter)

app.set("io",io)
const PORT = Number(process.env.PORT) || 8000

const startServer = async () => {
  try {
    await connectRedis()
    await connectDB()

    server.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`)
    })
  } catch (err) {
    console.log("Initialization error:", err)
  }
}
const userSocketMap = new Map();

io.on("connection",(socket:Socket)=>{
  const userId=socket.handshake.query.userId
  if(userId && userId!=="undefined"){
    userSocketMap.set(userId,socket.id)
    console.log(`User Connected ${userId}`);
  }
  socket.on("disconnect",()=>{
      if (userSocketMap.get(userId) === socket.id) {
      userSocketMap.delete(userId);
    }
      console.log("User disconnected");
  })
})
app.set("userSocketMap",userSocketMap)


startServer()