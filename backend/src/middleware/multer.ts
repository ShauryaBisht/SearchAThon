import multer from "multer";
import { Request } from "express";
import fs from "fs";
import path from "path";


const uploadDir = path.join(process.cwd(), "src", "public", "temp");


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, uploadDir); 
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
   
    const sanitizedName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${uniqueSuffix}-${sanitizedName}`);
  },
});

export const upload = multer({ storage });