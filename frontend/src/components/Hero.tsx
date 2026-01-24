import { Button } from "./ui/button"
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { IoIosGitPullRequest } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";

import { useAuth } from "./UserContext";

function Hero(){

   const {user}=useAuth()
    return(
      <main >
        <div className="flex flex-col bg-background text-foreground">
      <div className="flex flex-col justify-center items-center gap-y-7 w-full mt-[5%]  md:mt-[6%]">
        <div>
         <h1 className="font-bold text-blue-600 md:text-5xl text-2xl text-center text-shadow-sm">Find Your Perfect Hackathon Team</h1>
        </div>
        <div className="text-center md:w-[40%]">
          <p className="text-slate-600 md:text-lg dark:text-slate-300">SearchAThon helps participants find teammates, match skills, and form strong hackathon teams quickly and easily.</p>
        </div>
        <div>
          <NavLink to={user?"/explore":"/signup"}><Button className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 transition">{user?"Explore Teams":"Create an Account"}</Button></NavLink> 
        </div>
      </div>
      <div className="flex justify-evenly md:mt-18 mt-10 flex-col md:flex-row gap-4">
       <div className="md:w-[14%] md:h-[180px] flex-col flex  items-center p-2 rounded-xl border dark:border-slate-700/60 border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
             <FaUser className="text-3xl text-blue-600 dark:text-blue-400" />
           </div>
          <div className="mt-2 text-center">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-blue-400">Create Your Profile</h1>
            <p className="md:text-sm text-slate-600 text-sm leading-relaxed max-w-[220px] dark:text-slate-300">Add your role, skills, and links so teams can find you easily.</p>
          </div>
       </div>
       <div className="md:w-[14%] md:h-[180px] flex-col flex  items-center p-2  rounded-xl border dark:border-slate-700/60 border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
             <FaSearch  className="text-3xl text-blue-600 dark:text-blue-400" />
           </div>
          <div className="mt-2 text-center">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-blue-400">Explore Teams</h1>
            <p className="md:text-sm text-slate-600 text-sm leading-relaxed max-w-[220px] dark:text-slate-300">Browse team posts by hackathon, tech stack, and roles needed.</p>
          </div>
       </div>
        <div className="md:w-[14%] md:h-[180px] flex-col flex  items-center p-2 rounded-xl border dark:border-slate-700/60 border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
             <FaUsers  className="text-3xl text-blue-600 dark:text-blue-400" />
           </div>
          <div className="mt-2 text-center ">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-blue-400 ">Request & Build</h1>
            <p className="md:text-sm text-slate-600 text-sm leading-relaxed max-w-[220px] dark:text-slate-300">Send a join request, get approved by the leader, and start building.</p>
          </div>
       </div>
      </div>
      <div className="text-center mt-18 ">    
        <h1 className="font-bold text-blue-700 text-3xl">Features</h1>
        <p className="text-slate-600 mt-3 md:p-0 p-x-1.5 dark:text-slate-300">Discover teams, match skills, and collaborate with the right people for your next hackathon.</p>
      </div>
      <div className="flex md:flex-row flex-col justify-center md:gap-x-12 gap-y-6 mt-10">
        <div className="md:w-[20%] h-[200px] md:h-[350px] md:p-3 p-2 flex-col gap-6  dark:bg-slate-900/40 dark:border-slate-700/60 hover:-translate-y-1 transition-all duration-200items-center justify-center rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm hover:shadow-md">
         <div className="w-full flex justify-center">
          <PiSlidersHorizontalBold className="text-blue-700 text-5xl md:text-7xl mt-4 dark:text-blue-400"/>
         </div>
         <div className="text-center mt-4">
          <h1 className="text-blue-700 text-xl font-semibold dark:text-blue-400">Smart Filters</h1>
          <p className="text-slate-600 dark:text-slate-400">Filter teams by tech stack, roles needed, and hackathon name instantly.</p>
         </div>
        </div>
        <div className="md:w-[20%] h-[200px] md:h-[350px] md:p-3 p-2 flex-col gap-6  dark:bg-slate-900/40 dark:border-slate-700/60 hover:-translate-y-1 transition-all duration-200items-center justify-center rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm hover:shadow-md">
         <div className="w-full flex justify-center">
        <IoIosGitPullRequest className="text-blue-700  text-5xl md:text-7xl mt-4 dark:text-blue-400"/>
         </div>
         <div className="text-center mt-4">
          <h1 className="text-blue-700 text-xl font-semibold dark:text-blue-400">Join Request Workflow</h1>
          <p className="text-slate-600 dark:text-slate-400">Apply to teams with a message. Leaders can accept or reject requests.</p>
         </div>
        </div>
        <div className="md:w-[20%] md:h-[350px] h-[200px] md:p-3 p-2 flex-col dark:bg-slate-900/40 dark:border-slate-700/60 hover:-translate-y-1 transition-all duration-200 items-center justify-center rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-sm hover:shadow-md ">
         <div className="w-full flex justify-center">
          <LuLayoutDashboard className="text-blue-700 text-5xl md:text-7xl mt-4 dark:text-blue-400"/>
         </div>
         <div className="text-center mt-4">
          <h1 className="text-blue-700 text-xl font-semibold dark:text-blue-400">Team Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Track team members, roles filled, and request status in one place.</p>
         </div>
        </div>    
      </div>
      <div className="mt-10 flex justify-center">
      <div className="w-24 h-[2px] bg-slate-200 rounded-full"></div>
      </div>
      <div className="flex justify-center mt-10">
      <NavLink to='/signup'><Button className="bg-blue-600 px-8 py-3 text-lg rounded-xl hover:bg-blue-700 transition">Get Started</Button></NavLink>
      </div>
     </div>
      </main>
    )
}

export default Hero