import { useState,useEffect } from "react"
import TeamCard from "./TeamCard"
import { Button } from "./ui/button"
import axios from "axios"
import { Input } from "./ui/input"
import { NavLink } from "react-router-dom"
function Teams() {
  const [teams, setTeams] = useState<any[]>([])

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/teams",
          { withCredentials: true }
        )
        setTeams(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchTeams()
  }, [teams])

  return (
    <main>
      <h1 className="text-blue-600 text-3xl text-center font-semibold mt-5">
        Teams
      </h1>

      <div className="flex justify-center mt-[2%] gap-4">
        <Input placeholder="Search a Team" className="max-w-xs" />
        <NavLink to="/add-team">
          <Button>Add Team +</Button>
        </NavLink>
      </div>

      <div className="space-y-6 mt-6">
        {teams.map((team) => (
          <TeamCard key={team._id} team={team} />
        ))}
      </div>
    </main>
  )
}

export default Teams