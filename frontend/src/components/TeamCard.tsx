import { useState } from "react"
import { Users } from "lucide-react"
import { Link } from "react-router-dom"
import { MdDelete } from "react-icons/md"
import { useAuth } from "./UserContext"
import axios from "axios"

type Team = {
  _id: string
  name: string
  description: string
  hackathonName: string
  members: any[]
  membersRequired: number
  rolesNeeded: string[]
  joinRequests: {
  _id: string
  fullName: string
}[]
  avatar: string
  createdBy: {
    _id: string
    fullName: string
    role?: string
  }
}

type TeamCardProps = {
  team: Team
  refreshTeams: () => Promise<void>
}

export default function TeamCard({ team, refreshTeams }: TeamCardProps) {
  const { user } = useAuth()
  const userId = user?._id?.toString()
  const isMember = team.members.some(
  (m) => m._id?.toString() === userId
)

const isRequested = team.joinRequests?.some(
  (r) => r._id?.toString() === userId
)

const isOwner = team.createdBy._id.toString() === userId

  const [isProcessing, setIsProcessing] = useState(false)

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/team/${team._id}`, { withCredentials: true })
      await refreshTeams()
    } catch (err) {
      alert("Delete failed")
    }
  }

  const handleJoin = async () => {
    setIsProcessing(true)
    try {
      await axios.post(`http://localhost:8000/api/join/${team._id}`, {}, { withCredentials: true })
      await refreshTeams()
    } catch (err) {
      alert("Request failed")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCancel = async () => {
    setIsProcessing(true)
    try {
      await axios.post(`http://localhost:8000/api/join/cancel/${team._id}`, {}, { withCredentials: true })
      await refreshTeams()
    } catch (err) {
      alert("Cancel failed")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/60 border border-slate-700 rounded-xl p-5 backdrop-blur space-y-4 shadow-md mt-6 transition-all">

      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src={team.avatar || "/avatar.png"}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover border border-slate-600"
          />
          <div>
            <h3 className="text-white font-semibold text-lg">
              {team.createdBy.fullName}
            </h3>
            <p className="text-slate-400 text-sm">
              {team.createdBy.role}
            </p>
          </div>
        </div>

        <Link
          to={`/profile/${team.createdBy._id}`}
          className="text-blue-500 text-sm hover:underline"
        >
          View Profile
        </Link>
      </div>

      <h2 className="text-xl text-white font-semibold">{team.name}</h2>

      <div className="text-sm text-slate-300">
        <p>
          <span className="text-blue-400">Hackathon:</span>{" "}
          {team.hackathonName}
        </p>
        <p>
          <span className="text-blue-400">Slots:</span>{" "}
          {team.members.length} / {team.membersRequired}
        </p>
      </div>

      <p className="text-slate-200 text-sm">{team.description}</p>

      <div className="flex flex-wrap gap-2">
        {team.rolesNeeded.map((role, i) => (
          <span
            key={i}
            className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs"
          >
            {role}
          </span>
        ))}
      </div>

      <div className="border-t border-slate-700 pt-4 flex justify-evenly gap-4">

        <Link
          to={`/teams/${team._id}`}
          className="flex items-center gap-2 border border-slate-600 text-slate-300 py-2 px-4 rounded-lg hover:bg-slate-800 transition"
        >
          <Users size={16} /> View Team
        </Link>

        
        {!isMember && !isRequested && (
  <button onClick={handleJoin} className="bg-green-600/20 text-green-400 border border-green-600/30 py-2 px-6 rounded-lg text-sm font-medium">Join</button>
)}

{isRequested && (
  <button onClick={handleCancel} className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50">Cancel</button>
)}

{isMember && (
  <span className="bg-green-600/20 text-green-400 border border-green-600/30 py-2 px-6 rounded-lg text-sm font-medium">Joined</span>
)}

{isOwner && (
  <button onClick={handleDelete} className="flex items-center bg-red-900/40 gap-2 border border-red-800/50 text-red-200 py-2 px-4 rounded-lg hover:bg-red-700 transition">Delete</button>
)}

      </div>
    </div>
  )
}