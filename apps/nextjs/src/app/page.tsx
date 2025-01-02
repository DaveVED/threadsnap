import * as React from "react";
import { Separator } from "@radix-ui/react-dropdown-menu";

import { auth } from "@acme/auth";

import { ThreadUnrollSuspenseSpinner } from "~/components/spinning-image";
import { ThreadInputForm } from "~/components/thread-input-form";
import { ThreadPreview } from "~/components/thread-preview";
import { HydrateClient } from "~/trpc/server";

export default async function HomePage() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="container max-w-4xl py-6 lg:py-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
            Snap Threads into{" "}
            <span className="text-primary">React Components</span>
          </h1>
          <p className="max-w-[42rem] text-lg text-muted-foreground sm:text-xl">
            ThreadSnap transforms X/Twitter threads into customizable React
            components. Perfect for embedding in your React projects or creating
            interactive archives.
          </p>
          <ThreadInputForm />
          <Separator />
          <React.Suspense fallback={<ThreadUnrollSuspenseSpinner />}>
            <ThreadPreview userId={session?.user.id} />
          </React.Suspense>
        </div>
      </main>
    </HydrateClient>
  );
}
