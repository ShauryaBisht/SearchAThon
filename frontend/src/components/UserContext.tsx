import { createContext, useContext, useEffect, useState} from "react"
import type { ReactNode } from "react";
import axios from "axios"

type User = string | null;

type AuthContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>
  loading: boolean;
};

const UserContext = createContext<AuthContextType | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchMe = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/me", {
        withCredentials: true,
      })
      setUser(res.data.user)
    } catch (err: any) {
  if (err.response?.status !== 401) {
    console.error(err);
  }
  setUser(null);
 } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchMe()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error("useAuth must be used inside UserProvider")
  return context
};
