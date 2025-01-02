import { Separator } from "@radix-ui/react-dropdown-menu";
import * as React from "react";

import { HydrateClient } from "~/trpc/server";
import { ThreadInputForm } from "~/components/thread-input-form";
import { ThreadPreview } from "~/components/thread-preview";
import ThreadUnrollSuspense from "~/components/thread-unroll-suspense";

export default function HomePage() {
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
          <React.Suspense fallback={<ThreadUnrollSuspense />}>
            <ThreadPreview />
          </React.Suspense>
        </div>
      </main>
    </HydrateClient>
  );
}

