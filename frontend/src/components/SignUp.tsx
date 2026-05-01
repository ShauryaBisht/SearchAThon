import { SignupForm } from "@/components/signup-form"
import { useState } from "react";
import { TbWorldSearch } from "react-icons/tb";

export default function Signup() {
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <TbWorldSearch className="size-4" />
          </div>
          SearchAThon
        </a>

        {!isSent ? (
          <SignupForm 
            onSuccess={(userEmail: string) => {
              setEmail(userEmail);
              setIsSent(true);
            }} 
          />
        ) : (
          <div className="text-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="text-4xl">📧</div>
            <h2 className="text-2xl font-bold">Check your email</h2>
            <p className="text-muted-foreground">
              We've sent a magic link to <span className="font-medium text-foreground">{email}</span>. 
              Click the link to verify your account.
            </p>
            <p className="text-xs text-muted-foreground">
              Didn't get the email? Check your spam folder or try signing up again.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}