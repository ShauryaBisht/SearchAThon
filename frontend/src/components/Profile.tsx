import { Button } from "./ui/button";
import { useAuth } from "./UserContext"
import { Badge } from "./ui/badge";


function Profile() {
    const { user } = useAuth();

    return (
        <>
            <div id="container" className="flex flex-col h-full w-full">
                <div className="mt-5 ml-4 text-center">
                    <h1 className="text-3xl font-semibold text-blue-600">User Profile</h1>
                </div>
                <div className="flex w-full h-[155px]  mt-9 p-4 justify-evenly">
                    <div className="flex gap-5">
                    <div className="flex items-center gap-3">
                        <div className="w-16 h-16 overflow-hidden rounded-full bg-white">
                            <img src="/vite.svg" className="w-full h-full object-cover" />
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <h1 className="text-blue-600 font-semibold">{user?.fullName}</h1>
                            <h2 className="text-blue-600 font-medium">Frontend Developer</h2>
                            <h3 className="text-green-500 font-light text-s">Beginner</h3>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2  items-center">
                        <Badge className="bg-blue-600/10 text-blue-400 border border-blue-500/20">
                            Blue
                        </Badge>
                        <Badge className="bg-blue-600/10 text-blue-400 border border-blue-500/20">
                            Green
                        </Badge>
                        <Badge className="bg-blue-600/10 text-blue-400 border border-blue-500/20">
                            Sky
                        </Badge>
                        <Badge className="bg-blue-600/10 text-blue-400 border border-blue-500/20">
                            Purple
                        </Badge>
                        <Badge className="bg-blue-600/10 text-blue-400 border border-blue-500/20">
                            Red
                        </Badge>
                    </div>
                    </div>
                    <div className="flex gap-9 items-center ">
                        <Button variant='secondary'>Upload Photo</Button>
                        <Button variant='destructive'>Delete Photo</Button>
                    </div>
                </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-400/40 to-transparent my-10" />

            </div>
        </>
    )
}

export default Profile