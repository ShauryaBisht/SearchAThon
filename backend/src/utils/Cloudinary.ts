import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

    const uploadOnCloudinary=async(localFilePath:string)=>{
        cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
            });
                try {
                    if(!localFilePath)
                        return null
                 const response= await  cloudinary.uploader.upload(localFilePath,{
                        resource_type:"auto"
                    })
                    console.log("file uploaded successfully on cloudinary",response.url);
                    return response
                } catch (error:any) {
                    fs.unlinkSync(localFilePath)  
                    console.error("DETAILED CLOUDINARY ERROR:", error.message || error)
                    return null
                }
    }

    export {uploadOnCloudinary}