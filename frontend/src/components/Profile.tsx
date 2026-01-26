import { Button } from "./ui/button";
import { useAuth } from "./UserContext"
import { Badge } from "./ui/badge";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

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
                            <div className="w-20 h-20 overflow-hidden rounded-full bg-white border-2 border-slate-400">
                                <img src="/vite.svg" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h1 className="text-blue-600 font-semibold">{user?.fullName}</h1>
                                <h2 className="text-blue-600 font-medium">Frontend Developer</h2>
                                <h3 className="text-green-600 font-light text-s">Beginner</h3>
                                <div className="flex gap-3 mt-2">
                                    <FaGithub className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition" />
                                    <FaLinkedin className="w-5 h-5 text-slate-400 hover:text-blue-400 cursor-pointer transition" />
                                </div>
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
                        <Button variant='default'>Upload Photo</Button>
                        <Button variant='destructive'>Delete Photo</Button>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-400/40 to-transparent my-10" />
                <div className="max-w-3xl mx-auto mt-10 bg-slate-900/40 border border-slate-800 rounded-xl p-8 backdrop-blur-sm">


                    <h2 className="text-blue-500 text-lg font-semibold text-center mb-4">Bio</h2>
                    <p className="text-slate-300 text-center leading-relaxed max-w-2xl mx-auto">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem architecto et laborum adipisci rem, sint consectetur perspiciatis eligendi ratione libero facere earum aspernatur, expedita similique voluptatem dolorum quo veniam reiciendis.
                    </p>


                    <h3 className="text-blue-500 text-lg font-semibold text-center mt-8">Skills</h3>
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        <Badge>React</Badge>
                        <Badge>Node</Badge>
                        <Badge>MongoDB</Badge>
                        <Badge>Express</Badge>
                    </div>
                    <div className="my-8 h-px bg-slate-700/50 w-3/4 mx-auto"></div>
                    <div className="grid md:grid-cols-2 gap-6 text-slate-300">
                        <div>
                            <p className="text-slate-400 text-sm">Role</p>
                            <p className="font-medium text-white">Frontend Developer</p>
                        </div>

                        <div>
                            <p className="text-slate-400 text-sm">Experience Level</p>
                            <p className="font-medium text-white">Beginner</p>
                        </div>

                        <div>
                            <p className="text-slate-400 text-sm">Preferred Role in a Team</p>
                            <p className="font-medium text-white">UI / Frontend</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Based In</p>
                            <p className="font-medium text-white">Bengaluru</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile