import {createClient} from 'redis'


export const redisClient=createClient({
    url:'redis://localhost:6379'
})

redisClient.on("error",(err)=>{
    console.log("Redis error",err);
})

export const connectRedis=async()=>{
    if(!redisClient.isOpen){
        await redisClient.connect()
        console.log("Redis connected");
    } 
}