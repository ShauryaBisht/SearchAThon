import { Button } from "./ui/button"

function Hero(){
    return(
      <main >
        <div className="flex bg-linear-to-b from-white to-slate-50">
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
     </div>
      </main>
    )
}

export default Hero