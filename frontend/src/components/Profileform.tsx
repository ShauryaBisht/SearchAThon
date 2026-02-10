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
  } = useForm<ProfileFormValues>() 

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
   
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    )

    const formattedData = {
      ...cleanedData,
      skills: cleanedData.skills
        ? cleanedData.skills.split(",").map((s) => s.trim())
        : undefined,
    }

    try {
      await axios.put(
        "http://localhost:8000/api/profile/edit",
        formattedData,
        { withCredentials: true }
      )
      navigate("/profile")
    } catch (error) {
      console.log("Error updating profile", error)
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

      <InputField label="Your Role" error={errors.role?.message}>
        <input
          {...register("role")}
          placeholder={defaultValues?.role || "Frontend Developer"}
          className="input"
        />
      </InputField>

      <div>
        <label className="block mb-1 text-slate-300">Experience Level</label>
        <select
          {...register("experienceLevel")}
          className="input"
          defaultValue=""
        >
          <option value="">
            {defaultValues?.experienceLevel || "Select level"}
          </option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <InputField label="Preferred Role in Team">
        <input
          {...register("preferredRole")}
          placeholder={defaultValues?.preferredRole || "UI / Frontend"}
          className="input"
        />
      </InputField>

      <InputField label="Location">
        <input
          {...register("location")}
          placeholder={defaultValues?.location || "Bengaluru"}
          className="input"
        />
      </InputField>

      <div>
        <label className="block mb-1 text-slate-300">Bio</label>
        <textarea
          {...register("bio")}
          rows={4}
          className="input"
          placeholder={defaultValues?.bio || "Tell teams what you're good at..."}
        />
      </div>

      <InputField label="Skills (comma separated)">
        <input
          {...register("skills")}
          placeholder={
            defaultValues?.skills
              ? defaultValues.skills
              : "React, Node, MongoDB"
          }
          className="input"
        />
      </InputField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="GitHub" error={errors.github?.message}>
          <input
            {...register("github")}
            placeholder={defaultValues?.github || "https://github.com/..."}
            className="input"
          />
        </InputField>

        <InputField label="LinkedIn" error={errors.linkedin?.message}>
          <input
            {...register("linkedin")}
            placeholder={defaultValues?.linkedin || "https://linkedin.com/in/..."}
            className="input"
          />
        </InputField>
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

function InputField({
  label,
  children,
  error,
}: {
  label: string
  children: React.ReactNode
  error?: string
}) {
  return (
    <div>
      <label className="block mb-1 text-slate-300">{label}</label>
      {children}
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  )
}
