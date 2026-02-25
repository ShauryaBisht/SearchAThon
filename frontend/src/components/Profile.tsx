import { Button } from "./ui/button";
import { useAuth } from "./UserContext"
import { Badge } from "./ui/badge";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Profile() {
    const { user } = useAuth();
    const [profilePic, setProfilePic] = useState("/vite.svg");
    const [publicId, setPublicId] = useState<string | null>(null);
    const skills = user?.skills ?? [];
    const uploadPhoto = async (file: File) => {
        const formData = new FormData()
        formData.append("image", file)

        const res = await axios.post("http://localhost:8000/api/avatar/upload", formData, { withCredentials: true })
        setProfilePic(res.data.imageUrl)
        setPublicId(res.data.publicId)
    };
    const deletePhoto = async () => {
  if (!publicId) return;

  await axios.delete("http://localhost:8000/api/avatar/delete", {
    data: { publicId },
    withCredentials: true
  });

  setProfilePic("/vite.svg");
  setPublicId(null);
};
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
                                <img src={profilePic} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h1 className="text-blue-600 font-semibold">{user?.fullName}</h1>
                                <h2 className="text-blue-600 font-medium">{user?.role}</h2>
                                <h3 className="text-green-600 font-light text-s">{user?.experienceLevel}</h3>
                                <div className="flex gap-3 mt-2">
                                    <a href={user?.github}><FaGithub className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition" /></a>
                                    <a href={user?.linkedin}><FaLinkedin className="w-5 h-5 text-slate-400 hover:text-blue-400 cursor-pointer transition" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            {skills.slice(0, 5).map((skill, index) => (
                                <Badge
                                    key={index}
                                    className="bg-blue-600/10 text-blue-400 border border-blue-500/20"
                                >
                                    {skill}
                                </Badge>
                            ))}

                            {skills.length > 5 && (
                                <Badge className="bg-slate-700 text-slate-300 border border-slate-600">
                                    +{skills.length - 5}
                                </Badge>
                            )}
                        </div>

                    </div>
                    <div className="flex gap-9 items-center ">
                        <input
                            type="file"
                            id="profileUpload"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) uploadPhoto(file);
                            }}
                        />

                        <Button
                            variant="default"
                            onClick={() => document.getElementById("profileUpload")?.click()}
                        >
                            Upload Photo
                        </Button>
                        <Button variant='destructive' onClick={deletePhoto}>Delete Photo</Button>
                        <NavLink to={`/profile/edit/${user?._id}`}><Button className="secondary">✏️ Edit Profile</Button></NavLink>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-400/40 to-transparent my-10" />
                <div className="max-w-3xl mx-auto mt-10 bg-slate-900/40 border border-slate-800 rounded-xl p-8 backdrop-blur-sm">


                    <h2 className="text-blue-500 text-lg font-semibold text-center mb-4">Bio</h2>
                    <p className="text-slate-300 text-center leading-relaxed max-w-2xl mx-auto">
                        {user?.bio}
                    </p>


                    <h3 className="text-blue-500 text-lg font-semibold text-center mt-8">Skills</h3>
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {user?.skills?.map((skill, index) => (
                            <Badge
                                key={index}
                            >
                                {skill}
                            </Badge>
                        ))}
                    </div>
                    <div className="my-8 h-px bg-slate-700/50 w-3/4 mx-auto"></div>
                    <div className="grid md:grid-cols-2 gap-6 text-slate-300">
                        <div>
                            <p className="text-slate-400 text-sm">Role</p>
                            <p className="font-medium text-white">{user?.role}</p>
                        </div>

                        <div>
                            <p className="text-slate-400 text-sm">Experience Level</p>
                            <p className="font-medium text-white">{user?.experienceLevel}</p>
                        </div>

                        <div>
                            <p className="text-slate-400 text-sm">Preferred Role in a Team</p>
                            <p className="font-medium text-white">{user?.preferredRole}</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Based In</p>
                            <p className="font-medium text-white">{user?.location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile