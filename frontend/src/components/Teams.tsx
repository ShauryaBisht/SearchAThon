import { Input } from "./ui/input"
import TeamCard from "./TeamCard"
function Teams(){
    return(
        <>
        <main>
        <h1 className="text-blue-600 text-3xl text-center font-semibold mt-5">Teams</h1>
        <div className="flex justify-center mt-[2%]">
            <Input placeholder="Search a Team" className="max-w-xs"/>
        </div>
        <div>
         <TeamCard />
         </div>
        </main>
        </>
    )
}

export default Teams