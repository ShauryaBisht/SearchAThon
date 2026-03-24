import { useEffect, useState } from "react"
import axios from "axios"
import TeamCard from "./TeamCard"

type Team = {
  _id: string
  name: string
  description: string
  hackathonName: string
  hackathonLocation: string
  hackathonStartDate: string
  hackathonEndDate: string
  members: string[]
  membersRequired: number
  joinRequests: string[]
  rolesNeeded: string[]
  avatar: string
  createdBy: {
    _id: string
    fullName: string
    role?: string
  }
}

export default function MyTeams() {
    
  const [createdTeams, setCreatedTeams] = useState<Team[]>([])
  const [joinedTeams, setJoinedTeams] = useState<Team[]>([])
  const [requestedTeams, setRequestedTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMyTeams = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/my-teams",
        { withCredentials: true }
      )

      setCreatedTeams(res.data.data.createdTeams)
      setJoinedTeams(res.data.data.joinedTeams)
      setRequestedTeams(res.data.data.requestedTeams)

    } catch (err) {
      console.error("Failed to fetch my teams", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMyTeams()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <main className="max-w-5xl mx-auto mt-10 space-y-10">

      <h1 className="text-3xl text-blue-600 font-semibold text-center">
        My Teams
      </h1>

     
      <Section title="Created by You" teams={createdTeams} fetch={fetchMyTeams} />

      
      <Section title="Joined Teams" teams={joinedTeams} fetch={fetchMyTeams} />

     
      <Section title="Pending Requests" teams={requestedTeams} fetch={fetchMyTeams} />

    </main>
  )
}

function Section({ title, teams, fetch }: any) {
  return (
    <div>
      <h2 className="text-xl text-blue-500 font-semibold mb-4">
        {title}
      </h2>

      {teams.length === 0 ? (
        <p className="text-slate-400 text-sm">
          No teams here yet.
        </p>
      ) : (
        <div className="space-y-6">
          {teams.map((team: any) => (
            <TeamCard key={team._id} team={team} refreshTeams={fetch} />
          ))}
        </div>
      )}
    </div>
  )
}