import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import axios from "axios"
type TeamFormValues = {
  name: string
  description: string
  hackathonName: string
  hackathonLocation: string
  hackathonStartDate: string
  hackathonEndDate: string
  rolesNeeded: string
}

export default function AddTeam() {
  const { register, handleSubmit, formState: { errors } } = useForm<TeamFormValues>()

  const onSubmit: SubmitHandler<TeamFormValues> = async(data) => {
    const formatted = {
      ...data,
      rolesNeeded: data.rolesNeeded.split(",").map(r => r.trim())
    }
   const response=await axios.post('http://localhost:8000/api/add-team',formatted,{withCredentials:true})
   console.log("Team created",response)
   
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto mt-10 p-8 bg-slate-900/60 border border-slate-700 rounded-2xl backdrop-blur space-y-6"
    >
      <h2 className="text-2xl text-blue-500 font-semibold text-center">
        Create a Team
      </h2>

      <Input label="Team Name" error={errors.name?.message}>
        <input {...register("name", { required: "Team name required" })} className="input" />
      </Input>

      <Input label="Hackathon Name" error={errors.hackathonName?.message}>
        <input {...register("hackathonName", { required: "Hackathon required" })} className="input" />
      </Input>

      <Input label="Location">
        <input {...register("hackathonLocation",{required:"Location Required"})} className="input" />
      </Input>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Start Date">
          <input type="date" {...register("hackathonStartDate",{required:true})} className="input" />
        </Input>
        <Input label="End Date">
          <input type="date" {...register("hackathonEndDate")} className="input" />
        </Input>
      </div>

      <div>
        <label className="block text-slate-300 mb-1">Team Description</label>
        <textarea {...register("description")} rows={4} className="input" />
      </div>

      <Input label="Roles Needed (comma separated)">
        <input {...register("rolesNeeded",{required:true})} placeholder="Frontend, Backend, UI/UX" className="input" />
      </Input>

      <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white font-semibold">
        Post Team
      </button>
    </form>
  )
}

function Input({ label, children, error }: any) {
  return (
    <div>
      <label className="block text-slate-300 mb-1">{label}</label>
      {children}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}

