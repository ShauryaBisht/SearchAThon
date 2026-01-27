import axios from "axios"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"

type ProfileFormValues = {
  bio: string
  role: string
  experienceLevel: "Beginner" | "Intermediate" | "Advanced" | ""
  preferredRole: string
  location: string
  skills: string
  github: string
  linkedin: string
  twitter: string
}

type Props = {
  defaultValues?: Partial<ProfileFormValues>
}

export default function ProfileForm({ defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    defaultValues: {
    bio: "",
    role: "",
    experienceLevel: "",
    preferredRole: "",
    location: "",
    skills: "",
    github: "",
    linkedin: "",
    ...defaultValues,
  },
  })
  const navigate=useNavigate()
  const onSubmit: SubmitHandler<ProfileFormValues> = async(data) => {
    const formattedData = {
      ...data,
      skills: data.skills
        ? data.skills.split(",").map((skill) => skill.trim())
        : [],
    }
    try {
      const response=await axios.put("http://localhost:8000/api/profile/edit",formattedData,{withCredentials:true})
      console.log("Profile updated:", response.data);
      navigate('/profile')
    } catch (error) {
      console.log("Error on editing profile",error)
    }

   
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto mt-10 p-8 rounded-2xl border border-slate-700 bg-slate-900/40 backdrop-blur space-y-6"
    >
      <h2 className="text-2xl text-blue-500 font-semibold text-center">
        Profile Details
      </h2>

      {/* Role */}
      <InputField
        label="Your Role"
        error={errors.role?.message}
        input={
          <input
            {...register("role", { required: "Role is required" })}
            placeholder="Frontend Developer"
            className="input"
          />
        }
      />

      {/* Experience */}
      <div>
        <label className="block mb-1 text-slate-300">Experience Level</label>
        <select
          {...register("experienceLevel", { required: "Select a level" })}
          className="input"
        >
          <option value="">Select level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        {errors.experienceLevel && (
          <p className="text-red-400 text-sm mt-1">{errors.experienceLevel.message}</p>
        )}
      </div>

      <InputField
        label="Preferred Role in Team"
        input={
          <input
            {...register("preferredRole")}
            placeholder="UI / Frontend"
            className="input"
          />
        }
      />

      <InputField
        label="Location"
        input={
          <input
            {...register("location")}
            placeholder="Bengaluru"
            className="input"
          />
        }
      />

      {/* Bio */}
      <div>
        <label className="block mb-1 text-slate-300">Bio</label>
        <textarea
          {...register("bio", { maxLength: 300 })}
          rows={4}
          className="input"
          placeholder="Tell teams what you're good at..."
        />
      </div>

      {/* Skills */}
      <InputField
        label="Skills (comma separated)"
        input={
          <input
            {...register("skills")}
            placeholder="React, Node, MongoDB"
            className="input"
          />
        }
      />

      {/* Social Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="GitHub"
          input={
            <input
              {...register("github", { pattern: { value: /^https?:\/\//, message: "Enter valid URL" } })}
              placeholder="https://github.com/..."
              className="input"
            />
          }
          error={errors.github?.message}
        />

        <InputField
          label="LinkedIn"
          input={
            <input
              {...register("linkedin", { pattern: { value: /^https?:\/\//, message: "Enter valid URL" } })}
              placeholder="https://linkedin.com/in/..."
              className="input"
            />
          }
          error={errors.linkedin?.message}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save Profile"}
      </button>
    </form>
  )
}

/* Reusable Input Field */
function InputField({
  label,
  input,
  error,
}: {
  label: string
  input: React.ReactNode
  error?: string
}) {
  return (
    <div>
      <label className="block mb-1 text-slate-300">{label}</label>
      {input}
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  )
}
