"use client";

import * as React from "react";
import { useThread } from "./thread-provider";
import { api } from "~/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Copy, Save, Trash2 } from "lucide-react";

export function ThreadPreview() {
  const { threadId, clear } = useThread();

  if (!threadId) {
    return <div>No thread selected.</div>;
  }

  const [threads, { isLoading, error }] = api.tweet.byThreadId.useSuspenseQuery({ id: threadId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading thread: {error.message}</div>;
  }

  if (!threads) {
    return <div>No threads found.</div>;
  }

  const handleSave = () => {
    console.log("Save button clicked");
  };

  const handleCopy = () => {
    console.log("Copy button clicked");
  };

  return (
    <div className="not-prose relative rounded-xl overflow-hidden border">
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleSave}
              aria-label="Save"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleCopy}
              aria-label="Copy"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => clear()}
              aria-label="Clear"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <TabsContent value="preview" className="p-4">
          <div>{threads.status}</div>
        </TabsContent>
        <TabsContent value="code" className="p-4">
          <pre>{JSON.stringify(threads.data, null, 2)}</pre>
        </TabsContent>
      </Tabs>
    </div>
  );
}
