import { Users } from "lucide-react"
import { Link } from "react-router-dom"
import { MdDelete } from "react-icons/md"
import { useAuth } from "./UserContext"
import axios from "axios"
type Team = {
  _id:string
  name: string
  description: string
  hackathonName: string
  hackathonLocation: string
  hackathonStartDate: string
  hackathonEndDate: string
  membersRequired: number
  rolesNeeded: string[]
  createdBy: {
    _id: string,
    fullName: string
    avatar?: string
    role?: string
  }
}

export default function TeamCard({ team }: { team: Team }) {
  const {user}=useAuth()

  const handleDelete = async () => {
  

  try {
    await axios.delete(
      `http://localhost:8000/api/team/${team._id}`,
      { withCredentials: true }
    )
   
  } catch (err) {
    console.error("Failed to delete team", err)
  }
}

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/60 border border-slate-700 rounded-xl p-5 backdrop-blur space-y-4 shadow-md mt-6">

      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src={team.createdBy.avatar || "/avatar.png"}
            alt="creator"
            className="w-12 h-12 rounded-full object-cover border border-slate-600"
          />
          <div>
            <h3 className="text-white font-semibold text-lg">{team.createdBy.fullName}</h3>
            <p className="text-slate-400 text-sm">{team.createdBy.role}</p>
          </div>
        </div>

        <Link to={`/profile/${team.createdBy._id}`}><button className="text-blue-500 text-sm font-medium hover:underline">
          View Profile
        </button></Link>
      </div>
      <h2 className="text-xl text-white font-semibold">{team.name}</h2>
      <div className="text-sm text-slate-300 space-y-1">
        <p><span className="text-blue-400 font-medium">Hackathon:</span> {team.hackathonName}</p>
        <p><span className="text-blue-400 font-medium">Location:</span> {team.hackathonLocation}</p>
        <p>
          <span className="text-blue-400 font-medium">Dates:</span>{" "}
          {new Date(team.hackathonStartDate).toLocaleDateString()} – {new Date(team.hackathonEndDate).toLocaleDateString()}
        </p>
      </div>

      <p className="text-slate-200 text-sm leading-relaxed">
        {team.description}
      </p>
      <p className="text-slate-200 text-sm leading-relaxed">{team.membersRequired}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        {team.rolesNeeded.map((role, i) => (
          <span
            key={i}
            className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full"
          >
            {role}
          </span>
        ))}
      </div>

      <div className="border-t border-slate-700" />
      <div className="flex justify-evenly gap-4 text-sm">

        <Link to={`/teams/${team._id}`}><button className="flex items-center gap-2 border border-slate-600 text-slate-300 hover:bg-slate-800 py-2 px-4 rounded-lg transition">
          <Users size={16} />
          View Team
        </button></Link>
       
        <button className= {(user?._id==team.createdBy._id)?"flex items-center bg-red-700 gap-2 border border-slate-600 text-slate-300 hover:bg-red-500 py-2 px-4 rounded-lg transition":"hidden"}
        onClick={handleDelete}>
          <MdDelete size={16} />
          Delete Team
        </button>
        
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
          Join Request
        </button>

      </div>

    </div>
  )
}
