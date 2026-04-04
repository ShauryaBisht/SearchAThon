import express from "express"
import dotenv from "dotenv"
dotenv.config({ path: "./.env" })
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectRedis } from "./config/redis.js"
import { connectDB } from "./db/db.js"
import authRouter from "./routes/authRouter.js"
import userRouter from "./routes/userRouter.js"
import { Server } from "socket.io"
import http from 'http'

const app = express()


const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }
});

export const userSockets = new Map<string, string>();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;
  
  if (userId) {
    userSockets.set(userId, socket.id);
    console.log(`User ${userId} connected with socket ${socket.id}`);
  }

  socket.on("disconnect", () => {
    if (userId) {
      userSockets.delete(userId);
      console.log(`User ${userId} disconnected`);
    }
  });
});


app.use((req: any, res, next) => {
  req.io = io;
  req.userSockets = userSockets;
  next();
});

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
app.use("/api", userRouter)

const PORT = Number(process.env.PORT) || 8000;


const startServer = async () => {
  try {
    await connectRedis();
    await connectDB();
    
    server.listen(PORT, () => {
      console.log(`Server & WebSockets running on PORT: ${PORT}`);
    });
  } catch (err) {
    console.log("Initialization error:", err);
  }
};

startServer();

export { io };