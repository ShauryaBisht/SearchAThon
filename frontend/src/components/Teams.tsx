import { useState, useEffect } from "react"
import TeamCard from "./TeamCard"
import { Button } from "./ui/button"
import axios from "axios"
import { Input } from "./ui/input"
import { NavLink } from "react-router-dom"
import { useSocket } from "./Socket"

function Teams() {
  const [teams, setTeams] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const { socket } = useSocket() 
  const fetchTeams = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/teams", {
          params: search ? { search } : {},
          withCredentials: true
        }
      )
      setTeams(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  
  useEffect(() => {
    fetchTeams()
  }, [search])

  
  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (data: any) => {
      console.log("WebSocket event received in list:", data);
      if (data.type === "ACCEPTED" || data.type === "REJECTED" || data.type === "TEAM_DELETED") {
        fetchTeams();
      }
    };

    socket.on("request_update", handleUpdate);

    return () => {
      socket.off("request_update", handleUpdate);
    };
  }, [socket]);

  return (
    <main className="pb-10">
      <h1 className="text-blue-600 text-3xl text-center font-semibold mt-5">
        Teams
      </h1>

      <div className="flex justify-center mt-[2%] gap-4">
        <Input 
          placeholder="Search a Team" 
          className="max-w-xs" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
        <NavLink to="/add-team">
          <Button>Add Team +</Button>
        </NavLink>
      </div>

      <div className="space-y-6 mt-6">
        {teams.length > 0 ? (
          teams.map((team) => (
            <TeamCard 
              key={team._id} 
              team={team} 
              refreshTeams={fetchTeams}
            />
          ))
        ) : (
          <p className="text-center text-slate-500 mt-10">No teams found.</p>
        )}
      </div>
    </main>
  )
}

export default Teams