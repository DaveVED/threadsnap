"use client";
import * as React from "react";

import { ThreadInputForm } from "~/components/thread-input-form";
import { ThreadPreview } from "~/components/thread-preview";

import { api } from "~/trpc/react"

export default function HomePage() {
  const [showPreview, setShowPreview] = React.useState(false)
  const [threadId, setThreadId] = React.useState<string | null>(null);  
  
  const { data, isLoading, error } = api.tweet.byThreadId.useQuery(
    { id: threadId! },
    { enabled: !!threadId }
  );

  async function onSubmit(url: string) {
    try {
      // Ensure the URL has a protocol. If missing, prepend "https://"
      if (!url.match(/^https?:\/\//)) {
        url = `https://${url}`;
      }
  
      // Attempt to parse the URL
      const parsedUrl = new URL(url);
  
      // Validate the hostname
      if (!parsedUrl.hostname.match(/^(x\.com|twitter\.com)$/)) {
        throw new Error("Invalid URL: Only x.com or twitter.com domains are allowed.");
      }
  
      // Split the pathname into segments and filter out empty ones
      const segments = parsedUrl.pathname.split('/').filter(Boolean);
  
      // Ensure there are at least two segments
      if (segments.length < 2) {
        throw new Error("Invalid URL: Path does not contain enough segments.");
      }
  
      // Print the last segment
      const lastSegment = segments[segments.length - 1];
      console.log("Last Segment:", lastSegment);
      if (lastSegment) setThreadId(lastSegment);
    } catch (error) {
      console.log(error);
      //console.error("Error:", error.message || "Failed to process the URL.");
    }
  }
  

  return (
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
        <ThreadInputForm onSubmit={onSubmit}/>
        {showPreview && (
                  <div className="w-full max-w-4xl mt-8">
                    <h2 className="text-2xl font-bold mb-4">Generated Thread Snap</h2>
                    <ThreadPreview onClear={() => setShowPreview(false)} />
                    {JSON.stringify(data)}
                  </div>
                )}
      </div>
    </main>
  );
}