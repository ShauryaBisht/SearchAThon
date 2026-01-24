import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/UserSchema.js";
import { NextFunction, Request,Response } from "express";
import { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    userid: string;
    email: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}
export const verifyJWT = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    )as DecodedToken
    const user = await User.findById(decoded.userid).select("-password");
    if (!user) {
  throw new ApiError(401, "User not found");
}
       req.user = user;
    
    console.log("Cookies:", req.cookies);

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid Access Token");
  }
};
