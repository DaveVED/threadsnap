'use client';

import { useState } from 'react';
import { InputForm } from '~/components/input-form';
import { Button } from '~/components/ui/button';
import { api } from "~/trpc/react";

export default function HomePage() {
  const [threadId, setThreadId] = useState<string | null>(null);

  const { data, isLoading, error } = api.tweet.byThreadId.useQuery(
    { id: threadId! },
    { enabled: !!threadId }
  );

  const handleSubmit = (url: string) => {
    setThreadId("1873784310362497535");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent/10">
      <main className="flex-1 py-12">
        <div className="container max-w-4xl space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Snap Threads into <span className="text-primary">React Components</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              acme transforms X/Twitter threads into customizable React components. Perfect for embedding in your React projects or creating interactive archives.
            </p>
          </div>

          <InputForm onSubmit={handleSubmit} />

          {isLoading && <Button disabled>Loading...</Button>}
          {error && <div className="text-red-500">Error: {error.message}</div>}
          {data && (
            <div className="bg-white p-4 rounded-lg shadow overflow-auto max-h-[600px]">
              <h2 className="text-2xl font-bold mb-4">Raw API Response</h2>
              <pre className="whitespace-pre-wrap break-words">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

