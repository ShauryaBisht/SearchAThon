import { Users, Mail, BookmarkPlus } from "lucide-react"

export default function TeamCard() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/60 border border-slate-700 rounded-xl p-5 backdrop-blur space-y-4 shadow-md mt-8">

      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src="/avatar.png"
            alt="user"
            className="w-12 h-12 rounded-full object-cover border border-slate-600"
          />
          <div>
            <h3 className="text-white font-semibold text-lg">Anshit Rangra</h3>
            <p className="text-slate-400 text-sm">
              Full Stack | Rust | Blockchain | Web3
            </p>
            <p className="text-slate-500 text-xs">Posted 5h ago</p>
          </div>
        </div>
        <button className="text-blue-500 text-sm font-medium hover:underline">
          View Profile
        </button>
      </div>
      <p className="text-slate-200 leading-relaxed text-sm">
        Building a team for a Web3 hackathon. Need strong frontend and smart
        contract devs. If you love shipping fast and building cool stuff,
        join us
      </p>

      <div className="rounded-lg overflow-hidden border border-slate-700">
        <img
          src="/post-image.jpg"
          alt="hackathon"
          className="w-full object-cover"
        />
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full">Frontend</span>
        <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full">Blockchain</span>
        <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full">UI/UX</span>
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
