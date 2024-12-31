import Link from "next/link";
import { Scissors, LogIn } from 'lucide-react';
import { Button } from "~/components/ui/button";
import { auth, signIn } from "@acme/auth";
import { UserDropdown } from "./user-dropdown";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="p-1.5 bg-primary rounded-full">
            <Scissors className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-primary">acme</span>
        </Link>

        {/* User Section */}
        {session?.user ? (
          <UserDropdown 
            user={{
              name: session.user.name || null,
              email: session.user.email || null,
              image: session.user.image || null
            }} 
          />
        ) : (
          <form>
            <Button
              variant="outline"
              size="sm"
              formAction={async () => {
                "use server";
                await signIn("discord");
              }}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </form>
        )}
      </div>
    </header>
  );
}
