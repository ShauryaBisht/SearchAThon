import {createContext,useContext,useEffect,useState, type ReactNode} from "react"
import {io,Socket} from "socket.io-client"
import { useAuth } from "./UserContext"


interface SocketContextType{
    socket:Socket|null
}

const SocketContext=createContext<SocketContextType>({socket:null})


export const useSocket=()=>useContext(SocketContext)

export const SocketProvider=({children}:{children:ReactNode})=>{
         const [socket,setSocket]=useState<Socket|null>(null)
         const {user}=useAuth()

         useEffect(()=>{
            if(user?._id){
                const newSocket=io("http://localhost:8000",{
                    query:{
                        userId:user._id
                    },
                    withCredentials:true
                })
                setSocket(newSocket)
                
                return()=>{
                    newSocket.close()
                }
            }else {
                if(socket){
                    socket.close()
                    setSocket(null)
                }
            }
         },[user?._id])
         return (
           <SocketContext.Provider value={{ socket }}>
              {children}
           </SocketContext.Provider>
  )
}
