"use client";

import * as React from "react";

// Define the ThreadContext type
type ThreadContextType = {
    threadId: string | null;
  state: "empty" | "pending" | "results";
  setThreadId: (url: string)  => void;
  clear: () => void;
};

// Create the context
const ThreadContext = React.createContext<ThreadContextType | null>(null);

// Hook for using ThreadContext
function useThread() {
  const context = React.useContext(ThreadContext);
  if (!context) {
    throw new Error("useThread must be used within a ThreadProvider.");
  }

  return context;
}

// ThreadProvider component
const ThreadProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, style, children, ...props }, ref) => {
  const [threadId, _setThreadId] = React.useState<string | null>(null);

  const state = threadId ? "results" : "empty";
  
  const clear = () => {
    _setThreadId(null);
  }
  const setThreadId = (url: string) => {
    try {
        // Ensure the URL has a protocol. If missing, prepend "https://"
        if (!url.match(/^https?:\/\//)) {
          url = `https://${url}`;
        }
  
        // Attempt to parse the URL
        const parsedUrl = new URL(url);
  
        // Validate the hostname
        if (!parsedUrl.hostname.match(/^(x\.com|twitter\.com)$/)) {
          throw new Error(
            "Invalid URL: Only x.com or twitter.com domains are allowed.",
          );
        }
  
        // Split the pathname into segments and filter out empty ones
        const segments = parsedUrl.pathname.split("/").filter(Boolean);
  
        // Ensure there are at least two segments
        if (segments.length < 2) {
          throw new Error("Invalid URL: Path does not contain enough segments.");
        }
  
        // Print the last segment
        const lastSegment = segments[segments.length - 1];
        console.log("Last Segment:", lastSegment);
        if (lastSegment) {
          _setThreadId(lastSegment);
        }
      } catch (error) {
        console.log(error);
      }
  }

  const contextValue = React.useMemo<ThreadContextType>(
    () => ({
      threadId,
      state,
      setThreadId,
      clear
    }),
    [threadId, state],
  );

  return (
    <ThreadContext.Provider value={contextValue}>
      <div
        style={style as React.CSSProperties}
        className={className}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    </ThreadContext.Provider>
  );
});

ThreadProvider.displayName = "ThreadProvider";

export { ThreadProvider, useThread };
