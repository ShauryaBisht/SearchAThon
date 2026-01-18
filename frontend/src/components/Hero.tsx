import { Button } from "./ui/button"
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
function Hero(){
    return(
      <main >
        <div className="flex flex-col bg-linear-to-b from-white to-slate-50">
      <div className="flex flex-col justify-center items-center gap-y-7 w-full mt-[5%]  md:mt-[6%]">
        <div>
         <h1 className="font-bold text-blue-600 md:text-5xl text-2xl text-center text-shadow-sm">Find Your Perfect Hackathon Team</h1>
        </div>
        <div className="text-center md:w-[40%]">
          <p className="text-slate-600 md:text-lg">SearchAThon helps participants find teammates, match skills, and form strong hackathon teams quickly and easily.</p>
        </div>
        <div>
           <Button variant="account">Create an Account</Button>
        </div>
      </div>
      <div className="flex justify-evenly md:mt-18 mt-10 flex-col md:flex-row gap-4 ">
       <div className="md:w-[14%] md:h-[180px] flex-col flex  items-center p-2 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
             <FaUser className="text-3xl text-blue-600" />
           </div>
          <div className="mt-2 text-center">
            <h1 className="text-lg font-semibold text-slate-900">Create Your Profile</h1>
            <p className="md:text-sm text-slate-600 text-sm leading-relaxed max-w-[220px]">Add your role, skills, and links so teams can find you easily.</p>
          </div>
       </div>
       <div className="md:w-[14%] md:h-[180px] flex-col flex  items-center p-2  rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
             <FaSearch  className="text-3xl text-blue-600" />
           </div>
          <div className="mt-2 text-center">
            <h1 className="text-lg font-semibold text-slate-900">Explore Teams</h1>
            <p className="md:text-sm text-slate-600 text-sm leading-relaxed max-w-[220px]">Browse team posts by hackathon, tech stack, and roles needed.</p>
          </div>
       </div>
        <div className="md:w-[14%] md:h-[180px] flex-col flex  items-center p-2 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
             <FaUsers  className="text-3xl text-blue-600" />
           </div>
          <div className="mt-2 text-center">
            <h1 className="text-lg font-semibold text-slate-900">Request & Build</h1>
            <p className="md:text-sm text-slate-600 text-sm leading-relaxed max-w-[220px]">Send a join request, get approved by the leader, and start building.</p>
          </div>
       </div>
      </div>
     </div>
      </main>
    )
}

export default Hero