"use client";

import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";

export function NoThreadsPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main icon container */}
        <motion.div
          className="relative rounded-full border border-primary/20 bg-background p-8"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <Code2 className="h-12 w-12 text-primary" />
            <motion.div
              className="absolute -right-1 -top-1"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="space-y-2 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold">No thread selected</h3>
        <p className="text-sm text-muted-foreground">
          Paste a Twitter thread URL above to get started
        </p>
      </motion.div>
    </div>
  );
}
