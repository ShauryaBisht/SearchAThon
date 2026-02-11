import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "./UserContext"
import { Users, CalendarDays, MapPin } from "lucide-react"

type Team = {
  _id: string
  name: string
  description: string
  hackathonName: string
  hackathonLocation: string
  hackathonStartDate: string
  hackathonEndDate: string
  membersRequired: number
  rolesNeeded: string[]
  members: {
    _id: string
    fullName: string
  }[]
  createdBy: {
    _id: string
    fullName: string
  }
}

export default function TeamDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [team, setTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/team/${id}`,{withCredentials:true}
        )
        setTeam(res.data.data)
      } catch (err) {
        console.error("Failed to fetch team", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [id])

  const handleJoin = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/team/join/${id}`,
        {},
        { withCredentials: true }
      )
      alert("Join request sent")
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async () => {
   
    try {
      await axios.delete(
        `http://localhost:8000/api/team/${id}`,
        { withCredentials: true }
      )
      navigate("/teams")
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (!team) return <p className="text-center mt-10">Team not found</p>

  const isCreator = user?._id === team.createdBy._id

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-slate-900/60 border border-slate-700 rounded-2xl p-8 space-y-6 backdrop-blur">

    
      <div>
        <h1 className="text-3xl font-bold text-white">{team.name}</h1>
        <p className="text-slate-400 mt-1">
          Created by {team.createdBy.fullName}
        </p>
      </div>

     
      <div className="space-y-2 text-slate-300 text-sm">
        <p>
          <span className="text-blue-400 font-medium">Hackathon:</span>{" "}
          {team.hackathonName}
        </p>

        <p className="flex items-center gap-2">
          <MapPin size={16} />
          {team.hackathonLocation}
        </p>

        <p className="flex items-center gap-2">
          <CalendarDays size={16} />
          {new Date(team.hackathonStartDate).toLocaleDateString()} –{" "}
          {new Date(team.hackathonEndDate).toLocaleDateString()}
        </p>
      </div>

    
      <div>
        {team.description && <h2 className="text-lg text-blue-500 font-semibold mb-2">
          About This Team
        </h2>}
        <p className="text-slate-200">{team.description}</p>
      </div>

     
      <div>
        <h2 className="text-lg text-blue-500 font-semibold mb-2">
          Roles Needed
        </h2>
        <div className="flex flex-wrap gap-2">
          {team.rolesNeeded.map((role, i) => (
            <span
              key={i}
              className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

     
      <div>
        <h2 className="text-lg text-blue-500 font-semibold mb-2 flex items-center gap-2">
          <Users size={18} />
          Members ({team.members.length}/{team.membersRequired})
        </h2>

        <div className="space-y-1 text-slate-300 text-sm">
          {team.members.map((member) => (
            <p key={member._id}>{member.fullName}</p>
          ))}
        </div>
      </div>

     
      <div className="flex gap-4 pt-4 border-t border-slate-700">

        {!isCreator && (
          <button
            onClick={handleJoin}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white transition"
          >
            Join Team
          </button>
        )}

        {isCreator && (
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-white transition"
          >
            Delete Team
          </button>
        )}
      </div>
    </div>
  )
}
