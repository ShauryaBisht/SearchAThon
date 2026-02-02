import { Input } from "./ui/input"
import { Button } from "./ui/button"
import TeamCard from "./TeamCard"
import { NavLink } from "react-router-dom"
const sampleTeam = {
  name: "CodeStorm",
  description: "Building an AI health assistant",
  hackathonName: "HackX 2026",
  hackathonLocation: "Bengaluru",
  hackathonStartDate: "Jan 20",
  hackathonEndDate: "Jan 22",
  rolesNeeded: ["Frontend", "ML Engineer"],
  createdBy: {
    fullName: "Anshit Rangra",
    role: "Full Stack Dev",
    avatar: "/avatar.png"
  }
}
function Teams(){
    return(
        <>
        <main>
        <h1 className="text-blue-600 text-3xl text-center font-semibold mt-5">Teams</h1>
        <div className="flex justify-center mt-[2%] gap-4">
            <Input placeholder="Search a Team" className="max-w-xs"/>
            <NavLink to='/add-team'><Button>Add Team +</Button></NavLink>
        </div>
        <div className="space-y-6 ">
            <TeamCard team={sampleTeam} />
         </div>
        </main>
        </>
    )
}

export default Teams