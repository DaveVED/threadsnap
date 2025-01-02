"use client";

import * as React from "react";
import { Copy, Save, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { CodePreview } from "~/components/code-preview";
import { toast } from "~/hooks/use-toast";
import { generateTwitterThreadCode } from "~/lib/generate-component-code";
import { api } from "~/trpc/react";
import { ThreadUnrollSuspenseSpinner } from "./spinning-image";
import { useThread } from "./thread-provider";
import TwitterThread from "./twitter-thread";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { NoThreadsPlaceholder } from "./no-threads-placeholder";
import { AnimatedGridBackground } from "./animated-grid-background";

interface Tweet {
  id: number;
  full_text: string;
  user: {
    name: string;
    screen_name: string;
    profile_image_url_https: string;
  };
  tweet_created_at: string;
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  views_count: number;
  entities?: {
    media?: {
      media_url_https: string;
      type: string;
    }[];
  };
}

export function ThreadPreview({ userId }: { userId?: string }) {
  const utils = api.useUtils();
  const { threadId, clear } = useThread();

  const {
    data: threads,
    isLoading,
    error,
  } = api.tweet.byThreadId.useQuery(
    { id: threadId!, userId },
    { enabled: !!threadId },
  );

  const saveTweet = api.tweet.saveThread.useMutation({
    onSuccess: async () => {
      await utils.tweet.invalidate();
      toast({
        title: "Thread saved",
        description: "The thread has been saved to your account.",
      });
    },
    onError: (err) => {
      toast({
        title: "Error",
        description:
          err.data?.code === "UNAUTHORIZED"
            ? "You must be logged in to save a thread"
            : "Failed to save thread",
        variant: "destructive",
      });
    },
  });

  if (!threadId) {
    return <NoThreadsPlaceholder />
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <ThreadUnrollSuspenseSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="p-4">Error loading thread: {error.message}</div>;
  }

  if (!threads || !Array.isArray(threads.data)) {
    return <div className="p-4">No threads found.</div>;
  }

  const handleSave = () => {
    if (userId && threads.searchId) {
      saveTweet.mutate({ userId, searchId: threads.searchId });
    } else {
      toast({
        title: "Error",
        description: "Unable to save thread. Missing user ID or search ID.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = () => {
    const componentCode = generateTwitterThreadCode(threads.data!);
    navigator.clipboard.writeText(componentCode);
    toast({
      title: "Copied to clipboard",
      description: "The component code has been copied to your clipboard.",
    });
  };

  const componentCode = generateTwitterThreadCode(threads.data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-3xl"
    >
      <AnimatedGridBackground className="absolute inset-0 z-0" />
      <div className="relative z-10 overflow-hidden rounded-xl bg-background/80 backdrop-blur-sm shadow-lg">
        <Tabs defaultValue="preview" className="w-full">
          <motion.div 
            className="flex items-center justify-between px-4 py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
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
                aria-label="Copy code"
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
          </motion.div>
          <motion.div 
            className="h-[400px] sm:h-[500px] md:h-[600px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TabsContent value="preview" className="h-full">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <TwitterThread thread={threads.data as Tweet[]} />
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="code" className="h-full">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <CodePreview code={componentCode} />
                </div>
              </ScrollArea>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </motion.div>
  );
}

