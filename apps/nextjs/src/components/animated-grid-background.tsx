"use client";

import { motion } from "framer-motion";
import {
  CodeIcon,
  ComponentIcon,
  SparklesIcon,
  TwitterIcon,
} from "lucide-react";

import { cn } from "~/lib/utils";

interface AnimatedGridBackgroundProps {
  className?: string;
}

export function AnimatedGridBackground({
  className,
}: AnimatedGridBackgroundProps) {
  const floatingElements = [
    { Icon: TwitterIcon, delay: 0 },
    { Icon: CodeIcon, delay: 1 },
    { Icon: ComponentIcon, delay: 2 },
    { Icon: SparklesIcon, delay: 3 },
  ];

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      {floatingElements.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/20"
          initial={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            opacity: 0.5,
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: delay,
          }}
        >
          <Icon size={24} />
        </motion.div>
      ))}
    </div>
  );
}
