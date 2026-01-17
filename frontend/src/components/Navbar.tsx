import { TbWorldSearch } from "react-icons/tb";
import { Button } from "./ui/button";

function Navbar(){
    return(
        <header>
        <div className="max-w-7=8xl mx-auto h-16 px-6 flex items-center justify-between border-b border-slate-200 sticky">
        <div className="flex items-center gap-0.5">
        <div><TbWorldSearch className="text-blue-600 text-3xl"/></div>
        <div>
        <h1 className="font-semibold text-blue-600 text-3xl">SearchAThon</h1> 
        </div>   
        </div>
        <nav className="ml-[25%]">
         <ul className="flex justify-around text-slate-500 text-lg gap-5">
            <li className="hover:text-slate-900 cursor-pointer transition">Home</li>
            <li className="hover:text-slate-900 cursor-pointer transition">Explore</li>
            <li className="hover:text-slate-900 cursor-pointer transition whitespace-nowrap">Contact Us</li>
         </ul>
         </nav>
         <div id="auth" className="flex ml-[25%] justify-evenly gap-3">
          <Button variant='outline'>Login</Button>
          <Button>Sign Up</Button>
         </div>

        </div>
        </header>
    )
}

export default Navbar