import Link from "next/link";

import { auth, signIn } from "@acme/auth";

import { Button } from "~/components/ui/button";
import { UserProfileDropdown } from "~/components/user-profile-dropdown";
import { ModeToggle } from "./mode-toggle";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="inline-block font-bold">ThreadSnap</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/DaveVED/threadsnap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            {session ? (
              <UserProfileDropdown
                user={{
                  name: session.user.name || "User",
                  email: session.user.email || "user@example.com",
                  image: session.user.image || "/default-avatar.png",
                }}
              />
            ) : (
              <form>
                <Button
                  formAction={async () => {
                    "use server";
                    await signIn("discord");
                  }}
                >
                  Login
                </Button>
              </form>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
