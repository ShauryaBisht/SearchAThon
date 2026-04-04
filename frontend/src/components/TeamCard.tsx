import { useState, useEffect } from "react"
import { Users } from "lucide-react"
import { Link } from "react-router-dom"
import { MdDelete } from "react-icons/md"
import { useAuth } from "./UserContext"
import { useSocket } from "./Socket" 
import axios from "axios"

type Team = {
  _id: string
  name: string
  description: string
  hackathonName: string
  hackathonLocation: string
  hackathonStartDate: string
  hackathonEndDate: string
  members: any[] 
  membersRequired: number
  joinRequests: Array<any> 
  rolesNeeded: string[]
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
  const { socket } = useSocket()
  
  const userId = user?._id?.toString()

  const [isProcessing, setIsProcessing] = useState(false)
  const [localHasRequested, setLocalHasRequested] = useState<boolean | null>(null)
  const [wasAcceptedViaSocket, setWasAcceptedViaSocket] = useState(false)

  useEffect(() => {
    if (!socket) return;
    const handleUpdate = (data: { type: string; teamId?: string }) => {
      if (data.type === "ACCEPTED" && data.teamId === team._id) {
        setWasAcceptedViaSocket(true)
        refreshTeams()
      }
    };
    socket.on("request_update", handleUpdate)
    return () => { socket.off("request_update", handleUpdate); }
  }, [socket, team._id, refreshTeams])

 
  const isUserInArray = (array: any[], targetId: string | undefined) => {
    if (!targetId || !array) return false;
    return array.some(item => {
      const id = typeof item === 'string' ? item : item?._id
      return id?.toString() === targetId
    });
  };

  const getStatus = () => {
   
    const isMember = wasAcceptedViaSocket || isUserInArray(team.members, userId)
    if (isMember) return "JOINED";

    
    if (team.createdBy?._id?.toString() === userId) return "OWNER"

    
    if (localHasRequested === true) return "REQUESTED"
    if (localHasRequested === false) return "NOT_JOINED"
    
    if (isUserInArray(team.joinRequests, userId)) return "REQUESTED"

    
    if (team.members.length >= team.membersRequired) return "FULL"

    return "NOT_JOINED"
  };

  const status = getStatus()


  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/team/${team._id}`, { withCredentials: true })
      await refreshTeams();
    } catch (err) { alert("Delete failed") }
  };

  const handleJoin = async () => {
    setIsProcessing(true);
    setLocalHasRequested(true); 
    try {
      await axios.post(`http://localhost:8000/api/join/${team._id}`, {}, { withCredentials: true })
      await refreshTeams()
    } catch (err) {
      setLocalHasRequested(null)
      alert("Request failed")
    } finally { setIsProcessing(false); }
  };

  const handleCancel = async () => {
    setIsProcessing(true)
    setLocalHasRequested(false)
    try {
      await axios.post(`http://localhost:8000/api/join/cancel/${team._id}`, {}, { withCredentials: true })
      await refreshTeams()
    } catch (err) {
      setLocalHasRequested(true)
      alert("Cancel failed");
    } finally { setIsProcessing(false) }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/60 border border-slate-700 rounded-xl p-5 backdrop-blur space-y-4 shadow-md mt-6 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img src={team.avatar || "/avatar.png"} alt="avatar" className="w-12 h-12 rounded-full object-cover border border-slate-600" />
          <div>
            <h3 className="text-white font-semibold text-lg">{team.createdBy.fullName}</h3>
            <p className="text-slate-400 text-sm">{team.createdBy.role}</p>
          </div>
        </div>
        <Link to={`/profile/${team.createdBy._id}`} className="text-blue-500 text-sm hover:underline">View Profile</Link>
      </div>

      <h2 className="text-xl text-white font-semibold">{team.name}</h2>
      <div className="text-sm text-slate-300">
        <p><span className="text-blue-400">Hackathon:</span> {team.hackathonName}</p>
        <p>
          <span className="text-blue-400">Slots:</span> {team.members.length} / {team.membersRequired}
        </p>
      </div>

      <p className="text-slate-200 text-sm">{team.description}</p>

      <div className="flex flex-wrap gap-2">
        {team.rolesNeeded.map((role, i) => (
          <span key={i} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs">{role}</span>
        ))}
      </div>

      <div className="border-t border-slate-700 pt-4 flex justify-evenly gap-4">
        <Link to={`/teams/${team._id}`} className="flex items-center gap-2 border border-slate-600 text-slate-300 py-2 px-4 rounded-lg hover:bg-slate-800 transition">
          <Users size={16} /> View Team
        </Link>

        {status === "OWNER" && (
          <button onClick={handleDelete} className="flex items-center bg-red-900/40 gap-2 border border-red-800/50 text-red-200 py-2 px-4 rounded-lg hover:bg-red-700 transition">
            <MdDelete size={16} /> Delete
          </button>
        )}

        {status === "JOINED" && (
          <span className="bg-green-600/20 text-green-400 border border-green-600/30 py-2 px-6 rounded-lg text-sm font-medium">Joined</span>
        )}

        {status === "REQUESTED" && (
          <button onClick={handleCancel} disabled={isProcessing} className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50">
            {isProcessing ? "Wait..." : "Cancel Request"}
          </button>
        )}

        {status === "FULL" && (
          <span className="bg-slate-800 text-slate-500 py-2 px-4 rounded-lg text-sm">Team Full</span>
        )}

        {status === "NOT_JOINED" && (
          <button onClick={handleJoin} disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50">
            {isProcessing ? "Wait..." : "Join Team"}
          </button>
        )}
      </div>
    </div>
  )
}