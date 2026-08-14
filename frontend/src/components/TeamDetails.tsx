import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "./UserContext"
import { Users, CalendarDays, MapPin,X } from "lucide-react"
import { Button } from "./ui/button"
import { MdDelete, MdEdit } from "react-icons/md"

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
  avatar?: string
  members: {
    _id: string
    fullName: string
    avatar?:string
  }[]
  createdBy: {
    _id: string
    fullName: string
  }
  joinRequests: {
  _id: string
  fullName: string
  avatar?: string
}[]
}

export default function TeamDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [team, setTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)

 const fetchTeam = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/team/${id}`,
          { withCredentials: true }
        )
        setTeam(res.data.data)
      } catch (err) {
        console.error("Failed to fetch team", err)
      } finally {
        setLoading(false)
      }
    }

  useEffect(()=>{
    fetchTeam()
  }, [id])

  const handleAccept = async (userId: string) => {
  const previousTeam = team;
  if (team) {
    const acceptedUser = team.joinRequests.find(u => u._id === userId);
    
    if (acceptedUser) {
      setTeam({
        ...team,
        joinRequests: team.joinRequests.filter(req => req._id !== userId),
        members: [...team.members, { _id: acceptedUser._id, fullName: acceptedUser.fullName }]
      });
    }
  }
  try {
    await axios.post(
      `http://localhost:8000/api/join/accept/${team?._id}/${userId}`,
      {},
      { withCredentials: true }
    );
    
  } catch (err) {
    console.error(err);
    setTeam(previousTeam);
    alert("Failed to accept user. Please try again.");
  }
}
const handleReject = async (userId: string) => {
  try {
    await axios.post(
      `http://localhost:8000/api/join/reject/${team?._id}/${userId}`,
      {},
      { withCredentials: true }
    )

    await fetchTeam() 

  } catch (err) {
    console.log(err)
  }
}
const handleRemoveMember = async (memberId: string, memberName: string) => {
  if (!confirm(`Are you sure you want to remove ${memberName} from the team?`)) {
    return
  }

  const previousTeam = team
  if (team) {
    setTeam({
      ...team,
      members: team.members.filter((m) => m._id !== memberId),
    })
  }

  try {
    await axios.post(
      `http://localhost:8000/api/team/remove/${team?._id}/${memberId}`,
      {},
      { withCredentials: true }
    )
  } catch (err: any) {
    console.error("Failed to remove member:", err.response?.data || err.message)
    setTeam(previousTeam)
    alert("Failed to remove member. Please try again.")
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
    <div className="max-w-4xl mx-auto mt-10 bg-slate-900/60 border border-slate-700 rounded-2xl p-8 backdrop-blur flex flex-col md:flex-row gap-10">
      
      <div className="flex-1 space-y-6">
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

        {team.description && (
          <div>
            <h2 className="text-lg text-blue-500 font-semibold mb-2">
              About This Team
            </h2>
            <p className="text-slate-200">{team.description}</p>
          </div>
        )}

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
  <h2 className="text-lg text-blue-500 font-semibold mb-3 flex items-center gap-2">
    <Users size={18} />
    Members ({team.members.length}/{team.membersRequired})
  </h2>

  <div className="flex flex-wrap gap-2">
            {team.members.map((member) => {
              const canRemove = isCreator && member._id !== team.createdBy._id

              return (
                <div
                  key={member._id}
                  className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-lg text-sm text-slate-200 group"
                >
                  <Link
                    to={`/profile/${member._id}`}
                    className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                  >
                    <img
                      src={member.avatar || "/nopic.jpg"}
                      alt={member.fullName}
                      className="w-5 h-5 rounded-full object-cover border border-slate-600 group-hover:border-blue-400 transition-colors"
                    />
                    <span className="font-medium">{member.fullName}</span>
                  </Link>

                  {canRemove && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member._id, member.fullName)}
                      className="ml-1 p-0.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition"
                      title={`Remove ${member.fullName}`}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        {isCreator && team.joinRequests && team.joinRequests.length > 0 && (
  <div>
    <h2 className="text-lg text-blue-500 font-semibold mb-3">
      Join Requests
    </h2>
    <div className="space-y-3">
      {team.joinRequests.map((reqUser) => (
        <div
          key={reqUser._id}
          className="flex items-center justify-between bg-slate-800 px-4 py-2 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700">
              {reqUser.avatar ? (
                <img
                  src={reqUser.avatar}
                  className="w-full h-full object-cover"
                />
              ) : (<img src="/nopic.jpg" className="w-full h-full object-cover"/>)}
            </div>
            {isCreator && team.joinRequests.length === 0 && (
  <p className="text-slate-400 text-sm">No pending requests</p>
)}
            <p className="text-slate-200">{reqUser.fullName}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
              onClick={() => handleAccept(reqUser._id)}
            >
              Accept
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
              onClick={()=>handleReject(reqUser._id)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        <div className="flex gap-4 pt-4 border-t border-slate-700">

          {isCreator && (
            <>
              <Button
                onClick={handleDelete}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 transition"
              >
                <MdDelete size={16} />
                Delete
              </Button>

              <Link to={`/teams/edit/${team._id}`}>
                <Button>
                  <MdEdit size={16} />
                  Edit
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      
      <div className="flex justify-center md:justify-start">
        <div className="w-50 h-50 rounded-full border border-slate-600 overflow-hidden bg-slate-800 flex items-center justify-center">
          {team.avatar ? (
            <img
              src={team.avatar}
              alt="Team Avatar"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-slate-400 text-sm text-center px-3">
              No Team Avatar
            </span>
          )}
        </div>
      </div>
    </div>
  )
}