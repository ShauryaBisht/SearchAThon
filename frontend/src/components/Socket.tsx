import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from './UserContext'

interface SocketContextType {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user?._id) return;
      
    const s = io("http://localhost:8000", {
      query: { userId: user._id },
      withCredentials: true,
    });

    s.on("connect", () => {
      console.log("WebSocket Connected. ID:", s.id);
      setSocket(s);
    });

    s.on("request_update", (data: { type: string; teamName: string; teamId?: string }) => {
      console.log("Real-time Update Received:", data);
      if (data.type === "ACCEPTED") {
        console.log(`%c Accepted to ${data.teamName}!`, "color: green; font-weight: bold");
      } else if (data.type === "REJECTED") {
        console.log(`%c Rejected from ${data.teamName}`, "color: red; font-weight: bold");
      }
    });

    s.on("disconnect", () => {
      console.log("WebSocket Disconnected");
      setSocket(null);
    });

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);