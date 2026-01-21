import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {useForm} from 'react-hook-form'

type SigninFormData={
  fullname:string,
  email:string,
  password:string,
  confirmpassword:string
}
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const {
      register,
      handleSubmit,
      watch,reset,
      formState: { errors, isSubmitting },
    } = useForm<SigninFormData>({
      defaultValues: {
        email: "",
        password: "",
      },
  })
  const password = watch("password");
  const onSubmit=async(data:SigninFormData)=>{
      await new Promise((resolve)=>setTimeout(resolve,2000))
      console.log("Data is",data)
      reset()
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe"  {...register("fullname",{
                    required:"Full Name is required",
                    pattern: /^[A-Za-z]+$/i ,
                    maxLength:{value:99,message:"Full name Should be less than 99 letters"}
                  })}/>
                   {errors.fullname?.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.fullname.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email",{
                    required:"Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                 {errors?.email?.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password"  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}/>
                  {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password"  {...register("confirmpassword", {
                 required: "Confirm password is required",
              validate: (value) =>
                      value === password || "Passwords do not match",
                   })}
                  />
                     {errors.confirmpassword?.message && (
                     <p className="text-sm text-red-500">{errors.confirmpassword.message}</p>
                    )}
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>{!isSubmitting?"Create Account":"Creating Account..."}</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
