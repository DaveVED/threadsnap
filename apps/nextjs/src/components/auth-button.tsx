'use client'

import { LogIn } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { signIn } from "@acme/auth"
import { UserAvatar } from "./user-avatar"
import type { Session } from "@acme/auth"

interface AuthButtonProps {
  session: Session | null
}

export function AuthButton({ session }: AuthButtonProps) {
  if (session) {
    return <UserAvatar user={session.user} />
  }

  return (
    <Button variant="outline" size="sm" onClick={() => signIn("discord")}>
      <LogIn className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  )
}

