"use client";

import { motion } from "framer-motion";
import { Code2, Component, Sparkles, Twitter } from "lucide-react";

export function FloatingElements() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {[Twitter, Code2, Component, Sparkles].map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/20"
          initial={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            scale: 1,
            opacity: 0.5,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.5,
          }}
        >
          <Icon className="h-8 w-8" />
        </motion.div>
      ))}
    </div>
  );
}
