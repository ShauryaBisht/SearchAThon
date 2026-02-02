import { Users, Mail, BookmarkPlus } from "lucide-react"

type Team = {
  name: string
  description: string
  hackathonName: string
  hackathonLocation: string
  hackathonStartDate: string
  hackathonEndDate: string
  rolesNeeded: string[]
  createdBy: {
    fullName: string
    avatar?: string
    role?: string
  }
}

export default function TeamCard({ team }: { team: Team }) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/60 border border-slate-700 rounded-xl p-5 backdrop-blur space-y-4 shadow-md mt-6">

      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src={team.createdBy.avatar || "/avatar.png"}
            alt="creator"
            className="w-12 h-12 rounded-full object-cover border border-slate-600"
          />
          <div>
            <h3 className="text-white font-semibold text-lg">{team.createdBy.fullName}</h3>
            <p className="text-slate-400 text-sm">{team.createdBy.role}</p>
          </div>
        </div>

        <button className="text-blue-500 text-sm font-medium hover:underline">
          View Profile
        </button>
      </div>
      <h2 className="text-xl text-white font-semibold">{team.name}</h2>
      <div className="text-sm text-slate-300 space-y-1">
        <p><span className="text-blue-400 font-medium">Hackathon:</span> {team.hackathonName}</p>
        <p><span className="text-blue-400 font-medium">Location:</span> {team.hackathonLocation}</p>
        <p>
          <span className="text-blue-400 font-medium">Dates:</span>{" "}
          {team.hackathonStartDate} – {team.hackathonEndDate}
        </p>
      </div>

      <p className="text-slate-200 text-sm leading-relaxed">
        {team.description}
      </p>

      <div className="flex flex-wrap gap-2 text-xs">
        {team.rolesNeeded.map((role, i) => (
          <span
            key={i}
            className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full"
          >
            {role}
          </span>
        ))}
      </div>

      <div className="border-t border-slate-700" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">

        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
          <Users size={16} />
          View Team
        </button>

        <button className="flex items-center justify-center gap-2 border border-slate-600 text-slate-300 hover:bg-slate-800 py-2 rounded-lg transition">
          Join Request
        </button>

        <button className="flex items-center justify-center gap-2 border border-slate-600 text-slate-300 hover:bg-slate-800 py-2 rounded-lg transition">
          <BookmarkPlus size={16} />
          Save
        </button>

        <button className="flex items-center justify-center gap-2 border border-slate-600 text-slate-300 hover:bg-slate-800 py-2 rounded-lg transition">
          <Mail size={16} />
          Contact
        </button>

      </div>
    </div>
  )
}
