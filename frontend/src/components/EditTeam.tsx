import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type TeamFormValues = {
  name: string
  description: string
  hackathonName: string
  hackathonLocation: string
  hackathonStartDate: string
  hackathonEndDate: string
  membersRequired: number
  rolesNeeded: string
}

export default function EditTeam() {
  const { teamId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: {isSubmitting },
  } = useForm<TeamFormValues>()


  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/team/${teamId}`,
          { withCredentials: true }
        )

        const team = res.data.data

        reset({
          name: team.name,
          description: team.description || "",
          hackathonName: team.hackathonName,
          hackathonLocation: team.hackathonLocation,
          hackathonStartDate: team.hackathonStartDate.split("T")[0],
          hackathonEndDate: team.hackathonEndDate.split("T")[0],
          membersRequired: team.membersRequired,
          rolesNeeded: team.rolesNeeded.join(", "),
        })
      } catch (err) {
        console.error("Failed to fetch team", err)
      }
    }

    fetchTeam()
  }, [teamId, reset])

  const onSubmit: SubmitHandler<TeamFormValues> = async (data) => {
    const formatted = {
      ...data,
      rolesNeeded: data.rolesNeeded.split(",").map((r) => r.trim()),
    }

    try {
      await axios.put(
        `http://localhost:8000/api/team/edit/${teamId}`,
        formatted,
        { withCredentials: true }
      )
      navigate(`/teams`)
    } catch (err) {
      console.error("Failed to update team", err)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto mt-10 p-8 rounded-2xl border border-border bg-background space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-blue-500">
        Edit Team
      </h2>

    
      <div className="space-y-1">
        <Label>Team Name</Label>
        <Input {...register("name", { required: true })} />
      </div>

    
      <div className="space-y-1">
        <Label>Hackathon Name</Label>
        <Input {...register("hackathonName", { required: true })} />
      </div>

      <div className="space-y-1">
        <Label>Location</Label>
        <Input {...register("hackathonLocation", { required: true })} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Start Date</Label>
          <Input type="date" {...register("hackathonStartDate", { required: true })} />
        </div>

        <div className="space-y-1">
          <Label>End Date</Label>
          <Input type="date" {...register("hackathonEndDate", { required: true })} />
        </div>
      </div>


      <div className="space-y-1">
        <Label>Description</Label>
        <Textarea rows={4} {...register("description")} />
      </div>

  
      <div className="space-y-1">
        <Label>Members Required</Label>
        <Input
          type="number"
          min={1}
          {...register("membersRequired", { required: true })}
        />
      </div>

   
      <div className="space-y-1">
        <Label>Roles Needed (comma separated)</Label>
        <Input {...register("rolesNeeded", { required: true })} />
      </div>

      <Button
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {isSubmitting ? "Updating..." : "Update Team"}
      </Button>
    </form>
  )
}
