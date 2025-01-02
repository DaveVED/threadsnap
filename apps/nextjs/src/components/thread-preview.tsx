"use client";

import * as React from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Copy, Save, Sparkles, Trash2 } from "lucide-react";

import { CodePreview } from "~/components/code-preview";
import { toast } from "~/hooks/use-toast";
import { generateTwitterThreadCode } from "~/lib/generate-component-code";
import { api } from "~/trpc/react";
import { AnimatedGridBackground } from "./animated-grid-background";
import { NoThreadsPlaceholder } from "./no-threads-placeholder";
import { ThreadUnrollSuspenseSpinner } from "./spinning-image";
import { useThread } from "./thread-provider";
import TwitterThread from "./twitter-thread";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const floatingSparkles: Variants = {
  animate: {
    y: [0, -10, 0],
    opacity: [1, 0.5, 1],
    scale: [1, 1.2, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export function ThreadPreview({ userId }: { userId?: string }) {
  const utils = api.useUtils();
  const { threadId, clear } = useThread();
  const [activeTab, setActiveTab] = React.useState("preview");

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
    return <NoThreadsPlaceholder />;
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
  const jsonResponse = JSON.stringify(threads.data, null, 2);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-3xl"
    >
      <AnimatedGridBackground className="absolute inset-0 z-0" />
      <motion.div
        className="absolute -left-4 -top-4 text-primary/20"
        variants={floatingSparkles}
        animate="animate"
      >
        <Sparkles size={24} />
      </motion.div>
      <motion.div
        className="absolute -bottom-4 -right-4 text-primary/20"
        variants={floatingSparkles}
        animate="animate"
      >
        <Sparkles size={24} />
      </motion.div>
      <div className="relative z-10 overflow-hidden rounded-xl bg-background/70 shadow-lg backdrop-blur-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between px-4 py-3">
            <TabsList className="grid w-full max-w-[300px] grid-cols-3">
              <TabsTrigger
                value="preview"
                className="data-[state=active]:bg-primary/10"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="data-[state=active]:bg-primary/10"
              >
                Code
              </TabsTrigger>
              <TabsTrigger
                value="json"
                className="data-[state=active]:bg-primary/10"
              >
                JSON
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary hover:bg-primary/20 hover:text-primary-foreground"
                  onClick={handleSave}
                  aria-label="Save"
                >
                  <Save className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary hover:bg-primary/20 hover:text-primary-foreground"
                  onClick={handleCopy}
                  aria-label="Copy code"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary hover:bg-primary/20 hover:text-primary-foreground"
                  onClick={() => clear()}
                  aria-label="Clear"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
          <div className="h-[400px] sm:h-[500px] md:h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="h-full"
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
                <TabsContent value="json" className="h-full">
                  <ScrollArea className="h-full">
                    <div className="p-4">
                      <CodePreview code={jsonResponse} language="json" />
                    </div>
                  </ScrollArea>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
}
