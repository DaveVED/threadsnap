import * as React from "react";

import { auth } from "@threadsnap/auth";

import { AnimatedGridBackground } from "~/components/animated-grid-background";
import { AnimatedText } from "~/components/animated-text";
import { FloatingElements } from "~/components/floating-elements";
import { ThreadUnrollSuspenseSpinner } from "~/components/spinning-image";
import { ThreadInputForm } from "~/components/thread-input-form";
import { ThreadPreview } from "~/components/thread-preview";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-between p-4 md:p-8">
        <AnimatedGridBackground />
        <FloatingElements />

        <div className="container flex w-full max-w-4xl flex-col items-center justify-center gap-8 py-8 md:gap-16 md:py-16">
          <div className="flex max-w-3xl flex-col items-center gap-6 text-center md:gap-8">
            <div className="space-y-4">
              <AnimatedText
                text="Snap Threads into React Components"
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              />

              <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
                ThreadSnap transforms X/Twitter threads into customizable React
                components. Perfect for embedding in your React projects or
                creating interactive archives.
              </p>
            </div>

            <React.Suspense
              fallback={
                <ThreadUnrollSuspenseSpinner
                  imageUrl="/your-custom-spinner-image.jpg"
                  minSize={60}
                  maxSize={140}
                  spinSpeed={1.5}
                  pulseSpeed={2}
                  waitTime={1000}
                />
              }
            >
              <div className="w-full max-w-xl">
                <ThreadInputForm />
              </div>
            </React.Suspense>
          </div>

          <React.Suspense
            fallback={
              <ThreadUnrollSuspenseSpinner
                imageUrl="/your-custom-spinner-image.jpg"
                minSize={60}
                maxSize={140}
                spinSpeed={1.5}
                pulseSpeed={2}
                waitTime={1000}
              />
            }
          >
            <ThreadPreview userId={session?.user.id} />
          </React.Suspense>
        </div>
      </main>
    </HydrateClient>
  );
}
