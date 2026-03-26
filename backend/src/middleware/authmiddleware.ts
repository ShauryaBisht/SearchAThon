import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/UserSchema.js";
import { ApiError } from "../utils/ApiError.js";

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

interface JwtPayload {
    userId: string;
}

export const verifyJWT = async ( req: Request, res: Response, next: NextFunction
) => {
    try {
        const token = req.cookies?.accessToken

        if (!token) {
            return next(new ApiError(401, "No token provided. Please log in."));
        }
        const decoded = jwt.verify(
            token, 
            process.env.ACCESS_TOKEN_SECRET as string
        ) as JwtPayload;
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return next(new ApiError(401, "User no longer exists."));
        }
        req.user = user;
        next();

    } catch (error: any) {
        console.error("Auth Error:", error.message);
        return next(new ApiError(401, "Session expired or invalid token."));
    }
};