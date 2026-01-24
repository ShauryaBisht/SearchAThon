import axios from "axios";

const API_URL='http://localhost:8000/api'

type LoginData = {
  email: string
  password: string
}
type SignUpData={
    fullName:string,
    email:string,
    password:string,
    confirmPassword:string
}

export const login=async(data:LoginData)=>{
    const response=await axios.post(`${API_URL}/login`,data,{withCredentials:true})
     return response.data
}

export const signup=async(data:SignUpData)=>{
    const response=await axios.post(`${API_URL}/signup`,data,{withCredentials:true})
    return response.data
}

export const logOut=async()=>{
  const response=await axios.post(`${API_URL}/logout`,{},{withCredentials:true} )
  return response.data;
}